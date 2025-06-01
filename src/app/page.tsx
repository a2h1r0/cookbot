import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CookBot - AIが作るあなただけのレシピ提案',
  description:
    'AIが調理時間、人数、食材から最適なレシピを提案。スワイプ操作で簡単にレシピを選択できる新しい料理体験をお楽しみください。',
  keywords: ['レシピ', 'AI', '料理', 'レシピ提案', 'スワイプ', 'CookBot'],
  authors: [{ name: 'CookBot Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'CookBot - AIが作るあなただけのレシピ提案',
    description:
      'AIが調理時間、人数、食材から最適なレシピを提案。スワイプ操作で簡単にレシピを選択できる新しい料理体験をお楽しみください。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'CookBot',
    url: 'https://cookbot.jp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CookBot - AIが作るあなただけのレシピ提案',
    description:
      'AIが調理時間、人数、食材から最適なレシピを提案。スワイプ操作で簡単にレシピを選択できる新しい料理体験をお楽しみください。',
  },
  alternates: {
    canonical: 'https://cookbot.jp',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* ヒーローセクション */}
      <section className="px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          {' '}
          {/* ロゴ/アイコン */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center justify-center">
              <Image
                src="/images/icon.svg"
                alt="CookBot"
                width={60}
                height={60}
                className="h-16 w-auto"
              />
            </div>
          </div>
          {/* メインヘッドライン */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AIが作る
            <br />
            <span className="text-orange-500">あなただけの</span>
            <br />
            レシピ提案
          </h1>{' '}
          {/* サブヘッドライン */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            冷蔵庫の材料を教えるだけで、AIが美味しいレシピを瞬時に提案。
            料理の悩みを解決し、毎日の食事を楽しくします。
          </p>
          {/* 利用規約・プライバシーポリシーリンク */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-500">
              ご利用前に
              <Link
                href="/terms"
                className="text-orange-500 hover:text-orange-600 underline mx-1"
              >
                利用規約
              </Link>
              と
              <Link
                href="/privacy"
                className="text-orange-500 hover:text-orange-600 underline mx-1"
              >
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>
          </div>
          {/* CTAボタン */}
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center mb-12">
            <Link
              href="/recipe"
              className="block w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              今すぐレシピを作成（登録不要）
            </Link>
          </div>
          {/* ヒーロー画像 */}
          <div className="relative mx-auto max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-left">
                  🍅 トマト、🧅 玉ねぎ、🥚 卵があります
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="text-gray-800 text-left font-medium">
                  AI提案: 「トマトと玉ねぎの簡単オムレツ」
                </p>
                <p className="text-gray-600 text-sm text-left mt-2">
                  調理時間: 15分 | 2人分
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特徴1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                瞬時のレシピ提案
              </h3>
              <p className="text-gray-600">
                材料を入力するだけで、AIが数秒でオリジナルレシピを生成。時間を節約して美味しい料理を作れます。
              </p>
            </div>

            {/* 特徴2 */}
            {/* <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              パーソナライズされた提案
            </h3>
            <p className="text-gray-600">
              あなたの好み、アレルギー、食事制限を学習し、最適なレシピを提案。毎回新しい発見があります。
            </p>
          </div> */}

            {/* 特徴3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2V9h-1V8a5 5 0 00-10 0v1H7v2zm2-1V8a3 3 0 016 0v2H11z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                食材の無駄を削減
              </h3>
              <p className="text-gray-600">
                冷蔵庫にある材料を最大限活用。食材ロスを減らして、経済的で環境に優しい料理ライフを実現。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使い方セクション */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            3ステップで完了
          </h2>

          <div className="space-y-8 md:space-y-12">
            {/* ステップ1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  材料を入力
                </h3>
                <p className="text-gray-600 text-lg">
                  冷蔵庫にある材料や使いたい食材を簡単に入力。写真撮影でも材料を認識できます。
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      🍅 トマト
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      🧅 玉ねぎ
                    </span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      🥚 卵
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  AIが分析
                </h3>
                <p className="text-gray-600 text-lg">
                  高度なAIが材料の組み合わせを分析し、最適なレシピを瞬時に生成します。
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <span className="text-gray-600 ml-2">AIが分析中...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  レシピ完成
                </h3>
                <p className="text-gray-600 text-lg">
                  詳細な作り方、調理時間、栄養情報付きのレシピが完成。すぐに料理を始められます。
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    トマトと玉ねぎの簡単オムレツ
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    調理時間: 15分 | 2人分
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1. 玉ねぎを薄切りにする</p>
                    <p>2. トマトを角切りにする</p>
                    <p>3. 卵を溶いて塩コショウする</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {' '}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/logo.svg"
                  alt="CookBot"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-6">
                AIの力で毎日の料理をもっと楽しく、もっと簡単に。
                あなたの料理ライフをサポートします。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">サポート</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    利用規約
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CookBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
