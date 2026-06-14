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
    <div style={{ paddingTop: 68, minHeight: '85vh', background: '#f0f0f2' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ flexShrink: 0, width: 210, background: '#fff', borderRadius: 16, border: '1px solid #e2e2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {/* User block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '1rem', borderBottom: '1px solid #e2e2e6', background: '#f8f8fa' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0F0F14', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'var(--sans)', flexShrink: 0 }}>
              {initial}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0F0F14', lineHeight: 1.3 }}>{user?.email?.split('@')[0] ?? 'Account'}</div>
              <div style={{ fontSize: 11, color: '#71717a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV.map(({ key, label, href, icon }) => (
              <Link
                key={key}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 12px', borderRadius: 10,
                  fontSize: 13.5, fontWeight: active === key ? 600 : 500,
                  color: active === key ? '#fff' : '#52525b',
                  background: active === key ? '#0F0F14' : 'transparent',
                  textDecoration: 'none', fontFamily: 'var(--sans)',
                  transition: 'background 0.12s, color 0.12s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', opacity: active === key ? 1 : 0.6 }}>{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
