// Flazyn marketing — routes. Every path here is also listed in
// lib/seo.js so it gets prerendered and included in the sitemap.
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import { LeadManagement, WhatsAppAutomation, EmailSystem, Automations, Analytics } from './pages/productPages.jsx';
import { RealEstate, SalesTeams, Agencies, Startups } from './pages/solutionPages.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import EarlyAccess from './pages/EarlyAccess.jsx';
import Security from './pages/Security.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Privacy from './pages/legal/Privacy.jsx';
import Terms from './pages/legal/Terms.jsx';
import DataDeletion from './pages/legal/DataDeletion.jsx';
import NotFound from './pages/NotFound.jsx';

// The admin dashboard is its own app, loaded only when /admin is visited.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

export default function App() {
  const { pathname } = useLocation();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <Suspense fallback={<div className="admin-boot">Loading admin…</div>}><AdminApp /></Suspense>;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/lead-management" element={<LeadManagement />} />
        <Route path="/product/whatsapp-automation" element={<WhatsAppAutomation />} />
        <Route path="/product/email-system" element={<EmailSystem />} />
        <Route path="/product/automations" element={<Automations />} />
        <Route path="/product/analytics" element={<Analytics />} />
        <Route path="/solutions/real-estate" element={<RealEstate />} />
        <Route path="/solutions/sales-teams" element={<SalesTeams />} />
        <Route path="/solutions/agencies" element={<Agencies />} />
        <Route path="/solutions/startups" element={<Startups />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/early-access" element={<EarlyAccess />} />
        <Route path="/security" element={<Security />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
