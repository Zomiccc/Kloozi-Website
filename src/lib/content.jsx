// ═══════════════════════════════════════════════════════════════════
// FLAZYN — EDITABLE CONTENT
// The site's copy lives in the components as defaults. The admin panel
// stores *overrides* (see api/_lib/content.js for the shape); this module
// merges them in and, for a logged-in admin in edit mode, makes every
// keyed piece of the page editable in place.
//
//   <T k="home.hero.title">Default text</T>    editable text
//   useText('key', 'default')                  overridden string
//   useMedia('key')                            image/video override
//   <Blocks k="home.top" />                    admin-added content blocks
//
// Editing UI is supplied by the lazy-loaded admin runtime through the
// `editor` object, so visitors never download any admin code.
// ═══════════════════════════════════════════════════════════════════
import { createContext, useContext } from 'react';
import { SITE } from './site.js';
import { POSTS } from './posts.js';

export const EMPTY_CONTENT = { text: {}, media: {}, blocks: {}, seo: {}, settings: {}, posts: null };

const Ctx = createContext({ content: EMPTY_CONTENT, editing: false, editor: null });
export const ContentContext = Ctx;
export const useContent = () => useContext(Ctx);

export function useText(k, fallback) {
  const { content } = useContext(Ctx);
  const v = k ? content.text?.[k] : undefined;
  return typeof v === 'string' && v.length ? v : fallback;
}

export function useMedia(k) {
  const { content } = useContext(Ctx);
  return k ? content.media?.[k] || null : null;
}

export function useSettings() {
  const { content } = useContext(Ctx);
  return {
    email: content.settings?.email || SITE.email,
    tagline: content.settings?.tagline || SITE.tagline,
  };
}

export function usePosts() {
  const { content } = useContext(Ctx);
  return Array.isArray(content.posts) ? content.posts : POSTS;
}

const readEditable = (el) => el.innerText.replace(/ /g, ' ').trim();

/* Editable text. `children` must be a plain string (the default copy). */
export function T({ k, children, as: Tag = 'span', className, ...rest }) {
  const { content, editing, editor } = useContext(Ctx);
  const value = useText(k, children);
  if (!k || !editing || !editor) return Tag === 'span' && !className && !Object.keys(rest).length ? value : <Tag className={className} {...rest}>{value}</Tag>;
  return (
    <Tag
      {...rest}
      className={`${className || ''} cms-text`}
      data-cms-k={k}
      data-cms-changed={content.text?.[k] !== undefined ? '' : undefined}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.currentTarget.blur(); }
        if (e.key === 'Escape') { e.currentTarget.innerText = value; e.currentTarget.blur(); }
      }}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
      }}
      // Typing is recorded as it happens (without re-rendering, so the caret
      // never jumps) and committed on blur, Save or Publish.
      onInput={(e) => editor.stage(k, readEditable(e.currentTarget), children)}
      onBlur={(e) => editor.setText(k, readEditable(e.currentTarget), children)}
    >
      {value}
    </Tag>
  );
}

/* Content blocks the admin adds to a page slot. */
export function Blocks({ k }) {
  const { content, editing, editor } = useContext(Ctx);
  const list = content.blocks?.[k] || [];
  if (editing && editor?.BlockSlot) return <editor.BlockSlot k={k} blocks={list} />;
  if (!list.length) return null;
  return <BlockList blocks={list} />;
}

export function BlockList({ blocks, renderControls }) {
  return (
    <section className="cms-blocks">
      <div className="shell">
        {blocks.map((b, i) => (
          <div key={b.id} className="cms-block-wrap">
            {renderControls?.(b, i)}
            <Block block={b} />
          </div>
        ))}
      </div>
    </section>
  );
}

function MediaEl({ url, type, alt, poster, autoplay }) {
  if (!url) return <div className="cms-media-empty">No media selected</div>;
  if (type === 'video') {
    return autoplay
      ? <video src={url} poster={poster || undefined} autoPlay muted loop playsInline preload="metadata" aria-label={alt || undefined} />
      : <video src={url} poster={poster || undefined} controls playsInline preload="metadata" aria-label={alt || undefined} />;
  }
  return <img src={url} alt={alt || ''} loading="lazy" decoding="async" />;
}

const Paragraphs = ({ text }) => String(text || '').split(/\n{2,}/).filter(Boolean).map((p, i) => <p key={i} className="body">{p}</p>);

export function Block({ block: b }) {
  switch (b.type) {
    case 'text':
      return (
        <div className="cms-block cms-text-block">
          {b.heading && <h2 className="h2">{b.heading}</h2>}
          <Paragraphs text={b.body} />
        </div>
      );
    case 'image':
    case 'video':
      return (
        <figure className={`cms-block cms-media-block ${b.wide ? 'wide' : ''}`}>
          <div className="cms-media-frame">
            <MediaEl url={b.url} type={b.type === 'video' ? 'video' : 'image'} alt={b.alt} poster={b.poster} autoplay={b.autoplay} />
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      );
    case 'split':
      return (
        <div className={`cms-block split ${b.flip ? 'flip' : ''}`}>
          <div className="cms-media-frame"><MediaEl url={b.url} type={b.mediaType} alt={b.alt} poster={b.poster} autoplay={b.autoplay} /></div>
          <div className="split-copy">
            {b.heading && <h2 className="h2">{b.heading}</h2>}
            <Paragraphs text={b.body} />
            {b.buttonLabel && b.buttonHref && <div className="actions" style={{ marginTop: 24 }}><a className="btn btn-primary" href={b.buttonHref}>{b.buttonLabel}</a></div>}
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className="cms-block cms-cta-block">
          {b.heading && <h2 className="h2">{b.heading}</h2>}
          <Paragraphs text={b.body} />
          {b.buttonLabel && b.buttonHref && <div className="actions" style={{ justifyContent: 'center', marginTop: 24 }}><a className="btn btn-primary btn-lg" href={b.buttonHref}>{b.buttonLabel}</a></div>}
        </div>
      );
    default:
      return null;
  }
}

/* Embedded at build time by scripts/prerender.mjs. */
export function readEmbeddedContent() {
  try {
    const el = typeof document !== 'undefined' && document.getElementById('__cms');
    return el ? { ...EMPTY_CONTENT, ...JSON.parse(el.textContent) } : null;
  } catch {
    return null;
  }
}
