// TiltLayer — one delegated pointer listener that gives every 3D surface
// on the site (cards, photo stages, panels) a live tilt toward the cursor.
// Elements opt in by matching TILT_SELECTOR; CSS reads --rx / --ry.
// No per-component state, no re-renders, rAF-throttled, mouse/pen only.
import { useEffect } from 'react';

export const TILT_SELECTOR = [
  '.feature-card', '.audience-card', '.post-card', '.solution-card', '.page-art-card',
  '.photo-stage', '.trust-item', '.step', '.demo-window', '.hud-card', '.cta',
].join(',');

export default function TiltLayer() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let active = null;
    let frame = 0;
    let last = null;

    const reset = (el) => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.classList.remove('is-tilting'); };

    const apply = () => {
      frame = 0;
      const e = last;
      const el = e.target instanceof Element ? e.target.closest(TILT_SELECTOR) : null;
      if (active && active !== el) reset(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Big surfaces tilt less than small cards.
      const max = r.width > 700 ? 3 : r.width > 420 ? 6 : 10;
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(1)}%`);
      el.classList.add('is-tilting');
    };

    const onMove = (e) => {
      // No tilting while the admin is editing text on the page.
      if (e.pointerType === 'touch' || document.body.classList.contains('cms-editing')) return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => { if (active) reset(active); active = null; };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
