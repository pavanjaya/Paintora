const NAV_COLS = [
  { title: 'Explore', links: ['Gallery', 'Collections', 'Styles', 'Artists', 'In Situ'] },
  { title: 'Spaces', links: ['Living Room', 'Bedroom', 'Home Office', 'Dining Room', 'All Spaces'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Licensing', 'Cookie Policy', 'GDPR'] },
]

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand-row">
          <div>
            <div className="footer-brand">
              <svg width="130" height="34" viewBox="0 0 130 34" fill="none">
                <text x="0" y="26" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="24" fill="#0F0F14" letterSpacing="-0.8">Paintora</text>
              </svg>
            </div>
            <p className="footer-tagline">Contemporary AI-curated paintings for modern homes, offices, and spaces of intention.</p>
          </div>
          <div className="footer-nav-cols">
            {NAV_COLS.map(col => (
              <div key={col.title}>
                <div className="footer-col-title">{col.title}</div>
                <ul className="footer-links">
                  {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-make">© 2024 Paintora. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-legal-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
            <div className="footer-social">
              {['𝕏', 'in', '📷', '𝔽'].map((icon, i) => (
                <a key={i} href="#" aria-label="Social">{icon}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
