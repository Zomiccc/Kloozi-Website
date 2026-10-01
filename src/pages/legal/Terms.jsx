// Flazyn — Terms of Service (text supplied by the business, 1 Oct 2026).
import { Link } from 'react-router-dom';
import LegalPage from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" effective="1 October 2026">
      <p>
        These terms govern your use of flazyn.com and the Flazyn service, provided by {SITE.legalName} (ABN {SITE.abn}) trading as
        Flazyn. By using the website or the service you agree to them on behalf of yourself and the business you represent.
      </p>

      <h2>1. The service and early access</h2>
      <p>
        Flazyn lets businesses capture leads from advertising platforms and websites, organise them in a pipeline, and follow up by
        phone, WhatsApp, SMS and email, including automations the customer configures. Flazyn is currently offered as an early-access
        service: features may change, and the service may be interrupted while we improve it. Early access is free unless we agree
        otherwise in writing.
      </p>

      <h2>2. Your account</h2>
      <p>
        You must give accurate information, keep your login secure, and be at least 18 and authorised to act for your business. You are
        responsible for activity in your workspace, including by team members you invite.
      </p>

      <h2>3. Your data and your leads</h2>
      <p>You own the data you put into Flazyn, including your leads. You are responsible for:</p>
      <ul>
        <li>having a lawful basis to collect and contact your leads</li>
        <li>honouring their opt-outs</li>
        <li>complying with the policies of every platform you connect, including Meta’s Platform Terms, the WhatsApp Business Policy, LinkedIn’s API Terms and TikTok’s advertising policies</li>
      </ul>
      <p>We process lead data only on your instructions, as described in our <Link to="/privacy">Privacy Policy</Link>.</p>

      <h2>4. Acceptable use</h2>
      <p>You may not use Flazyn to:</p>
      <ul>
        <li>send spam or contact people without permission</li>
        <li>send unlawful, misleading or harassing content</li>
        <li>collect sensitive information without a lawful basis</li>
        <li>access other customers’ data or interfere with the service</li>
        <li>resell it without our written agreement</li>
      </ul>
      <p>We may suspend accounts that break these rules.</p>

      <h2>5. Third-party platforms</h2>
      <p>
        Integrations with Meta, WhatsApp, LinkedIn, TikTok, Google, Twilio, SendGrid and others depend on those providers. We are not
        responsible for their availability or policy changes.
      </p>

      <h2>6. Fees</h2>
      <p>
        Paid plans, when introduced, are billed in advance and renew until cancelled. Messaging charges from WhatsApp or SMS providers
        may apply separately.
      </p>

      <h2>7. Termination</h2>
      <p>
        You can stop using Flazyn and delete your account at any time. We may suspend or end accounts that breach these terms. After
        termination you can request an export of your data for 30 days, after which it is deleted.
      </p>

      <h2>8. Liability</h2>
      <p>
        The service is provided “as is”. To the extent permitted by law, we are not liable for indirect or consequential loss, and our
        total liability in any 12 months is limited to the fees you paid us in that period. Nothing in these terms excludes rights you
        have under the Australian Consumer Law that cannot lawfully be excluded.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the Australian Capital Territory, Australia, and you submit to the non-exclusive
        jurisdiction of its courts.
      </p>
    </LegalPage>
  );
}
