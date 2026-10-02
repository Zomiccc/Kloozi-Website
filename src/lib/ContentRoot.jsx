// Holds the site's CMS content for the whole app. For a logged-in admin
// (fz_admin flag cookie) it lazy-loads the in-page editor runtime; regular
// visitors never download any admin code.
import { useEffect, useMemo, useState } from 'react';
import { ContentContext, EMPTY_CONTENT } from './content.jsx';

const hasAdminFlag = () => typeof document !== 'undefined' && /(?:^|;\s*)fz_admin=1/.test(document.cookie);

export default function ContentRoot({ initial, children }) {
  const [content, setContent] = useState(initial || EMPTY_CONTENT);
  const [editing, setEditing] = useState(false);
  const [editor, setEditor] = useState(null);
  const [Runtime, setRuntime] = useState(null);

  useEffect(() => {
    // Production pages carry their published content inline. If a page has
    // none (dev server, or a build that couldn't reach storage), fetch it.
    if (!initial?.updatedAt) {
      fetch('/api/content')
        .then((r) => (r.ok ? r.json() : null))
        .then((c) => { if (c && Object.keys(c).length) setContent({ ...EMPTY_CONTENT, ...c }); })
        .catch(() => {});
    }
    if (hasAdminFlag()) import('../admin/EditRuntime.jsx').then((m) => setRuntime(() => m.default));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ content, editing, editor }), [content, editing, editor]);
  return (
    <ContentContext.Provider value={value}>
      {children}
      {Runtime && <Runtime content={content} setContent={setContent} editing={editing} setEditing={setEditing} setEditor={setEditor} />}
    </ContentContext.Provider>
  );
}
