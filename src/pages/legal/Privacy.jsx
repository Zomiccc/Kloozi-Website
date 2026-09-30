// Flazyn — Privacy Policy.
import LegalPage from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="30 September 2026"
      intro={[
        `This Privacy Policy explains how ${SITE.legalName} (“Flazyn”, “we”, “us”) collects, uses, shares and protects personal data when you visit ${SITE.domain}, join our early-access programme, or use the Flazyn customer relationship management (CRM) service.`,
        `If you have any questions, contact us at ${SITE.email}.`,
      ]}
      sections={[
        {
          title: '1. Who we are',
          p: [`Flazyn is a CRM that helps businesses manage leads and customer conversations across channels such as WhatsApp, email and website forms. For personal data we collect about website visitors and early-access applicants, Flazyn is the controller. For data our business customers store or process in Flazyn (for example, their own leads and conversations), Flazyn acts as a processor on the customer’s behalf, and the customer is the controller.`],
        },
        {
          title: '2. Information we collect',
          p: ['Information you give us:'],
          list: [
            'Early-access and contact forms: your name, email address, company, team size, the topic of your enquiry and any message you write.',
            'Account information (when you use the service): name, email, company, role and workspace settings.',
            'Correspondence: emails and messages you send to us.',
          ],
          after: [
            'Information we receive when businesses use Flazyn with the WhatsApp Business Platform: when a business connects its WhatsApp Business account, we receive through Meta’s WhatsApp Business Platform the data needed to deliver messages, such as phone numbers, WhatsApp profile names, message content, message status (sent, delivered, read) and timestamps. We process this data only to provide the service to that business.',
            'Technical information: our hosting provider records standard server logs (such as IP address, browser type, pages requested and timestamps) for security and reliability. This website does not use advertising or analytics cookies.',
          ],
        },
        {
          title: '3. How we use information',
          list: [
            'To respond to your enquiries and manage the early-access programme.',
            'To provide, maintain and secure the Flazyn service, including sending and receiving messages on behalf of our business customers.',
            'To send service-related emails, and early-access updates you have agreed to receive (you can unsubscribe at any time).',
            'To detect, prevent and investigate abuse, fraud and security incidents.',
            'To comply with legal obligations.',
          ],
          after: ['We do not sell personal data, and we do not use message content or customer data for advertising.'],
        },
        {
          title: '4. Legal bases',
          p: ['Where data protection laws such as the GDPR apply, we rely on: your consent (for example, early-access emails); the performance of a contract (providing the service); our legitimate interests (securing and improving the service, answering enquiries); and compliance with legal obligations.'],
        },
        {
          title: '5. How we share information',
          p: ['We share personal data only with service providers that help us run Flazyn, under contracts that require them to protect it:'],
          list: [
            'Vercel — website and application hosting.',
            'Resend — delivery of transactional emails, including form submissions.',
            'Meta Platforms — the WhatsApp Business Platform, when a business customer connects WhatsApp to Flazyn. Meta’s processing is governed by Meta’s own terms and policies.',
          ],
          after: ['We may also disclose information if required by law, to protect the rights and safety of our users or others, or as part of a business transfer such as a merger, in which case this policy will continue to apply.'],
        },
        {
          title: '6. International transfers',
          p: ['Our service providers may process data in countries other than your own. Where required, we rely on appropriate safeguards such as standard contractual clauses.'],
        },
        {
          title: '7. Data retention',
          p: ['We keep personal data only as long as needed for the purposes above. Early-access and contact enquiries are kept for up to 24 months unless you ask us to delete them sooner. Customer workspace data, including WhatsApp conversation data, is kept for as long as the customer’s account is active and deleted within 30 days of account closure or a verified deletion request, except where we must keep it longer by law.'],
        },
        {
          title: '8. Security',
          p: ['We use appropriate technical and organisational measures to protect personal data, including encryption in transit (HTTPS/TLS), access controls and the principle of least privilege. No method of transmission or storage is completely secure, but we work to protect your information and will notify you of a breach where the law requires.'],
        },
        {
          title: '9. Your rights',
          p: ['Depending on where you live, you may have the right to access, correct, delete, restrict or object to the processing of your personal data, to data portability, and to withdraw consent at any time. To exercise these rights, email us at ' + SITE.email + '. You also have the right to complain to your local data protection authority.'],
          after: ['If your data is stored in Flazyn by a business you interacted with (for example, you messaged a business on WhatsApp), please contact that business first; we will help them respond to your request. You can also contact us directly.'],
        },
        {
          title: '10. Data deletion',
          p: ['You can request deletion of your data at any time. See our Data Deletion Instructions at ' + SITE.url + '/legal/data-deletion.'],
        },
        {
          title: '11. Children',
          p: ['Flazyn is a business service and is not directed to children under 16. We do not knowingly collect personal data from children.'],
        },
        {
          title: '12. Changes to this policy',
          p: ['We may update this policy from time to time. We will post the new version on this page and change the effective date. If changes are significant, we will notify customers by email.'],
        },
        {
          title: '13. Contact',
          p: [`${SITE.legalName} · ${SITE.url} · ${SITE.email}`],
        },
      ]}
    />
  );
}
