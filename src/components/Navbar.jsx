// Zomic marketing — top navigation with HubSpot-style mega-menus.
// Part 1 + Part 3.5: dropdown panels slide down + fade in (180ms), with
// menu items staggering in 40ms each. Mobile collapses into a drawer
// with accordions (Part 5).

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ChevronDown, Menu, X, ArrowRight, Sparkles,
} from 'lucide-react';
import {
  PRODUCT_GROUPS, PRODUCT_FEATURED, SOLUTIONS, RESOURCES, COMPANY,
} from '../lib/content.js';
import { iconFor } from '../lib/icons.js';
import { EASE_SOFT } from '../lib/motion.jsx';
import Mascot from './Mascot.jsx';

/* ─── Mega-menu panel (desktop) ─── */
function MegaPanel({ kind, onClose }) {
  const reduce = useReducedMotion();
  const container = reduce
    ? {}
    : { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.18, ease: EASE_SOFT } };
  const item = reduce
    ? {}
    : { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } };

  if (kind === 'product') {
    return (
      <motion.div {...container} className="mega-panel">
        <div className="mega-grid">
          {PRODUCT_GROUPS.map((g) => (
            <div key={g.title} className="mega-col">
              <p className="mega-col-title">{g.title}</p>
              <div className="mega-col-items">
                {g.items.map((it, i) => {
                  const Icon = iconFor(it.icon);
                  return (
                    <motion.div key={it.to} {...item} transition={{ delay: 0.04 * i, duration: 0.18, ease: EASE_SOFT }}>
                      <Link to={it.to} className="mega-link" onClick={onClose}>
                        <span className="mega-ico"><Icon size={18} /></span>
                        <span>
                          <span className="mega-link-title">{it.label}</span>
                          <span className="mega-link-desc">{it.desc}</span>
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
          {/* Column 4 — featured callout */}
          <motion.div {...item} transition={{ delay: 0.12, duration: 0.18, ease: EASE_SOFT }} className="mega-col mega-featured">
            <span className="badge badge-accent">{PRODUCT_FEATURED.badge}</span>
            <p className="mega-featured-title">{PRODUCT_FEATURED.title}</p>
            <p className="mega-featured-desc">{PRODUCT_FEATURED.desc}</p>
            <Link to={PRODUCT_FEATURED.to} className="mega-featured-cta" onClick={onClose}>
              {PRODUCT_FEATURED.cta} <ArrowRight size={15} />
            </Link>
            {/* seed=7 desyncs this mascot's idle loops from the hero one */}
            <div className="mega-featured-art"><Mascot size={92} mood="peek" seed={7} /></div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Solutions / Resources / Company share a single-column list layout.
  const list = kind === 'solutions' ? SOLUTIONS : kind === 'resources' ? RESOURCES : COMPANY;
  return (
    <motion.div {...container} className="mega-panel mega-panel-sm">
      <div className="mega-sm-grid">
        {list.map((it, i) => {
          const Icon = iconFor(it.icon);
          return (
            <motion.div key={it.to + it.label} {...item} transition={{ delay: 0.04 * i, duration: 0.18, ease: EASE_SOFT }}>
              <Link to={it.to} className="mega-link" onClick={onClose}>
                <span className="mega-ico"><Icon size={18} /></span>
                <span>
                  <span className="mega-link-title">{it.label}</span>
                  <span className="mega-link-desc">{it.desc}</span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Mobile drawer accordion section ─── */
function DrawerSection({ title, links, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="drawer-section">
      <button className="drawer-section-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <ChevronDown size={18} className={open ? 'drawer-chev-open' : ''} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_SOFT }}
            className="drawer-section-body"
          >
            {links.map((l) => (
              <Link key={l.to + l.label} to={l.to} className="drawer-link">{l.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [openMega, setOpenMega] = useState(null); // 'product' | 'solutions' | ...
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const loc = useLocation();

  // Close mega-menu + drawer on route change.
  useEffect(() => { setOpenMega(null); setDrawer(false); }, [loc.pathname]);
  // Lock body scroll when mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);
  // Shadow on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'product', label: 'Product', mega: true },
    { key: 'solutions', label: 'Solutions', mega: true },
    { key: 'pricing', label: 'Pricing', to: '/pricing', mega: false },
    { key: 'resources', label: 'Resources', mega: true },
    { key: 'company', label: 'Company', mega: true },
  ];

  return (
    <header className={`nav-wrap ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="nav shell" aria-label="Primary">
        <Link to="/" className="nav-brand" onClick={() => setOpenMega(null)}>
          <span className="nav-brand-mark"><Mascot size={32} mood="idle" seed={5} /></span>
          <span className="nav-brand-name">Zomic</span>
        </Link>

        {/* desktop links */}
        <div className="nav-links" onMouseLeave={() => setOpenMega(null)}>
          {navItems.map((n) =>
            n.mega ? (
              <div
                key={n.key}
                className="nav-item"
                onMouseEnter={() => setOpenMega(n.key)}
              >
                <button
                  className={`nav-trigger ${openMega === n.key ? 'nav-trigger-open' : ''}`}
                  aria-expanded={openMega === n.key}
                  onClick={() => setOpenMega((o) => (o === n.key ? null : n.key))}
                >
                  {n.label}
                  <ChevronDown size={15} className={`nav-chev ${openMega === n.key ? 'nav-chev-open' : ''}`} />
                </button>
              </div>
            ) : (
              <NavLink key={n.key} to={n.to} className="nav-underline">
                {n.label}
              </NavLink>
            )
          )}
        </div>

        {/* desktop CTAs */}
        <div className="nav-cta">
          <Link to="/contact" className="btn btn-ghost btn-sm">Book a demo</Link>
          <Link to="/signup" className="btn btn-accent btn-sm">Start free trial</Link>
        </div>

        {/* mobile toggle */}
        <button className="nav-burger" onClick={() => setDrawer(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>

      {/* desktop mega-menu overlay */}
      <AnimatePresence>
        {openMega && (
          <div className="mega-viewport" onMouseEnter={() => {}} onMouseLeave={() => setOpenMega(null)}>
            <MegaPanel kind={openMega} onClose={() => setOpenMega(null)} />
          </div>
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="drawer-scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: EASE_SOFT }}
            >
              <div className="drawer-head">
                <Link to="/" className="nav-brand" onClick={() => setDrawer(false)}>
                  <span className="nav-brand-mark"><Mascot size={30} mood="idle" seed={6} /></span>
                  <span className="nav-brand-name">Zomic</span>
                </Link>
                <button className="drawer-close" onClick={() => setDrawer(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <div className="drawer-body">
                <DrawerSection title="Product" defaultOpen links={[
                  ...PRODUCT_GROUPS.flatMap((g) => g.items.map((i) => ({ to: i.to, label: i.label }))),
                ]} />
                <DrawerSection title="Solutions" links={SOLUTIONS.map((s) => ({ to: s.to, label: s.label }))} />
                <Link to="/pricing" className="drawer-link drawer-link-top">Pricing</Link>
                <DrawerSection title="Resources" links={RESOURCES.map((r) => ({ to: r.to, label: r.label }))} />
                <DrawerSection title="Company" links={COMPANY.map((c) => ({ to: c.to, label: c.label }))} />
              </div>

              <div className="drawer-foot">
                <Link to="/signup" className="btn btn-accent w-full"><Sparkles size={16} /> Start free trial</Link>
                <Link to="/contact" className="btn btn-secondary w-full">Book a demo</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
