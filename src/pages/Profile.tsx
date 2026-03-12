import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

interface User {
  id: string
  openId: string
  nickname: string
  avatar?: string
}

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    museums: 0,
    provinces: 0,
    cities: 0,
    shares: 0,
    likes: 0,
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    loadStats()
  }, [])

  const loadStats = async () => {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id
    if (!userId) return

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:3000/footprints/user/${userId}/statistics`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      
      if (res.ok) {
        const data = await res.json()
        setStats({
          museums: data.totalMuseums,
          provinces: data.totalProvinces,
          cities: data.totalCities,
          shares: 0,
          likes: 0,
        })
      }
    } catch (error) {
      console.error('获取统计失败:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">请先登录</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-amber-600 text-white px-6 py-2 rounded-full"
          >
            去登录
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-xl font-bold text-amber-100">个人中心</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.avatar ? (
                <img src={user.avatar} alt={user.nickname} className="w-full h-full rounded-full object-cover" />
              ) : (
                user.nickname.charAt(0)
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{user.nickname}</h2>
              <p className="text-sm text-gray-500">ID: {user.openId.slice(0, 8)}...</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.museums}</div>
            <div className="text-xs text-gray-500 mt-1">已打卡</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.provinces}</div>
            <div className="text-xs text-gray-500 mt-1">省份</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.cities}</div>
            <div className="text-xs text-gray-500 mt-1">城市</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
          <button 
            onClick={() => navigate('/footprints')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">我的足迹</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">我的收藏</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button 
            onClick={() => navigate('/share')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="font-medium text-gray-800">我的分享</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 rounded-xl transition-colors"
        >
          退出登录
        </button>
      </main>

      {/* Bottom Navigation */}
      <BottomNav current="profile" />
    </div>
  )
}
