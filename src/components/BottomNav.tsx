import { useNavigate, useLocation } from 'react-router-dom'

interface BottomNavProps {
  current?: string
}

export default function BottomNav({ current }: BottomNavProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const currentPath = current || (() => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path.startsWith('/museum')) return 'home'
    if (path === '/profile') return 'profile'
    return 'home'
  })()

  const navItems = [
    {
      key: 'home',
      label: '首页',
      path: '/',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-amber-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      key: 'footprint',
      label: '足迹',
      path: '/',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-amber-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      key: 'profile',
      label: '我的',
      path: '/profile',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-amber-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-100 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.key
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-400'
              }`}
            >
              {item.icon(isActive)}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
