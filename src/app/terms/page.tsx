import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CookBot - 利用規約',
  description: 'CookBotサービスの利用規約をご確認ください。',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#8fdeb1] hover:text-[#5fbd84] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ホームに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">利用規約</h1>
          <p className="text-gray-600 mt-2">最終更新日: 2025年6月1日</p>
        </div>

        {/* 利用規約内容 */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第1条（適用）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              本利用規約（以下「本規約」といいます）は、CookBot（以下「当サービス」といいます）の利用に関する条件を定めるものです。
              利用者は、当サービスを利用することにより、本規約に同意したものとみなされます。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第2条（サービス内容）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当サービスは、AI技術を活用してユーザーの好みに合わせたレシピを提案するサービスです。
              レシピの内容や栄養情報については参考程度にご利用ください。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第3条（利用者の責任）
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                利用者は、以下の行為を行ってはならないものとします：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>法令に違反する行為</li>
                <li>当サービスの運営を妨害する行為</li>
                <li>他の利用者や第三者に迷惑をかける行為</li>
                <li>当サービスのシステムに不正にアクセスする行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第4条（プライバシー・データの取り扱い）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当社は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
              詳細については、
              <Link
                href="/privacy"
                className="text-[#8fdeb1] hover:text-[#5fbd84] underline"
              >
                プライバシーポリシー
              </Link>
              をご確認ください。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第5条（免責事項）
            </h2>
            <div className="mb-6 text-gray-700 leading-relaxed">
              <p className="mb-3">
                当社は、以下について一切の責任を負いません：
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>レシピの内容に関する正確性や安全性</li>
                <li>アレルギー反応や食中毒等の健康被害</li>
                <li>利用者が当サービスを利用して作成した料理による損害</li>
                <li>システムの一時的な停止やメンテナンスによる利用停止</li>
                <li>その他、当サービスの利用に関連して生じた損害</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第6条（サービスの変更・終了）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当社は、利用者への事前通知なく、当サービスの内容を変更、追加、削除することができます。
              また、当社の判断により当サービスを終了することができます。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第7条（規約の変更）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              当社は、必要に応じて本規約を変更することができます。
              変更後の規約は、当サービス上に掲載した時点で効力を生じるものとします。
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              第8条（準拠法・管轄裁判所）
            </h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              本規約は日本法に準拠し、当サービスに関する紛争については、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                本利用規約に関するお問い合わせは、アプリ内のお問い合わせフォームまたは公式サポートページからご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
