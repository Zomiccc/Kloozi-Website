// /admin — the Flazyn admin dashboard. Login, then manage pages (edit in
// place + SEO), blog posts, the media library, site settings and the
// publish history. Loaded only when /admin is visited.
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard, FileText, Newspaper, Image as ImageIcon, Settings, History, LogOut, Save, Rocket, ExternalLink,
  Pencil, Plus, Trash2, Copy, Check, Loader2, AlertTriangle, CheckCircle2, Lock, Film, Upload,
} from 'lucide-react';
import { api, uploadFile, ACCEPT, isVideoUrl, formatSize } from './api.js';
import { Field, Modal, MediaChooser, Preview } from './ui.jsx';
import { EMPTY_CONTENT } from '../lib/content.jsx';
import { PAGE_ROUTES, applySeo } from '../lib/seo.js';
import { POSTS, postText } from '../lib/posts.js';
import { SITE, addressLine } from '../lib/site.js';
import { LogoMark } from '../components/Logo.jsx';
import './admin.css';

const TABS = [
  ['overview', 'Overview', LayoutDashboard],
  ['pages', 'Pages & SEO', FileText],
  ['blog', 'Blog posts', Newspaper],
  ['media', 'Media library', ImageIcon],
  ['settings', 'Settings', Settings],
  ['history', 'Publish history', History],
];

const editOnPage = (path) => { sessionStorage.setItem('fz-edit', '1'); window.location.href = path; };

export default function AdminApp() {
  const [session, setSession] = useState(null);

  const refresh = useCallback(() => api.session().then(setSession).catch(() => setSession({ authenticated: false, configured: false })), []);
  useEffect(() => {
    document.title = 'Admin | Flazyn';
    refresh();
  }, [refresh]);

  if (!session) return <div className="admin-boot"><Loader2 className="spin" /> Loading…</div>;
  if (!session.authenticated) return <Login session={session} onDone={refresh} />;
  return <Dashboard session={session} onLogout={async () => { await api.logout(); refresh(); }} />;
}

/* ─────────────────────────── login ─────────────────────────── */
function Login({ session, onDone }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try { await api.login(email, password); onDone(); } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <div className="adm-brand"><LogoMark className="adm-logo" /> Flazyn <span>Admin</span></div>
        <h1>Sign in</h1>
        {!session.configured && (
          <div className="adm-warn"><AlertTriangle size={16} /> Admin login isn’t configured yet. Add <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD_HASH</code> and <code>ADMIN_SESSION_SECRET</code> to the environment variables.</div>
        )}
        <Field label="Email"><input className="adm-input" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label="Password"><input className="adm-input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
        {error && <div className="adm-error">{error}</div>}
        <button className="adm-btn primary block" disabled={busy || !session.configured}>{busy ? <Loader2 size={16} className="spin" /> : <Lock size={16} />} Sign in</button>
        <a className="adm-back" href="/">← Back to flazyn.com</a>
      </form>
    </div>
  );
}

