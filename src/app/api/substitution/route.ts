import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createMockSubstitutionResponse } from '@/utils/mockHelpers';

// Gemini APIクライアントを初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substr(2, 9);
  const startTime = Date.now();
  let model = 'gemini-2.0-flash-exp';
  let temperature = 0.7;
  let requestData: {
    prompt?: string;
    model?: string;
    temperature?: number;
    ingredients?: string[];
  } = {};

  console.log(`[${requestId}] === Substitution API Request Started ===`);
  console.log(`[${requestId}] Timestamp: ${new Date().toISOString()}`);
  console.log(`[${requestId}] Environment: ${process.env.NODE_ENV}`);

  try {
    // リクエストボディを解析
    requestData = await request.json();
    const prompt = requestData.prompt;
    const ingredients = requestData.ingredients || [];
    model = requestData.model || 'gemini-2.0-flash-exp';
    temperature = requestData.temperature || 0.7;

    console.log(`[${requestId}] Request Parameters:`, {
      promptLength: prompt?.length || 0,
      ingredientsCount: ingredients.length,
      ingredients: ingredients,
      model,
      temperature,
    });

    // promptが必須パラメータかチェック
    if (!prompt) {
      console.log(`[${requestId}] ERROR: Prompt is missing`);
      return NextResponse.json(
        { success: false, error: 'プロンプトが指定されていません' },
        { status: 400 }
      );
    }

    // 開発環境の場合はモックデータを返す
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[${requestId}] Development mode: Returning mock substitution data`
      );

      const mockResponse = createMockSubstitutionResponse(
        ingredients,
        prompt,
        model,
        temperature
      );
      const duration = Date.now() - startTime;
      console.log(
        `[${requestId}] Mock substitution response generated in ${duration}ms`
      );
      return NextResponse.json(mockResponse);
    }

    // Gemini APIキーが設定されているかチェック
    if (!process.env.GEMINI_API_KEY) {
      console.log(`[${requestId}] ERROR: Gemini API key not configured`);
      return NextResponse.json(
        { success: false, error: 'Gemini APIキーが設定されていません' },
        { status: 500 }
      );
    }

    // Geminiモデルを取得
    console.log(
      `[${requestId}] Creating Gemini model for substitution request:`,
      {
        model,
        temperature,
      }
    );

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

    // Gemini APIにリクエストを送信
    console.log(`[${requestId}] Sending substitution request to Gemini API...`);
    const apiStartTime = Date.now();

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const apiDuration = Date.now() - apiStartTime;
    const totalDuration = Date.now() - startTime;

    console.log(`[${requestId}] Gemini API Substitution Response:`, {
      apiDuration: `${apiDuration}ms`,
      totalDuration: `${totalDuration}ms`,
      responseLength: text.length,
      responsePreview:
        text.substring(0, 200) + (text.length > 200 ? '...' : ''),
    });

    return NextResponse.json({
      success: true,
      data: {
        text,
        model,
        temperature,
        prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[${requestId}] Substitution API Error after ${duration}ms:`,
      {
        errorType: error?.constructor?.name || 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        model,
        temperature,
      }
    );

    // Gemini API固有のエラーハンドリング
    let errorMessage = '予期しないエラーが発生しました';
    let statusCode = 500;

    if (error instanceof Error) {
      const message = error.message.toLowerCase();

      if (message.includes('quota') || message.includes('limit')) {
        errorMessage =
          'API使用制限に達しました。しばらくしてからもう一度お試しください。';
        statusCode = 429;
        console.log(
          `[${requestId}] API quota exceeded, falling back to mock data`
        );

        // クォータ制限の場合はモックデータを返す
        try {
          const defaultIngredients = requestData.ingredients || [
            '一般的な材料',
          ];
          const mockResponse = createMockSubstitutionResponse(
            defaultIngredients,
            requestData.prompt || 'デフォルトプロンプト',
            model,
            temperature
          );
          console.log(
            `[${requestId}] Returning mock substitution data due to quota limit`
          );
          return NextResponse.json(mockResponse);
        } catch (mockError) {
          console.error(
            `[${requestId}] Failed to generate mock substitution response:`,
            mockError
          );
        }
      } else if (
        message.includes('network') ||
        message.includes('connection')
      ) {
        errorMessage =
          'ネットワークエラーが発生しました。接続を確認してもう一度お試しください。';
        statusCode = 503;
      } else if (
        message.includes('unauthorized') ||
        message.includes('api key')
      ) {
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
        details:
          process.env.NODE_ENV === 'development'
            ? {
                originalError:
                  error instanceof Error ? error.message : String(error),
                duration: `${duration}ms`,
                requestId,
              }
            : undefined,
      },
      { status: statusCode }
    );
  }
}
