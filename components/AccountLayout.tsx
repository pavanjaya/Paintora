'use client'

import Link from 'next/link'

type Props = {
  active: 'profile' | 'saved' | 'downloads' | 'settings'
  user: { email?: string } | null
  avatarUrl?: string | null
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

export default function AccountLayout({ active, user, avatarUrl, children }: Props) {
  const initial = (user?.email ?? 'U')[0].toUpperCase()

  return (
    <div style={{ paddingTop: 68, minHeight: '85vh', background: '#fff' }}>
      {/* Desktop: sidebar + content */}
      <div className="al-desktop">
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'row', gap: '1.5rem', alignItems: 'flex-start' }}>
          <aside style={{ flexShrink: 0, width: 180, background: 'transparent' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {NAV.map(({ key, label, href, icon }) => (
                <Link key={key} href={href} style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '9px 12px', borderRadius: 8,
                  fontSize: 13.5, fontWeight: active === key ? 600 : 400,
                  color: active === key ? '#191947' : '#71717a',
                  background: active === key ? '#f4f4f6' : 'transparent',
                  textDecoration: 'none', fontFamily: 'var(--sans)',
                  transition: 'background 0.12s, color 0.12s',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: active === key ? '#7c3aed' : 'currentColor', opacity: active === key ? 1 : 0.5 }}>{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {children}
          </main>
        </div>
      </div>

      {/* Mobile: content + bottom tab bar */}
      <div className="al-mobile">
        <div style={{ padding: '1rem 1rem 5rem' }}>
          {children}
        </div>
        <div className="al-bottom-tabs">
          {NAV.map(({ key, label, href, icon }) => (
            <Link key={key} href={href} className={`al-tab${active === key ? ' al-tab-active' : ''}`}>
              <span className="al-tab-icon">{icon}</span>
              <span className="al-tab-label">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
