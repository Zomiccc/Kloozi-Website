// Flazyn — Data Deletion Instructions (the "User data deletion" URL
// Meta asks for in App Dashboard settings).
import LegalPage from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function DataDeletion() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      updated="30 September 2026"
      intro={[
        'You can ask Flazyn to delete your personal data at any time. This page explains how, what we delete and how long it takes.',
      ]}
      sections={[
        {
          title: 'How to request deletion',
          list: [
            `Email ${SITE.email} with the subject “Data deletion request”.`,
            'Send it from the email address you used with Flazyn, or tell us the phone number (for WhatsApp) or email address you want deleted.',
            'If you are a business customer, tell us which workspace should be deleted.',
          ],
          after: ['You can also use our contact form at ' + SITE.url + '/contact and choose “Privacy or data request”.'],
        },
        {
          title: 'What happens next',
          list: [
            'We confirm we received your request within 5 business days.',
            'We may ask you to verify your identity so we don’t delete someone else’s data.',
            'We delete your personal data from our active systems within 30 days, and it is removed from backups on their normal cycle.',
            'We email you to confirm the deletion is complete.',
          ],
        },
        {
          title: 'What we delete',
          p: ['Your contact details, form submissions, account information and, for business customers, your workspace data — including leads, notes and WhatsApp conversation data received through the WhatsApp Business Platform. We may keep a minimal record that the request was completed, and any data we are legally required to retain.'],
        },
        {
          title: 'If you messaged a business that uses Flazyn',
          p: ['Businesses use Flazyn to manage their own customer conversations. If you want a particular business to delete your data, you can contact that business directly, or email us and we will pass your request to them and help them complete it.'],
        },
        {
          title: 'Disconnecting WhatsApp or Facebook',
          p: ['Business customers can disconnect their WhatsApp Business account from Flazyn at any time. You can also remove Flazyn’s access from your Meta Business settings. Disconnecting stops new data from reaching Flazyn; to delete data already stored, send a deletion request as described above.'],
        },
      ]}
    />
  );
}
