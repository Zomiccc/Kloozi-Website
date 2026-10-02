// Build-time render entry used by scripts/prerender.mjs.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';
import ContentRoot from './lib/ContentRoot.jsx';

export { routesFor, NOT_FOUND, canonical, applySeo } from './lib/seo.js';
export { SITE } from './lib/site.js';
export { POSTS } from './lib/posts.js';
export { HOME_FAQ } from './pages/Home.jsx';

export function render(url, content) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <ContentRoot initial={content}>
          <App />
        </ContentRoot>
      </StaticRouter>
    </React.StrictMode>
  );
}
