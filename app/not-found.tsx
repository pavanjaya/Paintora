import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Paintora',
}

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-inner">
        <Link href="/" className="notfound-logo" aria-label="Paintora">
          <img src="/logo.svg" alt="Paintora" style={{ height: 28, width: 'auto' }} />
        </Link>

        <div className="notfound-code">404</div>
        <h1 className="notfound-title">This canvas is blank.</h1>
        <p className="notfound-sub">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.<br />
          Let&rsquo;s get you back to something beautiful.
        </p>

        <div className="notfound-actions">
          <Link href="/" className="notfound-cta-primary">Browse paintings</Link>
          <Link href="/trending" className="notfound-cta-secondary">See what&rsquo;s trending</Link>
        </div>

        <div className="notfound-suggestions">
          <p className="notfound-suggestions-label">Popular collections</p>
          <div className="notfound-pills">
            {[
              { label: 'Abstract', href: '/styles/abstract' },
              { label: 'Minimalist', href: '/styles/minimalist' },
              { label: 'Living Room', href: '/spaces/living-room' },
              { label: 'Office', href: '/spaces/office' },
              { label: 'Landscape', href: '/subjects/landscape' },
            ].map(p => (
              <Link key={p.label} href={p.href} className="notfound-pill">{p.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
