// Stage3D — progressive 3D. Server HTML and first paint show a static
// SVG fallback (zero JS cost). The three.js chunk is fetched only when
// the stage nears the viewport and the browser is idle, and rendering
// pauses whenever the stage scrolls out of view. Skipped entirely for
// reduced-motion, Save-Data, or browsers without WebGL.
import { useEffect, useRef, useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { LogoMark } from './Logo.jsx';

let scenesPromise;
const loadScenes = () => (scenesPromise ||= import('../three/Scenes.jsx'));

function canRender3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (navigator.connection?.saveData) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Stage3D({ scene = 'hero', className = '', hint, fallback }) {
  const host = useRef(null);
  const [Scene, setScene] = useState(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    const el = host.current;
    let cancelled = false;
    let requested = false;
    const load = () => loadScenes().then((mod) => {
      if (!cancelled) setScene(() => (scene === 'mascot' ? mod.MascotScene : mod.HeroScene));
    });
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !requested) {
        requested = true;
        // Let the page finish its critical work before pulling in three.js.
        if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 1500 });
        else setTimeout(load, 300);
      }
    }, { rootMargin: '200px 0px' });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); };
  }, [scene]);

  return (
    <div ref={host} className={`stage3d ${className}`}>
      <div className={`stage3d-fallback ${ready ? 'hidden' : ''}`} aria-hidden="true">
        {fallback || <LogoMark className="fallback-logo" />}
      </div>
      {Scene && <Scene active={inView} onReady={() => setReady(true)} />}
      {hint && ready && (
        <span className="stage3d-hint"><MousePointerClick size={13} /> {hint}</span>
      )}
    </div>
  );
}
