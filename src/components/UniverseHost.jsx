// UniverseHost — owns the 3D workspace canvas and decides where it shows.
//
// Intro: on a visitor's first page load per session, an inline script in
// index.html adds `html.intro`, which covers the page from the very first
// paint (no flash of content). The 3D workspace then plays full-screen —
// board swoops in, a lead travels New → Won, confetti — and hands over to
// the site. Skippable; capped at a few seconds; skipped for reduced motion,
// Save-Data and browsers without WebGL.
//
// After the intro the scene only shows beside heroes that opt in with
// data-scene="hero"; everywhere else it is hidden and its render loop
// paused.
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { scene } from '../lib/sceneStore.js';
import { LogoMark } from './Logo.jsx';

const CAPTIONS = [
  'A new lead arrives from your website.',
  'You reply on WhatsApp in a minute.',
  'The conversation turns into a real opportunity.',
  'Deal won. That’s Flazyn.',
];
const STAGE_COLORS = ['#3b9bff', '#7a5cff', '#b04bff', '#16c79a'];
const INTRO_MAX_MS = 9000;

function canRender() {
  if (navigator.connection?.saveData) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function currentMode() {
  const mid = window.innerHeight * 0.45;
  for (const el of document.querySelectorAll('main [data-scene]')) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) return el.dataset.scene;
  }
  return 'far';
}

function applyMode() {
  if (scene.mode === 'intro') return;
  const m = currentMode();
  scene.setMode(m);
  document.documentElement.dataset.sceneMode = m;
}

export default function UniverseHost() {
  const loc = useLocation();
  const [Scene, setScene] = useState(null);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(false);
  const [stage, setStage] = useState(0);
  const ended = useRef(false);

  const endIntro = () => {
    if (ended.current) return;
    ended.current = true;
    const d = document.documentElement;
    try { sessionStorage.setItem('fz-intro', '1'); } catch { /* private mode */ }
    scene.introDone = true;
    scene.mode = 'hero';
    applyMode();
    d.classList.add('intro-out');
    setTimeout(() => { d.classList.remove('intro', 'intro-out'); setIntro(false); }, 900);
  };

  // Boot: load the scene (immediately if the intro is playing, otherwise
  // once the browser is idle).
  useEffect(() => {
    const d = document.documentElement;
    const wantsIntro = d.classList.contains('intro');
    if (!canRender()) { if (wantsIntro) { d.classList.remove('intro'); } return; }

    let cancelled = false;
    const load = () => import('../three/Universe.jsx').then((m) => { if (!cancelled) setScene(() => m.default); });

    if (wantsIntro) {
      scene.mode = 'intro';
      d.dataset.sceneMode = 'intro';
      setIntro(true);
      load().catch(endIntro);
      const cap = setTimeout(endIntro, INTRO_MAX_MS);
      const off = scene.on((s) => {
        setStage(s.stage);
        if (s.introDone) endIntro();
      });
      return () => { cancelled = true; clearTimeout(cap); off(); };
    }

    applyMode();
    const id = 'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 1200 }) : setTimeout(load, 200);
    return () => { cancelled = true; if ('cancelIdleCallback' in window) cancelIdleCallback(id); else clearTimeout(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Follow the page: hero ↔ hidden as you scroll or navigate.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; applyMode(); }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => { const t = setTimeout(applyMode, 60); return () => clearTimeout(t); }, [loc.pathname]);

  return (
    <>
      <div className={`universe ${ready ? 'ready' : ''}`} aria-hidden="true">
        {Scene && <Scene onReady={() => setReady(true)} />}
      </div>
      {intro && (
        <div className="intro-ui" role="dialog" aria-label="Flazyn intro">
          <div className="intro-brand"><LogoMark className="brand-mark" /> Flazyn</div>
          <div className="intro-caption" aria-live="polite">
            <div className="intro-steps">
              {STAGE_COLORS.map((c, i) => <i key={c} style={{ background: i <= stage ? c : undefined }} />)}
            </div>
            <p key={stage}>{CAPTIONS[stage]}</p>
          </div>
          <button type="button" className="intro-skip" onClick={endIntro}>Skip intro</button>
        </div>
      )}
    </>
  );
}
