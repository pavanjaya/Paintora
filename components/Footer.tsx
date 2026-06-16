import Link from 'next/link'

const NAV_COLS = [
  {
    title: 'Discover',
    links: [
      { label: 'Spaces', href: '/spaces' },
      { label: 'Collections', href: '/collections' },
      { label: 'Styles', href: '/styles' },
      { label: 'Mediums', href: '/mediums' },
      { label: 'Subjects', href: '/subjects' },
      { label: 'Color Palettes', href: '/color-palettes' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand-row">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <img src="/logo.svg" alt="Paintora" style={{ height: 28, width: 'auto', display: 'block', opacity: 1 }} />
            </div>
            <p className="footer-tagline">Curated contemporary paintings for homes, offices, hospitality, and thoughtfully designed interiors.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/mypaintora/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/paintora" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-nav-cols">
            {NAV_COLS.map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p className="footer-make">Paintora by <a href="https://hueness.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Hueness</a> · © 2026 All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
