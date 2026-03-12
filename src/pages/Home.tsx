import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

interface User {
  id: string
  openId: string
  nickname: string
  avatar?: string
}

interface Museum {
  id: string
  name: string
  province: string
  city: string
  image: string
  level: string
  description?: string
}

interface HomeProps {
  user: User
  onLogout: () => void
}

export default function Home({ user, onLogout }: HomeProps) {
  const navigate = useNavigate()
  const [museums, setMuseums] = useState<Museum[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')

  // 获取博物馆列表
  useEffect(() => {
    fetchMuseums()
  }, [])

  const fetchMuseums = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/museums', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setMuseums(data)
      }
    } catch (error) {
      console.error('获取博物馆失败:', error)
      // 使用模拟数据
      setMuseums([
        { id: '1', name: '故宫博物院', province: '北京', city: '北京', image: 'https://picsum.photos/400/300?random=1', level: '国家级', description: '中国明清两代的皇家宫殿' },
        { id: '2', name: '上海博物馆', province: '上海', city: '上海', image: 'https://picsum.photos/400/300?random=2', level: '国家级', description: '中国古代艺术博物馆' },
        { id: '3', name: '陕西历史博物馆', province: '陕西', city: '西安', image: 'https://picsum.photos/400/300?random=3', level: '国家级', description: '华夏珍宝库' },
        { id: '4', name: '南京博物院', province: '江苏', city: '南京', image: 'https://picsum.photos/400/300?random=4', level: '国家级', description: '中国三大博物馆之一' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      fetchMuseums()
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/museums/search?keyword=${encodeURIComponent(searchKeyword)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setMuseums(data)
      }
    } catch (error) {
      console.error('搜索失败:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-amber-100">博物馆之旅</h1>
              <p className="text-amber-200 text-xs">欢迎，{user.nickname}</p>
            </div>
            <button 
              onClick={onLogout}
              className="text-amber-200 hover:text-white text-sm"
            >
              退出
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-800 to-orange-900 shadow-xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">探索文化之旅</h2>
            <p className="text-amber-100 text-sm mb-4">发现全国3000+博物馆</p>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/profile')}
                className="bg-amber-500 hover:bg-amber-400 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              >
                我的足迹
              </button>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="搜索博物馆..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-3 pl-12 bg-white rounded-xl shadow-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <svg 
            className="absolute left-4 top-3.5 w-5 h-5 text-amber-400 cursor-pointer"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            onClick={handleSearch}
          >
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
                  onClick={() => navigate(`/museum/${museum.id}`)}
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
                      {museum.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{museum.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav current="home" />
    </div>
  )
}
