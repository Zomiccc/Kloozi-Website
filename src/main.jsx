import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ContentRoot from './lib/ContentRoot.jsx';
import { readEmbeddedContent } from './lib/content.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <ContentRoot initial={readEmbeddedContent()}>
        <App />
      </ContentRoot>
    </BrowserRouter>
  </React.StrictMode>
);

// Production pages are prerendered to static HTML (scripts/prerender.mjs),
// so hydrate them; the dev server and /admin serve an empty shell, so render.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
