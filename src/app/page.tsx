export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-semibold">レシピ</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 pb-20">
        {/* Recipe Image */}
        <div className="mb-4">
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-sm">レシピ画像</p>
            </div>
          </div>
        </div>{' '}
        {/* Recipe Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
          ダミーレシピタイトル
        </h2>
        {/* Ingredients Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">材料</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">材料A</span>
              <span className="text-gray-600">200g</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">材料B</span>
              <span className="text-gray-600">1個</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">調味料C</span>
              <span className="text-gray-600">大さじ1</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">調味料D</span>
              <span className="text-gray-600">適量</span>
            </div>
          </div>
        </div>
        {/* Steps Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">作り方</h3>
          {/* Step 1 */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                1
              </div>
              <p className="text-gray-700 flex-1">
                材料Aを下準備します。適当な大きさに切っておきます。
              </p>
            </div>
            <div className="flex space-x-2 ml-9">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
            </div>
          </div>
          {/* Step 2 */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                2
              </div>
              <p className="text-gray-700 flex-1">
                フライパンに調味料Cを入れて、材料Bと一緒に炒めます。
              </p>
            </div>
            <div className="flex space-x-2 ml-9">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
            </div>
          </div>
          {/* Step 3 */}
          <div className="mb-6">
            <div className="flex items-start mb-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                3
              </div>
              <p className="text-gray-700 flex-1">
                調味料Dで味を整えて、お皿に盛り付けたら完成です！
              </p>
            </div>
            <div className="flex space-x-2 ml-9">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">写真</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button className="flex flex-col items-center space-y-1">
            <span className="text-xs text-gray-400">さがす</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <span className="text-xs text-blue-500">レシピ</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <span className="text-xs text-gray-400">マイページ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
