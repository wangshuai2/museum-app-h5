import { useState, useEffect } from 'react'
import './App.css'

// 博物馆数据类型
interface Museum {
  id: string
  name: string
  province: string
  city: string
  image: string
  level: string
}

// 模拟博物馆数据
const mockMuseums: Museum[] = [
  { id: '1', name: '故宫博物院', province: '北京', city: '北京', image: 'https://picsum.photos/400/300?random=1', level: '国家级' },
  { id: '2', name: '上海博物馆', province: '上海', city: '上海', image: 'https://picsum.photos/400/300?random=2', level: '国家级' },
  { id: '3', name: '陕西历史博物馆', province: '陕西', city: '西安', image: 'https://picsum.photos/400/300?random=3', level: '国家级' },
  { id: '4', name: '南京博物院', province: '江苏', city: '南京', image: 'https://picsum.photos/400/300?random=4', level: '国家级' },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [museums, setMuseums] = useState<Museum[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟API加载
    setTimeout(() => {
      setMuseums(mockMuseums)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-amber-100 tracking-wide">
              博物馆之旅
            </h1>
            <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center">
              <span className="text-amber-100 text-sm">我</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-800 to-orange-900 shadow-xl">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">探索文化之旅</h2>
                <p className="text-amber-100 text-sm mb-4">发现全国3000+博物馆</p>
                <button className="bg-amber-500 hover:bg-amber-400 text-amber-900 px-6 py-2 rounded-full text-sm font-semibold transition-all">
                  开始探索
                </button>
              </div>
            </section>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="搜索博物馆..."
                className="w-full px-4 py-3 pl-12 bg-white rounded-xl shadow-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <svg className="absolute left-4 top-3.5 w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Museum List */}
            <section>
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
                <span className="w-1 h-6 bg-amber-600 rounded-full mr-2"></span>
                热门博物馆
              </h3>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {museums.map((museum) => (
                    <div
                      key={museum.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex">
                        <img
                          src={museum.image}
                          alt={museum.name}
                          className="w-24 h-24 object-cover"
                        />
                        <div className="flex-1 p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                              {museum.level}
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-900">{museum.name}</h4>
                          <p className="text-sm text-gray-500">{museum.province} · {museum.city}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'footprint' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-amber-900 mb-4">我的足迹</h2>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">0</div>
              <p className="text-gray-500">已打卡博物馆</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-amber-900 mb-4">个人中心</h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">游客用户</h3>
                  <p className="text-sm text-gray-500">点击登录</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-amber-600 bg-amber-50' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">首页</span>
          </button>
          
          <button
            onClick={() => setActiveTab('footprint')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'footprint' ? 'text-amber-600 bg-amber-50' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">足迹</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-amber-600 bg-amber-50' : 'text-gray-400'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">我的</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App
