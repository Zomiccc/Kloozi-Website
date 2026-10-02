// Shared admin UI: modal, media picker (upload or choose from the library)
// and the content-block form.
import { useEffect, useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon, Film, Loader2, Check, Trash2 } from 'lucide-react';
import { api, uploadFile, ACCEPT, isVideoUrl, formatSize } from './api.js';

export function Modal({ title, onClose, children, footer, wide }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="adm-modal-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`adm-modal ${wide ? 'wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="adm-modal-head">
          <h2>{title}</h2>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {footer && <div className="adm-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </label>
  );
}

export function Preview({ url, type, alt }) {
  if (!url) return <div className="adm-preview empty"><ImageIcon size={28} /><span>Nothing selected</span></div>;
  const video = type === 'video' || isVideoUrl(url);
  return (
    <div className="adm-preview">
      {video ? <video src={url} controls muted playsInline /> : <img src={url} alt={alt || ''} />}
    </div>
  );
}

/* Upload a new file or pick one already in the library. */
export function MediaChooser({ storage, value, onChange, allowVideo = true }) {
  const [items, setItems] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const input = useRef(null);

  useEffect(() => { api.media().then((r) => setItems(r.items)).catch(() => setItems([])); }, []);

  const onFiles = async (files) => {
    const file = files?.[0];
    if (!file) return;
    setError(''); setBusy(true); setProgress(0);
    try {
      const res = await uploadFile(file, storage, setProgress);
      if (res.type === 'video' && !allowVideo) throw new Error('Please choose an image here.');
      onChange({ ...value, url: res.url, type: res.type });
      setItems((list) => [{ url: res.url, name: file.name, size: file.size, date: new Date().toISOString() }, ...(list || [])]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const library = (items || []).filter((m) => allowVideo || !isVideoUrl(m.url));
  return (
    <div className="adm-chooser">
      <div
        className="adm-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
        onClick={() => input.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') input.current?.click(); }}
      >
        {busy ? <><Loader2 className="spin" size={20} /> Uploading… {progress ? `${Math.round(progress)}%` : ''}</> : <><Upload size={20} /> <span><strong>Upload {allowVideo ? 'an image or video' : 'an image'}</strong> — click or drop a file here</span></>}
        <input ref={input} type="file" accept={allowVideo ? ACCEPT : ACCEPT.split(',').filter((t) => t.startsWith('image')).join(',')} hidden onChange={(e) => onFiles(e.target.files)} />
      </div>
      <p className="adm-hint">Images are resized and converted to WebP automatically. {allowVideo && 'Videos: MP4 or WebM, up to 150 MB — short clips work best.'}</p>
      {error && <div className="adm-error">{error}</div>}
      <div className="adm-label" style={{ marginTop: 14 }}>Or choose from your library</div>
      {items === null ? <div className="adm-hint">Loading…</div> : library.length === 0 ? <div className="adm-hint">No uploads yet.</div> : (
        <div className="adm-lib">
          {library.map((m) => (
            <button type="button" key={m.url} className={`adm-lib-item ${value?.url === m.url ? 'on' : ''}`} onClick={() => onChange({ ...value, url: m.url, type: isVideoUrl(m.url) ? 'video' : 'image' })} title={m.name}>
              {isVideoUrl(m.url) ? <><video src={m.url} muted preload="metadata" /><Film size={14} className="adm-lib-badge" /></> : <img src={m.url} alt="" loading="lazy" />}
              {value?.url === m.url && <Check size={16} className="adm-lib-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Replace a page image/video (a media slot). */
export function MediaSlotModal({ storage, slot, current, original, onSave, onReset, onClose }) {
  const [value, setValue] = useState({ url: current?.url || original.url, alt: current?.alt ?? original.alt ?? '', type: current?.type || (isVideoUrl(original.url) ? 'video' : 'image'), poster: current?.poster || '' });
  return (
    <Modal
      title="Replace image or video"
      onClose={onClose}
      wide
      footer={<>
        {current && <button type="button" className="adm-btn ghost" onClick={onReset}><Trash2 size={15} /> Restore original</button>}
        <span style={{ flex: 1 }} />
        <button type="button" className="adm-btn" onClick={onClose}>Cancel</button>
        <button type="button" className="adm-btn primary" onClick={() => onSave(value)}>Use this</button>
      </>}
    >
      <div className="adm-two">
        <div>
          <Preview url={value.url} type={value.type} alt={value.alt} />
          <Field label="Description (alt text)" hint="Describes the image for screen readers and Google.">
            <input className="adm-input" value={value.alt} onChange={(e) => setValue({ ...value, alt: e.target.value })} maxLength={300} />
          </Field>
          <p className="adm-hint">Slot: <code>{slot}</code>{value.type === 'video' && ' · Videos here play muted and loop, like a moving photo.'}</p>
        </div>
        <MediaChooser storage={storage} value={value} onChange={setValue} />
      </div>
    </Modal>
  );
}

const BLOCK_LABELS = { text: 'Text', image: 'Image', video: 'Video', split: 'Image / video + text', cta: 'Call to action' };
export const BLOCK_TYPES = Object.entries(BLOCK_LABELS);

export function newBlock(type) {
  return { id: Math.random().toString(36).slice(2, 10), type, heading: '', body: '', url: '', mediaType: type === 'video' ? 'video' : 'image', alt: '', caption: '', poster: '', autoplay: type === 'video', flip: false, wide: false, buttonLabel: '', buttonHref: '' };
}

/* Edit one content block. */
export function BlockModal({ storage, block, onSave, onClose }) {
  const [b, setB] = useState(block);
  const set = (patch) => setB((x) => ({ ...x, ...patch }));
  const hasMedia = ['image', 'video', 'split'].includes(b.type);
  const hasText = ['text', 'split', 'cta'].includes(b.type);
  const hasButton = ['split', 'cta'].includes(b.type);
  return (
    <Modal
      title={`${BLOCK_LABELS[b.type]} block`}
      onClose={onClose}
      wide={hasMedia}
      footer={<><span style={{ flex: 1 }} /><button type="button" className="adm-btn" onClick={onClose}>Cancel</button><button type="button" className="adm-btn primary" onClick={() => onSave(b)}>Save block</button></>}
    >
      <div className={hasMedia ? 'adm-two' : ''}>
        <div>
          {hasText && (
            <>
              <Field label="Heading"><input className="adm-input" value={b.heading} onChange={(e) => set({ heading: e.target.value })} maxLength={300} /></Field>
              <Field label="Text" hint="Leave a blank line between paragraphs."><textarea className="adm-input" rows={6} value={b.body} onChange={(e) => set({ body: e.target.value })} maxLength={5000} /></Field>
            </>
          )}
          {hasButton && (
            <div className="adm-row">
              <Field label="Button label"><input className="adm-input" value={b.buttonLabel} onChange={(e) => set({ buttonLabel: e.target.value })} maxLength={60} /></Field>
              <Field label="Button link" hint="e.g. /early-access or https://…"><input className="adm-input" value={b.buttonHref} onChange={(e) => set({ buttonHref: e.target.value })} maxLength={500} /></Field>
            </div>
          )}
          {hasMedia && (
            <>
              <Preview url={b.url} type={b.type === 'split' ? b.mediaType : b.type} alt={b.alt} />
              <Field label="Description (alt text)"><input className="adm-input" value={b.alt} onChange={(e) => set({ alt: e.target.value })} maxLength={300} /></Field>
              {b.type !== 'split' && <Field label="Caption (optional)"><input className="adm-input" value={b.caption} onChange={(e) => set({ caption: e.target.value })} maxLength={300} /></Field>}
              <div className="adm-checks">
                {(b.type === 'video' || (b.type === 'split' && b.mediaType === 'video')) && (
                  <label><input type="checkbox" checked={b.autoplay} onChange={(e) => set({ autoplay: e.target.checked })} /> Play automatically (muted, looping)</label>
                )}
                {b.type === 'split' && <label><input type="checkbox" checked={b.flip} onChange={(e) => set({ flip: e.target.checked })} /> Put the media on the right</label>}
                {b.type !== 'split' && <label><input type="checkbox" checked={b.wide} onChange={(e) => set({ wide: e.target.checked })} /> Full width</label>}
              </div>
            </>
          )}
        </div>
        {hasMedia && (
          <MediaChooser
            storage={storage}
            allowVideo={b.type !== 'image'}
            value={{ url: b.url, type: b.type === 'split' ? b.mediaType : b.type }}
            onChange={(v) => set({ url: v.url, ...(b.type === 'split' ? { mediaType: v.type } : {}), ...(b.type === 'image' || b.type === 'video' ? { type: v.type } : {}) })}
          />
        )}
      </div>
    </Modal>
  );
}

export { formatSize };
