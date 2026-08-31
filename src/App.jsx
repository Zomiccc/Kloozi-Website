// Zomic marketing — app shell + routes.
// Every route resolves to a real built page (Part 5: no dead links).
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';

import Home from './pages/Home.jsx';
import LeadManagement from './pages/product/LeadManagement.jsx';
import WhatsAppAutomation from './pages/product/WhatsAppAutomation.jsx';
import EmailSystem from './pages/product/EmailSystem.jsx';
import Analytics from './pages/product/Analytics.jsx';
import Automations from './pages/product/Automations.jsx';
import RealEstate from './pages/solutions/RealEstate.jsx';
import SalesTeams from './pages/solutions/SalesTeams.jsx';
import Agencies from './pages/solutions/Agencies.jsx';
import Startups from './pages/solutions/Startups.jsx';
import Pricing from './pages/Pricing.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';
import Security from './pages/Security.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import ApiDocs from './pages/ApiDocs.jsx';
import Privacy from './pages/legal/Privacy.jsx';
import Terms from './pages/legal/Terms.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/lead-management" element={<LeadManagement />} />
        <Route path="/product/whatsapp-automation" element={<WhatsAppAutomation />} />
        <Route path="/product/email-system" element={<EmailSystem />} />
        <Route path="/product/analytics" element={<Analytics />} />
        <Route path="/product/automations" element={<Automations />} />
        <Route path="/solutions/real-estate" element={<RealEstate />} />
        <Route path="/solutions/sales-teams" element={<SalesTeams />} />
        <Route path="/solutions/agencies" element={<Agencies />} />
        <Route path="/solutions/startups" element={<Startups />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/security" element={<Security />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/resources/help-center" element={<HelpCenter />} />
        <Route path="/resources/api-docs" element={<ApiDocs />} />
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
