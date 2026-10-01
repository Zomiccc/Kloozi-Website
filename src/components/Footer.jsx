// Flazyn — site footer. Columns come from lib/site.js. The bottom lines
// carry the registered business details required on every page.
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { FOOTER_COLUMNS, SITE, addressLine } from '../lib/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" aria-label="Flazyn home"><Logo /></Link>
            <p>{SITE.tagline} Lead management, WhatsApp and email in one calm workspace. Now in early access.</p>
            <p><a href={`mailto:${SITE.email}`} className="link-arrow">{SITE.email}</a></p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              {col.links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.legalName} trading as {SITE.name} · ABN {SITE.abn} · {addressLine()}</span>
          <span className="footer-legal">
            <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> · <Link to="/data-deletion">Data deletion</Link> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </span>
        </div>
        <p className="footer-note">WhatsApp is a trademark of Meta Platforms, Inc. Flazyn is not affiliated with Meta.</p>
      </div>
    </footer>
  );
}
