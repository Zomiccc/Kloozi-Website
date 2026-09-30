// Flazyn logo mark — a glossy, extruded tile carrying a rounded "F" and
// a spark. Drawn in SVG so it is crisp, tiny and renders server-side.
// The same geometry is extruded in real 3D by three/Scenes.jsx.
import { useId } from 'react';

export function LogoMark({ className = '', title, style }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a5cff" />
          <stop offset="0.5" stopColor="#b04bff" />
          <stop offset="1" stopColor="#ff6b4a" />
        </linearGradient>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* extruded depth */}
      <rect x="4" y="8" width="56" height="53" rx="17" fill="#3b20c4" />
      {/* face */}
      <rect x="4" y="3" width="56" height="53" rx="17" fill={`url(#${id}f)`} />
      <path d="M21 3h22c9.4 0 17 7.6 17 17v2C49 17 34 16 4 24v-4C4 10.6 11.6 3 21 3z" fill={`url(#${id}h)`} />
      {/* F glyph */}
      <g fill="#fff">
        <rect x="19" y="15" width="8.5" height="30" rx="4.25" />
        <rect x="19" y="15" width="26" height="8.5" rx="4.25" />
        <rect x="19" y="28.5" width="17" height="8" rx="4" />
      </g>
      {/* spark */}
      <path d="M44.5 29.5l1.6 3.9 3.9 1.6-3.9 1.6-1.6 3.9-1.6-3.9-3.9-1.6 3.9-1.6z" fill="#fff" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <LogoMark className="brand-mark" />
      <span>Flazyn</span>
    </span>
  );
}
