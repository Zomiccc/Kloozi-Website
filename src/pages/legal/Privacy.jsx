// Flazyn — Privacy Policy (text supplied by the business, 1 Oct 2026).
import { Link } from 'react-router-dom';
import LegalPage, { Mail } from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" effective="1 October 2026">
      <p>
        Flazyn is a customer relationship management (CRM) service operated by {SITE.legalName} (ABN {SITE.abn}), trading as Flazyn
        (“Flazyn”, “we”, “us”). Businesses use Flazyn to capture sales leads from their advertising and websites and to follow up with
        those leads by phone, WhatsApp, SMS and email. This policy explains what personal information we collect, how we use and share
        it, and your choices. We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy
        Principles.
      </p>

      <h2>1. Who this policy covers</h2>
      <ul>
        <li><strong>Customers:</strong> businesses and their team members who use Flazyn, and people who join our early-access programme.</li>
        <li><strong>Leads:</strong> people whose details a customer receives, for example by submitting a lead form on Facebook, Instagram, LinkedIn, TikTok, Google or a customer’s website, or by messaging the customer on WhatsApp.</li>
      </ul>
      <p>
        For lead information, the customer who collected it controls that information and Flazyn processes it on their behalf. If you
        are a lead, you can contact the business you submitted your details to, or contact us and we will pass on your request.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Account information:</strong> name, email, phone, company, role, and password (stored only as a one-way hash). If you sign in with Google, we also receive your Google email and name.</li>
        <li>
          <strong>Lead information from connected platforms.</strong> When a customer connects an advertising account, we receive the
          answers a person submitted on that platform’s lead form. This is typically name, phone, email, city and any custom questions
          the advertiser added, plus form, ad and campaign identifiers. The sources are:
          <ul>
            <li>Meta (Facebook and Instagram Lead Ads), via the Meta Graph API leadgen webhook and the <code>leads_retrieval</code> permission, only for the Pages the customer connects</li>
            <li>LinkedIn Lead Gen Forms, via the LinkedIn Lead Sync API, for ad accounts the customer connects</li>
            <li>TikTok Lead Generation, via the TikTok API for Business, for advertiser accounts the customer connects</li>
            <li>website forms, WordPress, Google Forms and Zapier connections the customer installs</li>
          </ul>
        </li>
        <li><strong>Messages:</strong> WhatsApp, SMS and email messages exchanged between a customer and its leads through Flazyn, and their delivery status.</li>
        <li>
          <strong>Engagement information:</strong> when a customer shares a document or website link through Flazyn, or installs the
          Flazyn script on their own website, we record:
          <ul>
            <li>pages viewed and time spent</li>
            <li>which pages of a shared document were read</li>
            <li>email opens and clicks</li>
          </ul>
          This information is linked to a lead only after they identify themselves (for example by submitting a form or opening a link sent to them).
        </li>
        <li><strong>Technical information:</strong> IP address, browser and device type, kept in server logs for security and troubleshooting.</li>
      </ul>

      <h2>3. How we use information</h2>
      <ul>
        <li>to deliver new leads instantly to the customer that collected them and assign them to the right team member</li>
        <li>to let customers contact and follow up with their own leads, and to run the automations the customer configures</li>
        <li>to show customers reports and interest indicators about their own leads, including optional AI-generated summaries</li>
        <li>to send service notifications, such as new-lead alerts</li>
        <li>to secure the service, prevent abuse and fix problems, and to process subscription payments</li>
      </ul>
      <p>
        Data received from Meta, LinkedIn or TikTok is used only to provide the lead-management service to the customer that connected
        the account. We do not sell it, use it for advertising, build profiles across customers, or share it with data brokers.
      </p>

      <h2>4. Who we share information with</h2>
      <p>We share information only with service providers that run parts of Flazyn for us, under contracts limiting them to that purpose:</p>
      <ul>
        <li>cloud hosting and storage (including Amazon Web Services)</li>
        <li>Vercel, to host the flazyn.com website</li>
        <li>Resend, to deliver messages sent through the contact and early-access forms on flazyn.com</li>
        <li>Twilio and the Meta WhatsApp Business Platform, to send and receive WhatsApp and SMS messages</li>
        <li>Twilio SendGrid, to send email</li>
        <li>Google Firebase, to deliver push notifications</li>
        <li>OpenAI, only when a customer uses AI features, to process the relevant text</li>
        <li>Stripe, for payments (we never store full card numbers)</li>
      </ul>
      <p>We may also disclose information when required by law.</p>

      <h2>5. Overseas disclosure</h2>
      <p>
        Some of these providers store or process data outside Australia, mainly in the United States, and depending on configuration
        also the European Union or Singapore. We take reasonable steps, including contractual commitments, to ensure they handle it
        consistently with the Australian Privacy Principles.
      </p>

      <h2>6. Retention and security</h2>
      <ul>
        <li>We keep customer and lead data while the customer’s account is active.</li>
        <li>Customers can delete individual leads at any time.</li>
        <li>When an account is deleted, its data is removed from active systems within 30 days and from backups within 90 days.</li>
        <li>Access tokens for connected platforms are deleted when the customer disconnects the integration.</li>
        <li>Data is encrypted in transit (HTTPS), passwords are hashed, and each customer’s data is isolated from every other customer’s.</li>
      </ul>

      <h2>7. Access, correction and deletion</h2>
      <p>
        You can ask for access to, correction of, or deletion of your personal information by emailing <Mail />. We respond within 30
        days and do not charge for requests. Deletion instructions, including for data received via Facebook, are on our{' '}
        <Link to="/data-deletion">Data Deletion</Link> page.
      </p>

      <h2>8. Complaints</h2>
      <p>
        If you have a privacy concern, email <Mail />; we will investigate and reply within 30 days. If you are not satisfied, you can
        complain to the Office of the Australian Information Commissioner at{' '}
        <a href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer">oaic.gov.au</a>. If a data breach is likely to
        cause serious harm, we will notify affected people and the OAIC under the Notifiable Data Breaches scheme.
      </p>

      <h2>9. Children</h2>
      <p>Flazyn is a business tool and is not directed at children under 16.</p>

      <h2>10. Changes</h2>
      <p>We will post changes on this page and update the effective date; material changes will be emailed to customers.</p>
    </LegalPage>
  );
}
