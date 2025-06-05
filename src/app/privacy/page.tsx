import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'CookBotサービスのプライバシーポリシーをご確認ください。お客様の個人情報の取り扱いについて詳しく説明しています。',
  keywords: ['プライバシーポリシー', '個人情報保護', 'CookBot'],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'CookBot - プライバシーポリシー',
    description: 'CookBotサービスのプライバシーポリシーをご確認ください。',
    type: 'article',
    locale: 'ja_JP',
    siteName: 'CookBot',
    url: 'https://cookbot.jp/privacy',
  },
  alternates: {
    canonical: 'https://cookbot.jp/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#8fdeb1] hover:text-[#5fbd84] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ホームに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            プライバシーポリシー
          </h1>
          <p className="text-gray-600 mt-2">最終更新日: 2025年6月1日</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. 基本方針
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              CookBot（以下「当サービス」といいます）は、利用者のプライバシーを尊重し、個人情報の保護に関する法令を遵守して、
              適切に個人情報を取り扱います。本プライバシーポリシーは、当サービスにおける個人情報の取り扱いについて説明します。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. 収集する情報
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                当サービスでは、以下の情報を収集する場合があります：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>利用状況データ</strong>:
                  閲覧したレシピ、検索履歴、フィルター設定、「いいね」や「パス」の操作履歴
                </li>
                <li>
                  <strong>デバイス情報</strong>:
                  IPアドレス、ブラウザの種類、OS、画面解像度
                </li>
                <li>
                  <strong>アクセスログ</strong>:
                  アクセス日時、参照元URL、利用したページ
                </li>
                <li>
                  <strong>Cookie情報</strong>:
                  サービスの機能向上やパーソナライゼーションのため
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. 情報の利用目的
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">収集した情報は、以下の目的で利用します：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AIによるレシピ推薦の精度向上</li>
                <li>ユーザーの嗜好に合わせたパーソナライズ機能の提供</li>
                <li>サービスの改善と新機能の開発</li>
                <li>利用状況の分析と統計データの作成</li>
                <li>技術的な問題の特定と解決</li>
                <li>不正利用の防止とセキュリティの向上</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Google Analyticsの利用
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                当サービスでは、サービス向上のためGoogle
                Analyticsを利用しています。 Google
                Analyticsは、Cookieを使用してWebサイトの利用状況を収集・分析します。
              </p>
              <p className="mb-3">収集される情報には以下が含まれます：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ページビュー数と滞在時間</li>
                <li>レシピの閲覧履歴と操作（いいね・パス）</li>
                <li>検索キーワードとフィルター利用状況</li>
                <li>デバイスとブラウザ情報</li>
                <li>地理的な位置情報（国・地域レベル）</li>
              </ul>
              <p className="mt-3">
                これらの情報は匿名化されており、個人を特定することはできません。
                Google Analyticsのプライバシーポリシーについては、
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8fdeb1] hover:text-[#5fbd84] underline"
                >
                  Googleのプライバシーポリシー
                </a>
                をご確認ください。
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Cookieについて
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                当サービスでは、以下の目的でCookieを使用します：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ユーザー設定の保存（フィルター設定など）</li>
                <li>セッション管理</li>
                <li>レシピ推薦の精度向上</li>
                <li>サイト利用状況の分析</li>
              </ul>
              <p className="mt-3">
                ブラウザの設定でCookieを無効にすることができますが、一部機能が制限される場合があります。
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. AI学習での利用
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当サービスでは、より良いレシピ推薦を行うため、利用者の行動データ（閲覧履歴、検索履歴、評価履歴等）を
              匿名化した上でAIモデルの学習に利用する場合があります。この際、個人を特定できる情報は一切使用しません。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. 第三者への提供
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                収集した個人情報は、以下の場合を除き第三者に提供することはありません：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>利用者の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>生命、身体または財産の保護のために必要がある場合</li>
                <li>統計データとして匿名化された情報を提供する場合</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. データの保存期間
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              収集したデータは、サービス提供に必要な期間保存し、その後適切に削除または匿名化します。
              ただし、法令により保存が義務付けられている場合は、その期間に従います。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. セキュリティ
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当社は、収集した情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              ただし、インターネット上での情報伝達の完全な安全性を保証するものではありません。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. プライバシーポリシーの変更
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。
              変更後のプライバシーポリシーは、当サービス上に掲載した時点で効力を生じるものとします。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. お問い合わせ
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              本プライバシーポリシーに関するお問い合わせは、アプリ内のお問い合わせフォームまたは公式サポートページからご連絡ください。
            </p>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-[#8fdeb1]">
              <h3 className="font-semibold text-gray-900 mb-2">
                データの管理について
              </h3>
              <p className="text-sm text-gray-600">
                CookBotは、より良いレシピ推薦のためにAI技術を活用していますが、
                利用者のプライバシーを最優先に考え、適切なデータ管理を行っています。
                ご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
