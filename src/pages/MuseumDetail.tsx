import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

interface Museum {
  id: string
  name: string
  province: string
  city: string
  district?: string
  address: string
  description?: string
  openTime?: string
  coreExhibits?: string
  images: string[]
  latitude?: number
  longitude?: number
  level: string
}

export default function MuseumDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [museum, setMuseum] = useState<Museum | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [hasVisited, setHasVisited] = useState(false)

  useEffect(() => {
    if (id) {
      fetchMuseumDetail(id)
    }
  }, [id])

  const fetchMuseumDetail = async (museumId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/museums/${museumId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setMuseum(data)
      } else {
        setMockData()
      }
    } catch (error) {
      console.error('获取博物馆详情失败:', error)
      setMockData()
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    setMuseum({
      id: '1',
      name: '故宫博物院',
      province: '北京',
      city: '北京',
      district: '东城区',
      address: '景山前街4号',
      description: '中国明清两代的皇家宫殿，旧称紫禁城...',
      openTime: '08:30-17:00（周一闭馆）',
      coreExhibits: '清明上河图、千里江山图',
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
        'https://picsum.photos/400/300?random=3',
      ],
      latitude: 39.916345,
      longitude: 116.397155,
      level: '国家级',
    })
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleMarkVisited = () => {
    setHasVisited(!hasVisited)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!museum) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">博物馆信息加载失败</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-amber-600 text-white px-6 py-2 rounded-full"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-gray-800 flex-1">{museum.name}</h1>
            <button 
              onClick={handleFavorite}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg 
                className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {/* Image Gallery */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={museum.images[0]}
            alt={museum.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="p-4 space-y-6">
          {/* Title & Level */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                {museum.level}
              </span>
              {hasVisited && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  已打卡
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{museum.name}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {museum.province} {museum.city} {museum.district}
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium text-gray-800">{museum.address}</p>
              </div>
            </div>
          </div>

          {/* Open Time */}
          {museum.openTime && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-800">开放时间</p>
                  <p className="text-gray-600">{museum.openTime}</p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {museum.description && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">博物馆简介</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{museum.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleMarkVisited}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                hasVisited 
                  ? 'bg-green-500 text-white' 
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {hasVisited ? '✓ 已打卡' : '打卡'}
            </button>
            <button
              onClick={() => navigate('/share')}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              分享
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav current="home" />
    </div>
  )
}
