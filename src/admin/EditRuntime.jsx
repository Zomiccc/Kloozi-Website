// In-page editor, loaded only for a logged-in admin. Adds an "Edit this
// page" button; in edit mode every keyed text becomes editable in place,
// photos get a "Replace" button, block slots appear on each page, and a
// toolbar saves the draft or publishes it.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pencil, Save, Rocket, X, Search, LayoutDashboard, Plus, ArrowUp, ArrowDown, Trash2, Settings2, Loader2 } from 'lucide-react';
import { api } from './api.js';
import { EMPTY_CONTENT, BlockList } from '../lib/content.jsx';
import { metaFor } from '../lib/seo.js';
import { Modal, Field, MediaSlotModal, BlockModal, BLOCK_TYPES, newBlock } from './ui.jsx';
import './admin.css';

export default function EditRuntime({ content, setContent, editing, setEditing, setEditor }) {
  const loc = useLocation();
  const [session, setSession] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState('');
  const [mediaModal, setMediaModal] = useState(null);
  const [blockModal, setBlockModal] = useState(null);
  const [seoOpen, setSeoOpen] = useState(false);
  const contentRef = useRef(content);
  const publishedRef = useRef(content);
  const pending = useRef({}); // text typed but not yet committed (see T in lib/content.jsx)
  contentRef.current = content;

  const applyText = (c, k, value, original) => {
    const text = { ...c.text };
    if (!value || value === original) delete text[k]; else text[k] = value;
    return { ...c, text };
  };
  /* Commit any staged typing; returns the up-to-date content. */
  const flush = () => {
    const staged = Object.entries(pending.current);
    if (!staged.length) return contentRef.current;
    pending.current = {};
    const next = staged.reduce((c, [k, { value, original }]) => applyText(c, k, value, original), contentRef.current);
    contentRef.current = next;
    setContent(next);
    return next;
  };

  const update = useCallback((fn) => { setContent((c) => fn(c)); setDirty(true); setStatus(''); }, [setContent]);

  // Confirm the session; a stale flag cookie is cleared quietly.
  useEffect(() => {
    api.session().then((s) => {
      if (!s.authenticated) { document.cookie = 'fz_admin=; Max-Age=0; Path=/; SameSite=Strict'; return; }
      setSession(s);
    }).catch(() => {});
  }, []);

  const enter = useCallback(async () => {
    setBusy('Loading draft…');
    try {
      const { draft } = await api.getContent();
      publishedRef.current = contentRef.current;
      setContent({ ...EMPTY_CONTENT, ...draft });
      setEditing(true);
      setDirty(false);
    } catch (e) {
      setStatus(e.message);
    } finally {
      setBusy('');
    }
  }, [setContent, setEditing]);

  // "Edit on page" from the dashboard opens straight into edit mode.
  useEffect(() => {
    if (session && sessionStorage.getItem('fz-edit') === '1') { sessionStorage.removeItem('fz-edit'); enter(); }
  }, [session, enter]);

  const exit = () => {
    if (dirty && !window.confirm('You have unsaved changes. Leave edit mode and discard them?')) return;
    pending.current = {};
    setEditing(false);
    setEditor(null);
    setContent(publishedRef.current);
    setDirty(false);
  };

  const save = async () => {
    setBusy('Saving…');
    try {
      await api.saveDraft(flush());
      setDirty(false);
      setStatus('Draft saved.');
      return true;
    } catch (e) {
      setStatus(e.message);
      return false;
    } finally {
      setBusy('');
    }
  };

  const publish = async () => {
    if (!window.confirm('Publish all saved changes to the live site?')) return;
    if ((dirty || Object.keys(pending.current).length) && !(await save())) return;
    setBusy('Publishing…');
    try {
      const r = await api.publish();
      setStatus(r.rebuild === 'triggered'
        ? 'Published! The live site updates in about 1–2 minutes.'
        : 'Published. The rebuild hook isn’t set up yet, so redeploy in Vercel to see it live.');
    } catch (e) {
      setStatus(e.message);
    } finally {
      setBusy('');
    }
  };

  useEffect(() => {
    document.body.classList.toggle('cms-editing', editing);
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => { window.removeEventListener('beforeunload', warn); document.body.classList.remove('cms-editing'); };
  }, [editing, dirty]);

  /* Block slot editor, rendered in place of <Blocks k=…> while editing. */
  const BlockSlot = useMemo(() => function BlockSlot({ k, blocks }) {
    const [menu, setMenu] = useState(false);
    const setList = (fn) => update((c) => ({ ...c, blocks: { ...c.blocks, [k]: fn(c.blocks?.[k] || []) } }));
    const move = (i, d) => setList((l) => { const n = [...l]; [n[i], n[i + d]] = [n[i + d], n[i]]; return n; });
    return (
      <div className="cms-slot">
        {blocks.length > 0 && (
          <BlockList
            blocks={blocks}
            renderControls={(b, i) => (
              <div className="cms-block-controls">
                <button type="button" onClick={() => setBlockModal({ k, block: b, index: i })}><Pencil size={14} /> Edit</button>
                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14} /></button>
                <button type="button" disabled={i === blocks.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14} /></button>
                <button type="button" className="danger" onClick={() => { if (window.confirm('Delete this block?')) setList((l) => l.filter((_, j) => j !== i)); }} aria-label="Delete"><Trash2 size={14} /></button>
              </div>
            )}
          />
        )}
        <div className="shell">
          <div className="cms-slot-add">
            {menu ? (
              <div className="cms-slot-menu">
                {BLOCK_TYPES.map(([type, label]) => (
                  <button key={type} type="button" onClick={() => { setMenu(false); setBlockModal({ k, block: newBlock(type), index: -1 }); }}>{label}</button>
                ))}
                <button type="button" className="ghost" onClick={() => setMenu(false)}>Cancel</button>
              </div>
            ) : (
              <button type="button" className="cms-add-btn" onClick={() => setMenu(true)}><Plus size={15} /> Add block here <span>{k}</span></button>
            )}
          </div>
        </div>
      </div>
    );
  }, [update]);

  const editor = useMemo(() => ({
    stage(k, value, original) {
      pending.current[k] = { value, original };
      setDirty(true);
      setStatus('');
    },
    setText(k, value, original) {
      delete pending.current[k];
      update((c) => applyText(c, k, value, original));
    },
    openMedia(k, original) { setMediaModal({ k, original }); },
    BlockSlot,
  }), [update, BlockSlot]);

  useEffect(() => { setEditor(editing ? editor : null); }, [editing, editor, setEditor]);

  if (!session || loc.pathname.startsWith('/admin')) return null;

  if (!editing) {
    return (
      <div className="cms-fab">
        <button type="button" onClick={enter} disabled={!!busy}>{busy ? <Loader2 size={15} className="spin" /> : <Pencil size={15} />} Edit this page</button>
        <Link to="/admin"><LayoutDashboard size={15} /> Dashboard</Link>
      </div>
    );
  }

  const meta = metaFor(loc.pathname, { ...content, seo: {} });
  const seo = content.seo?.[meta.path] || {};

  return (
    <>
      <div className="cms-toolbar" role="toolbar" aria-label="Page editor">
        <span className="cms-toolbar-title"><Pencil size={14} /> Editing <strong>{loc.pathname}</strong></span>
        <span className="cms-toolbar-status">{busy || status || (dirty ? 'Unsaved changes' : 'All changes saved')}</span>
        <span className="cms-toolbar-hint">Click any text to edit · Replace images on hover</span>
        <button type="button" onClick={() => setSeoOpen(true)}><Search size={14} /> SEO</button>
        <button type="button" onClick={save} disabled={!!busy || !dirty}><Save size={14} /> Save draft</button>
        <button type="button" className="primary" onClick={publish} disabled={!!busy}><Rocket size={14} /> Publish</button>
        <Link to="/admin" className="cms-toolbar-link"><Settings2 size={14} /> Dashboard</Link>
        <button type="button" onClick={exit} aria-label="Exit edit mode"><X size={14} /> Exit</button>
      </div>

      {mediaModal && (
        <MediaSlotModal
          storage={session.storage}
          slot={mediaModal.k}
          original={mediaModal.original}
          current={content.media?.[mediaModal.k]}
          onClose={() => setMediaModal(null)}
          onReset={() => { update((c) => { const media = { ...c.media }; delete media[mediaModal.k]; return { ...c, media }; }); setMediaModal(null); }}
          onSave={(v) => {
            if (!v.url) return;
            update((c) => ({ ...c, media: { ...c.media, [mediaModal.k]: { type: v.type, url: v.url, alt: v.alt, poster: v.poster || '' } } }));
            setMediaModal(null);
          }}
        />
      )}

      {blockModal && (
        <BlockModal
          storage={session.storage}
          block={blockModal.block}
          onClose={() => setBlockModal(null)}
          onSave={(b) => {
            update((c) => {
              const list = [...(c.blocks?.[blockModal.k] || [])];
              if (blockModal.index >= 0) list[blockModal.index] = b; else list.push(b);
              return { ...c, blocks: { ...c.blocks, [blockModal.k]: list } };
            });
            setBlockModal(null);
          }}
        />
      )}

      {seoOpen && <SeoModal meta={meta} value={seo} onClose={() => setSeoOpen(false)} onSave={(v) => {
        update((c) => {
          const next = { ...c.seo };
          if (!v.title && !v.description) delete next[meta.path]; else next[meta.path] = v;
          return { ...c, seo: next };
        });
        setSeoOpen(false);
      }} />}
    </>
  );
}

