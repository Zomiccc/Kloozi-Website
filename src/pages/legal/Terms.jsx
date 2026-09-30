// Flazyn — Terms of Service.
import LegalPage from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="30 September 2026"
      intro={[
        `These Terms of Service (“Terms”) govern your use of the ${SITE.domain} website and the Flazyn service provided by ${SITE.legalName} (“Flazyn”, “we”, “us”). By using the website or the service, you agree to these Terms.`,
      ]}
      sections={[
        {
          title: '1. Early access',
          p: ['Flazyn is currently offered as an early-access service. Features may change, be added or be removed, and the service may be interrupted while we improve it. Early access is provided free of charge unless we agree otherwise with you in writing.'],
        },
        {
          title: '2. Accounts',
          p: ['You must provide accurate information, keep your login details secure, and are responsible for activity in your account. You must be at least 18 years old and able to enter into a binding contract on behalf of yourself or the business you represent.'],
        },
        {
          title: '3. Acceptable use',
          p: ['You agree not to use Flazyn to:'],
          list: [
            'send spam or unsolicited messages, or message people who have not opted in to hear from you;',
            'violate the WhatsApp Business Messaging Policy, WhatsApp Commerce Policy, Meta’s terms, or any applicable law, including data protection and anti-spam laws;',
            'upload unlawful, harmful, fraudulent or infringing content;',
            'attempt to gain unauthorised access to the service or disrupt it;',
            'resell or reverse engineer the service except where the law allows.',
          ],
          after: ['We may suspend accounts that break these rules to protect our users, recipients and the platforms we connect to.'],
        },
        {
          title: '4. Your data',
          p: ['You own the data you put into Flazyn, including your leads, contacts and conversations (“Customer Data”). You grant us permission to host and process Customer Data only as needed to provide the service. You are responsible for having a lawful basis, including any required consent, for the Customer Data you store and the messages you send. Our handling of personal data is described in our Privacy Policy.'],
        },
        {
          title: '5. Third-party services',
          p: ['Flazyn connects to third-party services such as the WhatsApp Business Platform provided by Meta. Your use of those services is subject to their own terms, and we are not responsible for their availability or actions. WhatsApp is a trademark of Meta Platforms, Inc.; Flazyn is not affiliated with or endorsed by Meta.'],
        },
        {
          title: '6. Intellectual property',
          p: ['Flazyn, including its software, design and branding, is owned by us and protected by intellectual property laws. These Terms do not give you any rights to our trademarks. If you send us feedback, we may use it without obligation to you.'],
        },
        {
          title: '7. Termination',
          p: ['You may stop using Flazyn at any time and ask us to delete your account. We may suspend or end your access if you breach these Terms or if we discontinue the early-access programme, and we will give reasonable notice where we can. You can request a copy of your Customer Data before deletion.'],
        },
        {
          title: '8. Disclaimers',
          p: ['The service is provided “as is” and “as available” during early access, without warranties of any kind, to the fullest extent permitted by law.'],
        },
        {
          title: '9. Limitation of liability',
          p: ['To the fullest extent permitted by law, Flazyn will not be liable for any indirect, incidental, special or consequential damages, or for lost profits, revenue or data. Nothing in these Terms limits liability that cannot be limited by law.'],
        },
        {
          title: '10. Changes',
          p: ['We may update these Terms. We will post the new version here and change the effective date, and notify account holders of material changes by email.'],
        },
        {
          title: '11. Contact',
          p: [`Questions about these Terms: ${SITE.email}`],
        },
      ]}
    />
  );
}
