// Flazyn — photography helpers. Photos are self-hosted WebP from
// Unsplash (Unsplash License) in /public/images, lazy-loaded by default.
import { MessageCircle, CheckCheck } from 'lucide-react';

export function Photo({ src, alt, className = '', eager = false, style }) {
  return (
    <div className={`photo ${className}`} style={style}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : undefined} />
    </div>
  );
}

/* A photo with small pieces of product UI floating over it. */
export function PhotoStage({ src, alt, eager, children, ratio }) {
  return (
    <div className="photo-stage">
      <Photo src={src} alt={alt} eager={eager} style={ratio ? { aspectRatio: ratio } : undefined} />
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
