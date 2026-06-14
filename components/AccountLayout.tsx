'use client'

import Link from 'next/link'

type Props = {
  active: 'profile' | 'saved' | 'downloads' | 'settings'
  user: { email?: string } | null
  children: React.ReactNode
}

const NAV = [
  {
    key: 'profile', label: 'Profile', href: '/profile',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    key: 'saved', label: 'Saved', href: '/saved',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    key: 'downloads', label: 'Downloads', href: '/downloads',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  },
  {
    key: 'settings', label: 'Settings', href: '/settings',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
]

export default function AccountLayout({ active, user, children }: Props) {
  const initial = (user?.email ?? 'U')[0].toUpperCase()

  return (
    <div className="al-page">
      <div className="al-wrap">
        {/* Sidebar */}
        <aside className="al-sidebar">
          <div className="al-user-block">
            <div className="al-user-avatar">{initial}</div>
            <div className="al-user-info">
              <div className="al-user-name">{user?.email?.split('@')[0] ?? 'Account'}</div>
              <div className="al-user-email">{user?.email}</div>
            </div>
          </div>

          <nav className="al-nav">
            {NAV.map(({ key, label, href, icon }) => (
              <Link key={key} href={href} className={`al-nav-item${active === key ? ' active' : ''}`}>
                <span className="al-nav-icon">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="al-content">
          {children}
        </main>
      </div>
    </div>
  )
}
