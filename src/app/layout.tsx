import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { headers } from 'next/headers';
import { isGoogleAppsScriptRequest } from '@/utils/userAgent';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CookBot - AIが作るあなただけのレシピ提案',
    template: '%s | CookBot',
  },
  description:
    'AIが調理時間、人数、食材から最適なレシピを提案。スワイプ操作で簡単にレシピを選択できる新しい料理体験をお楽しみください。',
  keywords: ['レシピ', 'AI', '料理', 'レシピ提案', 'スワイプ', 'CookBot'],
  authors: [{ name: 'CookBot Team' }],
  creator: 'CookBot Team',
  publisher: 'CookBot',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  manifest: '/manifest.json',
  themeColor: '#8fdeb1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CookBot',
  },
  alternates: {
    canonical: 'https://cookbot.jp',
  },
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
    creator: '@cookbot_jp',
  },
  metadataBase: new URL('https://cookbot.jp'),
};

const gaId = process.env.GOOGLE_ANALYTICS_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // リクエストヘッダーを取得してGASからのアクセスを検出
  const headersList = await headers();
  const isGasRequest = isGoogleAppsScriptRequest(headersList);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const shouldExcludeGA = isGasRequest || isDevelopment;

  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/images/icon.svg" />
        <link rel="icon" href="/images/icon.png" />
        <link rel="apple-touch-icon" href="/images/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {gaId && !shouldExcludeGA && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
