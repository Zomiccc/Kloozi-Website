// Zomic marketing — Privacy Policy.
import LegalPage from './LegalPage.jsx';

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      intro="We take privacy seriously. This policy explains what data Zomic collects, why we collect it, and the choices you have. It is written in plain English because privacy policies should not require a lawyer to read."
      sections={[
        { title: 'What we collect', paragraphs: ['We collect only what we need to run the product:'], list: [
          'Account information: name, email, company name.',
          'Lead data you enter or import: names, emails, phone numbers, notes, and custom fields.',
          'Message content: WhatsApp and email conversations you send and receive through Zomic, so we can show them in your inbox and log them on lead records.',
          'Usage data: which features you use, so we can improve the product. No third-party ad trackers.',
        ] },
        { title: 'Why we collect it', paragraphs: ['To provide the service, to keep your data safe, to debug issues, and to improve Zomic. We never sell your data, and we never use your lead data to train external models.'] },
        { title: 'How we store it', paragraphs: ['Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Access is least-privilege, role-scoped, and audited. Backups are encrypted and stored in a separate region.'] },
        { title: 'Your choices', paragraphs: ['You can export or delete your data at any time from your workspace settings. Deletion is permanent within 30 days. You can also request a full data export by emailing privacy@zomic.com.'] },
        { title: 'Sub-processors', paragraphs: ['We use a small number of trusted sub-processors (cloud hosting, email delivery, WhatsApp Business API provider). All are bound by data processing agreements. A current list is available on request.'] },
        { title: 'International transfers', paragraphs: ['Zomic is remote-first and our infrastructure is hosted in the EU and US. Where data crosses borders, we rely on Standard Contractual Clauses and adequate safeguards.'] },
        { title: 'Contact', paragraphs: ['Questions about privacy? Email privacy@zomic.com. We will reply within 5 business days.'] },
      ]}
    />
  );
}
