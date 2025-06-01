import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CookBot - レシピ検索',
  description:
    'AIが提案するレシピをスワイプで選択。調理時間、人数、食材を指定してあなたにぴったりのレシピを見つけましょう。',
  keywords: ['レシピ検索', 'AIレシピ', 'スワイプ', '料理', 'CookBot'],
  openGraph: {
    title: 'CookBot - レシピ検索',
    description:
      'AIが提案するレシピをスワイプで選択。調理時間、人数、食材を指定してあなたにぴったりのレシピを見つけましょう。',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'CookBot',
    url: 'https://cookbot.jp/recipe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CookBot - レシピ検索',
    description:
      'AIが提案するレシピをスワイプで選択。調理時間、人数、食材を指定してあなたにぴったりのレシピを見つけましょう。',
  },
  alternates: {
    canonical: 'https://cookbot.jp/recipe',
  },
};

export default function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