/* ─────────────────────────── dashboard ─────────────────────────── */
function Dashboard({ session, onLogout }) {
  const [tab, setTab] = useState(() => (location.hash.slice(1) && TABS.some(([t]) => t === location.hash.slice(1)) ? location.hash.slice(1) : 'overview'));
  const [content, setContent] = useState(null);
  const [published, setPublished] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState('');
  const [status, setStatus] = useState('');

  const load = useCallback(async () => {
    const r = await api.getContent();
    setContent({ ...EMPTY_CONTENT, ...r.draft });
    setPublished(r.published);
    setDirty(false);
  }, []);
  useEffect(() => { load().catch((e) => setStatus(e.message)); }, [load]);
  useEffect(() => { history.replaceState(null, '', `#${tab}`); }, [tab]);
  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (fn) => { setContent((c) => fn(c)); setDirty(true); setStatus(''); };

  const save = async () => {
    setBusy('Saving…');
    try { await api.saveDraft(content); setDirty(false); setStatus('Draft saved.'); return true; } catch (e) { setStatus(e.message); return false; } finally { setBusy(''); }
  };
  const publish = async () => {
    if (!window.confirm('Publish all saved changes to the live site?')) return;
    if (dirty && !(await save())) return;
    setBusy('Publishing…');
    try {
      const r = await api.publish();
      setStatus(r.rebuild === 'triggered' ? 'Published! The live site updates in about 1–2 minutes.' : 'Published. Add the deploy hook (see Settings) so the site rebuilds automatically.');
      await load();
    } catch (e) { setStatus(e.message); } finally { setBusy(''); }
  };

  return (
    <div className="adm">
      <aside className="adm-side">
        <div className="adm-brand"><LogoMark className="adm-logo" /> Flazyn <span>Admin</span></div>
        <nav>
          {TABS.map(([id, label, Icon]) => (
            <button key={id} type="button" className={tab === id ? 'on' : ''} onClick={() => setTab(id)}><Icon size={17} /> {label}</button>
          ))}
        </nav>
        <div className="adm-side-foot">
          <a href="/" target="_blank" rel="noopener"><ExternalLink size={15} /> View site</a>
          <button type="button" onClick={onLogout}><LogOut size={15} /> Log out</button>
          <small>{session.email}</small>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-top">
          <h1>{TABS.find(([id]) => id === tab)?.[1]}</h1>
          <span className="adm-status">{busy || status || (dirty ? 'Unsaved changes' : content ? 'All changes saved' : '')}</span>
          <button type="button" className="adm-btn" onClick={save} disabled={!dirty || !!busy}><Save size={15} /> Save draft</button>
          <button type="button" className="adm-btn primary" onClick={publish} disabled={!!busy}><Rocket size={15} /> Publish</button>
        </header>

        <div className="adm-content">
          {!content ? <div className="adm-hint"><Loader2 className="spin" size={16} /> Loading content…</div> : (
            <>
              {tab === 'overview' && <Overview session={session} published={published} content={content} go={setTab} />}
              {tab === 'pages' && <Pages content={content} update={update} />}
              {tab === 'blog' && <Blog content={content} update={update} storage={session.storage} />}
              {tab === 'media' && <Media storage={session.storage} />}
              {tab === 'settings' && <SettingsTab content={content} update={update} session={session} />}
              {tab === 'history' && <HistoryTab onRestored={load} dirty={dirty} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── overview ─────────────────────────── */
function Overview({ session, published, content, go }) {
  const edits = Object.keys(content.text || {}).length + Object.keys(content.media || {}).length + Object.values(content.blocks || {}).reduce((n, l) => n + l.length, 0);
  const checks = [
    [session.storage === 'blob' || session.storage === 'local', session.storage === 'blob' ? 'File storage connected (Vercel Blob)' : session.storage === 'local' ? 'Local storage (development mode)' : 'File storage not connected — create a Vercel Blob store'],
    [session.rebuild, session.rebuild ? 'Auto-rebuild on publish is set up' : 'Deploy hook missing — publishing won’t rebuild the site automatically'],
  ];
  return (
    <div className="adm-stack">
      <div className="adm-card">
        <h2>Welcome back</h2>
        <p className="adm-hint">Edit any page directly on the site, then press <strong>Publish</strong>. Changes go live in about 1–2 minutes.</p>
        <div className="adm-quick">
          <button type="button" className="adm-btn primary" onClick={() => editOnPage('/')}><Pencil size={15} /> Edit the homepage</button>
          <button type="button" className="adm-btn" onClick={() => go('pages')}><FileText size={15} /> All pages</button>
          <button type="button" className="adm-btn" onClick={() => go('blog')}><Plus size={15} /> Write a blog post</button>
          <button type="button" className="adm-btn" onClick={() => go('media')}><Upload size={15} /> Upload media</button>
        </div>
      </div>
      <div className="adm-grid-3">
        <div className="adm-card"><span className="adm-kpi-label">Last published</span><strong className="adm-kpi">{published?.updatedAt ? new Date(published.updatedAt).toLocaleString() : 'Never'}</strong></div>
        <div className="adm-card"><span className="adm-kpi-label">Customisations in draft</span><strong className="adm-kpi">{edits}</strong></div>
        <div className="adm-card"><span className="adm-kpi-label">Blog posts</span><strong className="adm-kpi">{(content.posts || POSTS).length}</strong></div>
      </div>
      <div className="adm-card">
        <h2>Setup status</h2>
        {checks.map(([ok, label]) => <div key={label} className={`adm-check ${ok ? 'ok' : 'bad'}`}>{ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />} {label}</div>)}
      </div>
    </div>
  );
}

/* ─────────────────────────── pages & SEO ─────────────────────────── */
function Pages({ content, update }) {
  const [open, setOpen] = useState(null);
  const setSeo = (path, patch) => update((c) => {
    const cur = { title: '', description: '', ...(c.seo?.[path] || {}), ...patch };
    const seo = { ...c.seo };
    if (!cur.title && !cur.description) delete seo[path]; else seo[path] = cur;
    return { ...c, seo };
  });
  return (
    <div className="adm-card flush">
      <table className="adm-table">
        <thead><tr><th>Page</th><th>Search title</th><th /></tr></thead>
        <tbody>
          {PAGE_ROUTES.map((r) => {
            const meta = applySeo(r, content);
            const custom = !!content.seo?.[r.path];
            return [
              <tr key={r.path}>
                <td><strong>{r.path}</strong></td>
                <td className="adm-muted">{meta.title}{custom && <span className="adm-tag">custom</span>}</td>
                <td className="adm-actions">
                  <button type="button" className="adm-btn sm" onClick={() => setOpen(open === r.path ? null : r.path)}>SEO</button>
                  <button type="button" className="adm-btn sm primary" onClick={() => editOnPage(r.path)}><Pencil size={13} /> Edit on page</button>
                </td>
              </tr>,
              open === r.path && (
                <tr key={`${r.path}-seo`} className="adm-subrow"><td colSpan={3}>
                  <div className="adm-row">
                    <Field label="Search title" hint="Leave empty to use the default."><input className="adm-input" placeholder={r.title} value={content.seo?.[r.path]?.title || ''} maxLength={160} onChange={(e) => setSeo(r.path, { title: e.target.value })} /></Field>
                    <Field label="Search description"><input className="adm-input" placeholder={r.description} value={content.seo?.[r.path]?.description || ''} maxLength={320} onChange={(e) => setSeo(r.path, { description: e.target.value })} /></Field>
                  </div>
                </td></tr>
              ),
            ];
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ─────────────────────────── blog ─────────────────────────── */
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-').slice(0, 80);

function Blog({ content, update, storage }) {
  const posts = useMemo(() => (content.posts || POSTS).map((p) => ({ ...p, body: postText(p.body) })), [content.posts]);
  const [editing, setEditing] = useState(null);
  const setPosts = (list) => update((c) => ({ ...c, posts: list }));
  const save = (post, index) => {
    const list = [...posts];
    if (index >= 0) list[index] = post; else list.unshift(post);
    setPosts(list);
    setEditing(null);
  };
  return (
    <div className="adm-stack">
      <div><button type="button" className="adm-btn primary" onClick={() => setEditing({ index: -1, post: { slug: '', title: '', description: '', tag: 'Playbook', readTime: '4 min read', date: new Date().toISOString().slice(0, 10), author: 'Flazyn Team', image: '', imageAlt: '', body: '' } })}><Plus size={15} /> New post</button></div>
      <div className="adm-card flush">
        <table className="adm-table">
          <thead><tr><th /><th>Title</th><th>Date</th><th /></tr></thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p.slug}>
                <td className="adm-thumb">{p.image ? <img src={p.image} alt="" /> : <ImageIcon size={18} />}</td>
                <td><strong>{p.title}</strong><div className="adm-muted">/blog/{p.slug}</div></td>
                <td className="adm-muted">{p.date}</td>
                <td className="adm-actions">
                  <a className="adm-btn sm" href={`/blog/${p.slug}`} target="_blank" rel="noopener"><ExternalLink size={13} /></a>
                  <button type="button" className="adm-btn sm" onClick={() => setEditing({ index: i, post: p })}><Pencil size={13} /> Edit</button>
                  <button type="button" className="adm-btn sm danger" onClick={() => { if (window.confirm(`Delete “${p.title}”?`)) setPosts(posts.filter((_, j) => j !== i)); }}><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && <PostModal storage={storage} initial={editing.post} taken={posts.filter((_, j) => j !== editing.index).map((p) => p.slug)} onClose={() => setEditing(null)} onSave={(p) => save(p, editing.index)} />}
    </div>
  );
}

function PostModal({ storage, initial, taken, onSave, onClose }) {
  const [p, setP] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [error, setError] = useState('');
  const set = (patch) => setP((x) => ({ ...x, ...patch }));
  const submit = () => {
    const slug = slugify(p.slug || p.title);
    if (!p.title.trim()) return setError('Please add a title.');
    if (!slug) return setError('Please add a URL slug.');
    if (taken.includes(slug)) return setError('Another post already uses this URL.');
    onSave({ ...p, slug });
  };
  return (
    <Modal title={initial.title ? 'Edit post' : 'New post'} onClose={onClose} wide footer={<>{error && <span className="adm-error inline">{error}</span>}<span style={{ flex: 1 }} /><button type="button" className="adm-btn" onClick={onClose}>Cancel</button><button type="button" className="adm-btn primary" onClick={submit}>Save post</button></>}>
      <div className="adm-two">
        <div>
          <Field label="Title"><input className="adm-input" value={p.title} maxLength={200} onChange={(e) => set({ title: e.target.value, ...(slugTouched ? {} : { slug: slugify(e.target.value) }) })} /></Field>
          <Field label="URL" hint={`flazyn.com/blog/${slugify(p.slug || p.title) || '…'}`}><input className="adm-input" value={p.slug} maxLength={80} onChange={(e) => { setSlugTouched(true); set({ slug: e.target.value }); }} /></Field>
          <Field label="Summary" hint="Shown on the blog page and in Google results."><textarea className="adm-input" rows={3} value={p.description} maxLength={320} onChange={(e) => set({ description: e.target.value })} /></Field>
          <div className="adm-row">
            <Field label="Tag"><input className="adm-input" value={p.tag} maxLength={40} onChange={(e) => set({ tag: e.target.value })} /></Field>
            <Field label="Read time"><input className="adm-input" value={p.readTime} maxLength={30} onChange={(e) => set({ readTime: e.target.value })} /></Field>
          </div>
          <div className="adm-row">
            <Field label="Date"><input className="adm-input" type="date" value={p.date} onChange={(e) => set({ date: e.target.value })} /></Field>
            <Field label="Author"><input className="adm-input" value={p.author} maxLength={80} onChange={(e) => set({ author: e.target.value })} /></Field>
          </div>
          <Field label="Article" hint="Blank line = new paragraph · “## ” starts a heading · “- ” starts a bullet point.">
            <textarea className="adm-input mono" rows={14} value={p.body} maxLength={60000} onChange={(e) => set({ body: e.target.value })} />
          </Field>
        </div>
        <div>
          <span className="adm-label">Cover image</span>
          <Preview url={p.image} alt={p.imageAlt} />
          <Field label="Cover description (alt text)"><input className="adm-input" value={p.imageAlt} maxLength={300} onChange={(e) => set({ imageAlt: e.target.value })} /></Field>
          <MediaChooser storage={storage} allowVideo={false} value={{ url: p.image }} onChange={(v) => set({ image: v.url })} />
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────── media ─────────────────────────── */
function Media({ storage }) {
  const [items, setItems] = useState(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const load = () => api.media().then((r) => setItems(r.items)).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);
  const onFiles = async (files) => {
    setError('');
    for (const file of Array.from(files || [])) {
      setBusy(`Uploading ${file.name}…`);
      try { await uploadFile(file, storage, (p) => setBusy(`Uploading ${file.name}… ${Math.round(p)}%`)); } catch (e) { setError(`${file.name}: ${e.message}`); }
    }
    setBusy('');
    load();
  };
  const remove = async (m) => {
    if (!window.confirm(`Delete ${m.name}? Anything still using it on the site will show a broken image.`)) return;
    try { await api.deleteMedia(m.url); load(); } catch (e) { setError(e.message); }
  };
  return (
    <div className="adm-stack">
      <label className="adm-drop" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
        {busy ? <><Loader2 size={20} className="spin" /> {busy}</> : <><Upload size={20} /> <span><strong>Upload images or videos</strong> — click or drop files here (several at once is fine)</span></>}
        <input type="file" accept={ACCEPT} multiple hidden onChange={(e) => onFiles(e.target.files)} />
      </label>
      {error && <div className="adm-error">{error}</div>}
      {items === null ? <div className="adm-hint">Loading…</div> : items.length === 0 ? <div className="adm-hint">No uploads yet. To put an image on a page, open the page with “Edit on page” and use “Replace” or “Add block”.</div> : (
        <div className="adm-media-grid">
          {items.map((m) => (
            <div key={m.url} className="adm-media-item">
              <div className="adm-media-thumb">{isVideoUrl(m.url) ? <><video src={m.url} muted preload="metadata" /><Film size={14} className="adm-lib-badge" /></> : <img src={m.url} alt="" loading="lazy" />}</div>
              <div className="adm-media-meta"><span title={m.name}>{m.name}</span><small>{formatSize(m.size)}</small></div>
              <div className="adm-media-actions">
                <button type="button" className="adm-btn sm" onClick={() => { navigator.clipboard.writeText(new URL(m.url, location.origin).href); setCopied(m.url); setTimeout(() => setCopied(''), 1500); }}>{copied === m.url ? <Check size={13} /> : <Copy size={13} />} Link</button>
                <button type="button" className="adm-btn sm danger" onClick={() => remove(m)}><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── settings ─────────────────────────── */
function SettingsTab({ content, update, session }) {
  const s = content.settings || {};
  const [diag, setDiag] = useState(null);
  const runDiag = async () => { setDiag('running'); try { setDiag(await api.diagnose()); } catch (e) { setDiag({ steps: [{ name: 'request', ok: false, detail: e.message }] }); } };
  const set = (patch) => update((c) => ({ ...c, settings: { ...c.settings, ...patch } }));
  return (
    <div className="adm-stack">
      <div className="adm-card">
        <h2>Site details</h2>
        <Field label="Public contact email" hint="Shown in the footer, contact page and legal pages."><input className="adm-input" type="email" placeholder={SITE.email} value={s.email || ''} onChange={(e) => set({ email: e.target.value })} /></Field>
        <Field label="Tagline" hint="Used in the footer."><input className="adm-input" placeholder={SITE.tagline} value={s.tagline || ''} maxLength={200} onChange={(e) => set({ tagline: e.target.value })} /></Field>
      </div>
      <div className="adm-card">
        <h2>Registered business</h2>
        <p className="adm-hint">These appear in the footer and legal pages and must match the ABN register, so they’re changed in code (<code>src/lib/site.js</code>), not here.</p>
        <p><strong>{SITE.legalName}</strong> trading as {SITE.name} · ABN {SITE.abn}<br />{addressLine()}</p>
      </div>
      <div className="adm-card">
        <h2>Publishing setup</h2>
        <div className={`adm-check ${session.storage === 'blob' ? 'ok' : 'bad'}`}>{session.storage === 'blob' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />} Storage: {session.storage === 'blob' ? 'Vercel Blob connected' : session.storage === 'local' ? 'local files (development only)' : 'not connected'}</div>
        <div className={`adm-check ${session.rebuild ? 'ok' : 'bad'}`}>{session.rebuild ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />} Auto-rebuild: {session.rebuild ? 'deploy hook configured' : 'add VERCEL_DEPLOY_HOOK_URL (Vercel → Settings → Git → Deploy Hooks)'}</div>
        <div style={{ marginTop: 14 }}><button type="button" className="adm-btn" onClick={runDiag} disabled={diag === 'running'}>{diag === 'running' ? <Loader2 size={15} className="spin" /> : <CheckCircle2 size={15} />} Test storage</button></div>
        {diag && diag !== 'running' && (
          <div style={{ marginTop: 12 }}>
            {diag.steps.map((st) => <div key={st.name} className={`adm-check ${st.ok ? 'ok' : 'bad'}`}>{st.ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />} <span><strong>{st.name}</strong> — <span style={{ wordBreak: 'break-word' }}>{st.detail}</span></span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── history ─────────────────────────── */
function HistoryTab({ onRestored, dirty }) {
  const [items, setItems] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(() => { api.history().then((r) => setItems(r.items)).catch((e) => setMsg(e.message)); }, []);
  const restore = async (id) => {
    if (dirty && !window.confirm('Restoring replaces your unsaved changes. Continue?')) return;
    if (!window.confirm('Restore this version into your draft? You can review it and then publish.')) return;
    try { await api.restore(id); await onRestored(); setMsg('Restored into your draft. Review it, then press Publish.'); } catch (e) { setMsg(e.message); }
  };
  return (
    <div className="adm-stack">
      {msg && <div className="adm-note">{msg}</div>}
      <div className="adm-card flush">
        {items === null ? <div className="adm-hint" style={{ padding: 20 }}>Loading…</div> : items.length === 0 ? <div className="adm-hint" style={{ padding: 20 }}>Nothing published yet.</div> : (
          <table className="adm-table">
            <thead><tr><th>Published</th><th /></tr></thead>
            <tbody>{items.map((h, i) => (
              <tr key={h.id}><td>{new Date(h.date).toLocaleString()}{i === 0 && <span className="adm-tag">live</span>}</td><td className="adm-actions"><button type="button" className="adm-btn sm" onClick={() => restore(h.id)}><History size={13} /> Restore to draft</button></td></tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
