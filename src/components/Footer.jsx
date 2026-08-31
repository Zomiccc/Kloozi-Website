// Zomic marketing — footer (Part 1, HubSpot-style multi-column).
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '../lib/content.js';
import Mascot from './Mascot.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="flex items-center gap-2">
              <Mascot size={36} mood="idle" seed={9} />
              <span className="footer-brand-name">Zomic</span>
            </Link>
            <p className="footer-tag">
              The CRM that turns conversations into customers. Lead management,
              WhatsApp automation, and email marketing — in one calm workspace.
            </p>
            <div className="footer-social" style={{ marginTop: 20 }}>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="Twitter / X"><Twitter size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer noopener" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="footer-col">
              <p className="footer-col-title">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.to + l.label} to={l.to} className="footer-link">{l.label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
            <span className="footer-copy">© {new Date().getFullYear()} Zomic. All rights reserved.</span>
          </div>
          <span className="footer-copy">Made with care for people who hate clunky CRMs.</span>
        </div>
      </div>
    </footer>
  );
}
