import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { createMockRecipeResponse } from '@/utils/mockHelpers';

// Gemini APIクライアントを初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    // 環境変数の状態をログ出力（デバッグ用）
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      keyLength: process.env.GEMINI_API_KEY?.length || 0,
      timestamp: new Date().toISOString(),
    });

    // リクエストボディを解析
    const {
      prompt,
      model = 'gemini-2.0-flash-exp',
      temperature = 0.7,
    } = await request.json();

    console.log('Request received:', {
      promptLength: prompt?.length || 0,
      model,
      temperature,
    });

    // promptが必須パラメータかチェック
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'プロンプトが指定されていません' },
        { status: 400 }
      );
    }

    // 開発環境の場合はモックデータを返す
    if (process.env.NODE_ENV === 'development') {
      const mockResponse = createMockRecipeResponse(prompt, model, temperature);
      return NextResponse.json(mockResponse);
    }

    // Gemini APIキーが設定されているかチェック
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Gemini APIキーが設定されていません' },
        { status: 500 }
      );
    }

    // Geminiモデルを取得
    const geminiModel = genAI.getGenerativeModel({
      model,
      generationConfig: {
        temperature,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
    });

    // Gemini APIにリクエストを送信
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      data: {
        text,
        model,
        temperature,
        prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''), // ログ用に短縮
      },
    });
  } catch (error) {
    console.error('Gemini API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          'サーバーエラーが発生しました。しばらくしてからもう一度お試しください。',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : '予期しないエラーが発生しました'
            : undefined,
        environment: process.env.NODE_ENV,
        hasApiKey: !!process.env.GEMINI_API_KEY,
      },
      { status: 500 }
    );
  }
}
