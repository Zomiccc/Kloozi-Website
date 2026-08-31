// Zomic marketing — Terms of Service.
import LegalPage from './LegalPage.jsx';

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="August 2026"
      intro="These are the terms under which you use Zomic. We have tried to keep them readable. By signing up, you agree to them."
      sections={[
        { title: 'Your account', paragraphs: ['You are responsible for keeping your account credentials secure and for activity under your account. You must be 16 or older to use Zomic.'] },
        { title: 'Acceptable use', paragraphs: ['You agree not to:'], list: [
          'Use Zomic to send unsolicited spam or content that violates WhatsApp’s or email providers’ policies.',
          'Upload content that is illegal, infringes others’ rights, or contains malware.',
          'Attempt to access data you do not have permission to see.',
          'Reverse-engineer, scrape, or overload the service.',
        ] },
        { title: 'Your data', paragraphs: ['You own your data. We process it only to provide the service. You can export or delete it at any time. See our Privacy Policy for details.'] },
        { title: 'Plans & billing', paragraphs: ['Paid plans renew automatically until cancelled. You can cancel anytime from your workspace settings. Refunds for unused time on annual plans are available within 14 days of renewal.'] },
        { title: 'Service availability', paragraphs: ['We aim for high availability but do not guarantee uninterrupted service. Scheduled maintenance is announced in advance. Scale-plan customers have an SLA with service credits for downtime.'] },
        { title: 'Termination', paragraphs: ['You can close your account anytime. We can suspend or terminate accounts that violate these terms, with notice where possible.'] },
        { title: 'Liability', paragraphs: ['Zomic is provided "as is". To the maximum extent permitted by law, our liability is limited to the amount you paid in the 12 months before the claim.'] },
        { title: 'Changes', paragraphs: ['We may update these terms. We will notify you by email for material changes. Continued use after the effective date means you accept the updated terms.'] },
        { title: 'Contact', paragraphs: ['Questions? Email legal@zomic.com.'] },
      ]}
    />
  );
}
