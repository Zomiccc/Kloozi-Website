// Flazyn — site footer. Columns come from lib/site.js.
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { FOOTER_COLUMNS, SITE } from '../lib/site.js';

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
          <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
          <span>WhatsApp is a trademark of Meta Platforms, Inc. Flazyn is not affiliated with Meta.</span>
        </div>
      </div>
    </footer>
  );
}
