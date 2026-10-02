// Flazyn — photography helpers. Photos are self-hosted WebP from
// Unsplash (Unsplash License) in /public/images, lazy-loaded by default.
// With a content key `k`, the admin can replace any photo with another
// image or a video from the in-page editor.
import { MessageCircle, CheckCheck } from 'lucide-react';
import { useContent, useMedia } from '../lib/content.jsx';

export function Photo({ k, src, alt, className = '', eager = false, style }) {
  const override = useMedia(k);
  const { editing, editor } = useContent();
  const url = override?.url || src;
  const label = override?.alt ?? alt;
  return (
    <div className={`photo ${className}`} style={style} data-cms-media={editing && k ? '' : undefined}>
      {override?.type === 'video' ? (
        <video src={url} poster={override.poster || undefined} autoPlay muted loop playsInline preload="metadata" aria-label={label || undefined} />
      ) : (
        <img src={url} alt={label} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : undefined} />
      )}
      {editing && k && editor && (
        <button type="button" className="cms-replace" onClick={(e) => { e.preventDefault(); e.stopPropagation(); editor.openMedia(k, { url: src, alt }); }}>
          Replace image / video
        </button>
      )}
    </div>
  );
}

/* A photo with small pieces of product UI floating over it. */
export function PhotoStage({ k, src, alt, eager, children, ratio }) {
  return (
    <div className="photo-stage">
      <Photo k={k} src={src} alt={alt} eager={eager} style={ratio ? { aspectRatio: ratio } : undefined} />
      {children}
    </div>
  );
}

export function BubbleCard({ className = 'bl', who = 'WhatsApp', text, reply }) {
  return (
    <div className={`float-ui bubble-card ${className}`}>
      <div className="who"><MessageCircle size={13} color="#16c79a" /> {who}</div>
      <div>{text}</div>
      {reply && (
        <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 10, background: '#e6fbf4', fontSize: 13 }}>
          {reply}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}><CheckCheck size={13} color="#3b9bff" /></div>
        </div>
      )}
    </div>
  );
}

export function StatCard({ className = 'tr', icon: Icon, hue = '', title, sub }) {
  return (
    <div className={`float-ui stat-card ${className}`}>
      {Icon && <span className={`chip3d sm ${hue}`}><Icon size={16} /></span>}
      <span><strong>{title}</strong><small>{sub}</small></span>
    </div>
  );
}
