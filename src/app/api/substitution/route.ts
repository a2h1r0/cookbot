import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createMockSubstitutionResponse } from '@/utils/mockHelpers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  let model = 'gemini-2.0-flash-exp';
  let temperature = 0.7;
  let requestData: {
    prompt?: string;
    model?: string;
    temperature?: number;
    ingredients?: string[];
  } = {};

  try {
    requestData = await request.json();
    const prompt = requestData.prompt;
    const ingredients = requestData.ingredients || [];
    model = requestData.model || 'gemini-2.0-flash-exp';
    temperature = requestData.temperature || 0.7;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'プロンプトが指定されていません' },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      const mockResponse = createMockSubstitutionResponse(
        ingredients,
        prompt,
        model,
        temperature
      );
      return NextResponse.json(mockResponse);
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Gemini APIキーが設定されていません' },
        { status: 500 }
      );
    }

    const geminiModel = genAI.getGenerativeModel({
      model,
      generationConfig: {
        temperature,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 4096,
        responseMimeType: 'text/plain',
      },
    });

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      data: {
        text,
        model,
        temperature,
      },
    });
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました';
    let statusCode = 500;

    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      if (message.includes('quota') || message.includes('limit')) {
        errorMessage = 'API使用制限に達しました。しばらくしてからもう一度お試しください。';
        statusCode = 429;

        try {
          const defaultIngredients = requestData.ingredients || ['一般的な材料'];
          const mockResponse = createMockSubstitutionResponse(
            defaultIngredients,
            requestData.prompt || 'デフォルトプロンプト',
            model,
            temperature
          );
          return NextResponse.json(mockResponse);
        } catch (mockError) {
          // モック生成に失敗した場合はエラーを返す
        }
      } else if (message.includes('network') || message.includes('connection')) {
        errorMessage = 'ネットワークエラーが発生しました。接続を確認してもう一度お試しください。';
        statusCode = 503;
      } else if (message.includes('unauthorized') || message.includes('api key')) {
        errorMessage = 'API認証エラーです。設定を確認してください。';
        statusCode = 401;
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
