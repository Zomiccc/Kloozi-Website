// Flazyn — top navigation. Desktop: hover/click mega-menus.
// Mobile (<1080px): slide-in drawer. Menus close on route change,
// Escape and outside click.
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo.jsx';
import { PRODUCT_LINKS, SOLUTION_LINKS, COMPANY_LINKS } from '../lib/site.js';
import { iconFor, hueFor } from '../lib/icons.js';
import { EASE } from '../lib/motion.jsx';

const MENUS = [
  { key: 'product', label: 'Product', links: PRODUCT_LINKS },
  { key: 'solutions', label: 'Solutions', links: SOLUTION_LINKS },
  { key: 'company', label: 'Company', links: COMPANY_LINKS },
];

function MenuLink({ item, onClick }) {
  const Icon = iconFor(item.icon);
  return (
    <Link to={item.to} className="mega-link" onClick={onClick}>
      <span className={`chip3d sm ${hueFor(item.icon)}`}><Icon size={18} /></span>
      <span><span className="mega-title">{item.label}</span><span className="mega-desc">{item.desc}</span></span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const reduce = useReducedMotion();
  const navRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setOpen(null); setDrawer(false); }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setDrawer(false); } };
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  const panel = reduce ? {} : { initial: { opacity: 0, rotateX: -18, y: -4, transformPerspective: 900 }, animate: { opacity: 1, rotateX: 0, y: 0 }, exit: { opacity: 0, rotateX: -12, y: -4 }, transition: { duration: 0.28, ease: EASE }, style: { transformOrigin: '50% 0' } };

  return (
    <header className={`nav-wrap ${scrolled || drawer ? 'scrolled' : ''}`}>
      <nav className="nav shell" aria-label="Main" ref={navRef}>
        <Link to="/" aria-label="Flazyn home"><Logo /></Link>

        <div className="nav-links" onMouseLeave={() => setOpen(null)}>
          {MENUS.map((m) => (
            <div key={m.key} className="nav-item" onMouseEnter={() => setOpen(m.key)}>
              <button
                type="button"
                className="nav-trigger"
                aria-expanded={open === m.key}
                aria-controls={`menu-${m.key}`}
                onClick={() => setOpen((o) => (o === m.key ? null : m.key))}
              >
                {m.label} <ChevronDown size={15} />
              </button>
              <AnimatePresence>
                {open === m.key && (
                  <motion.div id={`menu-${m.key}`} className={`mega ${m.links.length <= 4 && m.key !== 'product' ? 'single' : ''}`} {...panel}>
                    {m.links.map((it) => <MenuLink key={it.to} item={it} onClick={() => setOpen(null)} />)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink>
        </div>

        <div className="nav-cta">
          <Link to="/contact" className="btn btn-ghost btn-sm">Contact</Link>
          <Link to="/early-access" className="btn btn-primary btn-sm">Get early access</Link>
        </div>

        <button type="button" className="nav-burger" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}>
          <Menu size={22} />
        </button>
      </nav>

      {/* Portal: the header's backdrop-filter would otherwise become the
          containing block for these fixed-position elements. */}
      {mounted && createPortal(<AnimatePresence>
        {drawer && (
          <>
            <motion.div className="drawer-scrim" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside
              className="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="drawer-head">
                <Link to="/" aria-label="Flazyn home"><Logo /></Link>
                <button type="button" className="nav-burger" style={{ display: 'grid' }} onClick={() => setDrawer(false)} aria-label="Close menu"><X size={22} /></button>
              </div>
              <div className="drawer-body">
                {MENUS.map((m) => (
                  <div key={m.key} className="drawer-group">
                    <p className="drawer-group-title">{m.label}</p>
                    {m.links.map((it) => {
                      const Icon = iconFor(it.icon);
                      return (
                        <Link key={it.to} to={it.to} className="drawer-link">
                          <span className={`chip3d sm ${hueFor(it.icon)}`}><Icon size={17} /></span>{it.label}
                        </Link>
                      );
                    })}
                  </div>
                ))}
                <div className="drawer-group" style={{ borderBottom: 0 }}>
                  <Link to="/blog" className="drawer-link">Blog <ArrowRight size={16} style={{ marginLeft: 'auto' }} /></Link>
                </div>
              </div>
              <div className="drawer-foot">
                <Link to="/early-access" className="btn btn-primary btn-block">Get early access <ArrowRight size={17} /></Link>
                <Link to="/contact" className="btn btn-secondary btn-block">Contact us</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>, document.body)}
    </header>
  );
}