function SeoModal({ meta, value, onSave, onClose }) {
  const [v, setV] = useState({ title: value.title || '', description: value.description || '' });
  return (
    <Modal
      title={`Search & sharing — ${meta.path}`}
      onClose={onClose}
      footer={<><span style={{ flex: 1 }} /><button type="button" className="adm-btn" onClick={onClose}>Cancel</button><button type="button" className="adm-btn primary" onClick={() => onSave(v)}>Save</button></>}
    >
      <Field label="Page title" hint={`${v.title.length}/60 recommended · Leave empty to use: “${meta.title}”`}>
        <input className="adm-input" value={v.title} placeholder={meta.title} onChange={(e) => setV({ ...v, title: e.target.value })} maxLength={160} />
      </Field>
      <Field label="Description" hint={`${v.description.length}/155 recommended · Shown under the title in Google results.`}>
        <textarea className="adm-input" rows={4} value={v.description} placeholder={meta.description} onChange={(e) => setV({ ...v, description: e.target.value })} maxLength={320} />
      </Field>
      <div className="adm-serp">
        <span className="adm-serp-url">flazyn.com{meta.path === '/' ? '' : meta.path}</span>
        <span className="adm-serp-title">{v.title || meta.title}</span>
        <span className="adm-serp-desc">{v.description || meta.description}</span>
      </div>
    </Modal>
  );
}
