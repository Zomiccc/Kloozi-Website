// Flazyn — Data Deletion Instructions (text supplied by the business,
// 1 Oct 2026). This is the "User data deletion" URL given to Meta.
import LegalPage, { Mail } from './LegalPage.jsx';
import { SITE } from '../../lib/site.js';

export default function DataDeletion() {
  return (
    <LegalPage title="Data Deletion Instructions" effective="1 October 2026">
      <p>You can ask Flazyn ({SITE.legalName}, ABN {SITE.abn}) to delete your personal data at any time.</p>

      <h2>If you use Flazyn (business customers)</h2>
      <ul>
        <li><strong>Delete individual leads:</strong> open the lead in Flazyn and choose Delete, or select several in the Leads list.</li>
        <li><strong>Disconnect a platform:</strong> in Flazyn go to Automations, open Facebook, LinkedIn or TikTok and choose Disconnect. Stored access tokens are deleted immediately and no further leads are received.</li>
        <li><strong>Remove Flazyn from Facebook:</strong> in Facebook go to Settings &amp; privacy → Settings → Business integrations, select Flazyn and choose Remove.</li>
        <li><strong>Delete your whole account:</strong> in Flazyn go to Settings → Account → Delete account, or email <Mail /> from the account’s email address. All workspace data is removed from active systems within 30 days and from backups within 90 days.</li>
      </ul>

      <h2>If you submitted your details on a lead form or messaged a business</h2>
      <p>
        Your information belongs to the business whose form or WhatsApp you used, and you can ask that business to delete it. You can
        also email <Mail /> with the subject “Data deletion request”, including the phone number or email address you used and, if you
        know it, the business name. We will verify the request and delete the matching records (or pass the request to the business
        that controls them) and confirm within 30 days.
      </p>
    </LegalPage>
  );
}
