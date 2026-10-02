// Flazyn — product pages (content only; layout lives in FeaturePage).
import {
  Inbox, GitBranch, Filter, Bell, Copy, History, MessageCircle, UsersRound, FileCheck2, Clock,
  Tags, ShieldCheck, Mail, LayoutTemplate, Split as SplitIcon, Gauge, ListChecks, Workflow, Megaphone,
  Globe, Webhook, Timer, BarChart3, TrendingUp, Download, Target, Activity,
} from 'lucide-react';
import FeaturePage from './FeaturePage.jsx';
import { PipelineMock, ChatMock, EmailMock, FlowMock, ChartMock, SourcesMock } from '../components/Mocks.jsx';

export function LeadManagement() {
  return (
    <FeaturePage
      k="p.leads"
      eyebrow="Product · Lead Management"
      title="Every lead, from every channel, in one pipeline."
      lead="Flazyn captures leads from WhatsApp, forms, ads and email into a single visual pipeline — so nothing slips between tools or teammates."
      heroArt={<PipelineMock />}
      capabilities={{
        eyebrow: 'Capabilities',
        title: 'Everything you need to never drop a lead.',
        items: [
          { icon: Inbox, title: 'One place for every lead', body: 'WhatsApp chats, form submissions, ad leads and emails land in one list, tagged by source.' },
          { icon: GitBranch, hue: 'orchid', title: 'Custom pipeline stages', body: 'Stages that match how your team sells. Rename, reorder and drag deals between them.' },
          { icon: Filter, hue: 'sky', title: 'Saved views & filters', body: 'Views per rep, per source or per stage. Find the right leads in two clicks.' },
          { icon: Bell, hue: 'sun', title: 'Automatic assignment', body: 'Round-robin or rules-based. New leads reach the right person straight away.' },
          { icon: Copy, hue: 'coral', title: 'Duplicate detection', body: 'The same phone number or email arriving twice is flagged so you can merge it.' },
          { icon: History, hue: 'mint', title: 'Activity timeline', body: 'Messages, notes, emails and stage changes, logged on the lead automatically.' },
        ],
      }}
      rows={[
        { id: 'capture', eyebrow: 'Capture', title: 'Leads arrive ready to work.', body: 'Connect your website forms, Facebook and Instagram Lead Ads and WhatsApp number. Every new lead is created with its source, message and contact details — no copying and pasting.', bullets: ['Website forms and webhooks', 'Facebook & Instagram Lead Ads', 'WhatsApp and email conversations', 'CSV import for existing lists'], art: <SourcesMock /> },
        { id: 'team', eyebrow: 'Team management', title: 'Built for teams who close together.', body: 'Roles and permissions that match your organisation, shared visibility into the pipeline and assignment rules that keep workloads fair.', bullets: ['Admin, manager and member roles', 'Lead ownership and reassignment', 'Shared views and saved filters', 'Notes and mentions on every lead'], art: <PipelineMock /> },
      ]}
    />
  );
}

export function WhatsAppAutomation() {
  return (
    <FeaturePage
      k="p.whatsapp"
      eyebrow="Product · WhatsApp"
      title="Your team’s WhatsApp, organised and on time."
      lead="Flazyn is built for the official WhatsApp Business Platform. Share one business number across your team, reply fast and keep every chat linked to the lead."
      heroArt={<ChatMock />}
      capabilities={{
        eyebrow: 'Capabilities',
        title: 'WhatsApp that works like a team tool.',
        items: [
          { icon: MessageCircle, hue: 'mint', title: 'Shared team inbox', body: 'Everyone replies from one business number, with clear ownership of each conversation.' },
          { icon: UsersRound, title: 'Linked to the lead', body: 'Every chat sits on the lead record next to notes, stage and history.' },
          { icon: FileCheck2, hue: 'orchid', title: 'Approved templates', body: 'Use Meta-approved templates to start conversations and send updates.' },
          { icon: Clock, hue: 'sky', title: '24-hour window aware', body: 'See when a conversation window is open, and switch to templates when it closes.' },
          { icon: Tags, hue: 'sun', title: 'Quick replies & labels', body: 'Save answers to common questions and label chats by topic or priority.' },
          { icon: ShieldCheck, hue: 'coral', title: 'Consent & opt-out', body: 'Opt-in status is stored on each contact, and opt-outs are respected immediately.' },
        ],
      }}
      rows={[
        { eyebrow: 'Respond first', title: 'Be the first reply, every time.', body: 'Speed wins conversations. Flazyn puts new WhatsApp messages in front of the right person and can send a helpful template first, so no enquiry waits until tomorrow.', bullets: ['Instant routing to the right teammate', 'Template-based first replies', 'Reminders for chats waiting on you'], art: <ChatMock lines={[{ in: true, t: 'Hello, can you share your price list?' }, { in: false, t: 'Hi! Thanks for your message 👋 Here is our latest price list. Would you like a quick call to find the right option?' }]} /> },
        { eyebrow: 'Policy-first', title: 'Designed around Meta’s rules.', body: 'The WhatsApp Business Platform has clear rules on consent, templates and messaging windows. Flazyn makes following them the default, which protects your number’s quality rating and your customers’ trust.', bullets: ['Only message contacts who opted in', 'Templates outside the 24-hour window', 'Opt-out handling built in'], art: <FlowMock /> },
      ]}
      faq={[
        { q: 'Do I need a WhatsApp Business Platform account?', a: 'Yes. Flazyn connects to the official WhatsApp Business Platform (Cloud API) from Meta. We will guide early-access customers through connecting their number.' },
        { q: 'Can several teammates use one WhatsApp number?', a: 'Yes. That is one of the main reasons teams use Flazyn: a shared inbox for your business number with clear ownership of each chat.' },
        { q: 'Does Flazyn send messages without consent?', a: 'No. Flazyn is designed so you only message people who opted in to hear from your business, and opt-outs are honoured immediately.' },
      ]}
    />
  );
}

export function EmailSystem() {
  return (
    <FeaturePage
      k="p.email"
      eyebrow="Product · Email"
      title="Email campaigns, right inside your CRM."
      lead="Send broadcasts and follow-ups to segments built from your live pipeline. No exporting lists, no separate email tool."
      heroArt={<EmailMock />}
      capabilities={{
        eyebrow: 'Capabilities',
        title: 'Everything you need to send better email.',
        items: [
          { icon: Target, hue: 'coral', title: 'Live segments', body: 'Target leads by stage, source, owner or activity. Segments update as your pipeline moves.' },
          { icon: LayoutTemplate, title: 'Reusable templates', body: 'Save layouts and messages your team can reuse and personalise.' },
          { icon: SplitIcon, hue: 'orchid', title: 'Personalisation', body: 'Merge names, companies and custom fields into every message.' },
          { icon: Gauge, hue: 'sky', title: 'Engagement tracking', body: 'See opens, clicks and replies on the lead’s timeline.' },
          { icon: ListChecks, hue: 'mint', title: 'Unsubscribe handling', body: 'Every campaign includes an unsubscribe link, and preferences are respected automatically.' },
          { icon: Mail, hue: 'sun', title: 'One-to-one email', body: 'Send individual emails from the lead record and keep the thread in one place.' },
        ],
      }}
    />
  );
}

export function Automations() {
  return (
    <FeaturePage
      k="p.automations"
      eyebrow="Product · Automations"
      title="Follow-up that happens on its own."
      lead="Route new leads, send the first reply and create reminders automatically — so your team spends time on conversations, not admin."
      heroArt={<FlowMock />}
      capabilities={{
        eyebrow: 'Capabilities',
        title: 'Simple rules. Big time savings.',
        items: [
          { icon: Workflow, hue: 'orchid', title: 'Trigger → action rules', body: 'When something happens, do something. Built with a few clicks, no code.' },
          { icon: Megaphone, title: 'Facebook & Instagram Lead Ads', body: 'Send ad leads straight into your pipeline with their answers attached.' },
          { icon: Globe, hue: 'sky', title: 'Website forms', body: 'Capture enquiries from your site, including WordPress forms, as new leads.' },
          { icon: Webhook, hue: 'sun', title: 'Webhooks', body: 'Connect Flazyn to the tools you already use with inbound and outbound webhooks.' },
          { icon: Timer, hue: 'coral', title: 'Follow-up reminders', body: 'Create tasks when a lead goes quiet, so nobody is forgotten.' },
          { icon: UsersRound, hue: 'mint', title: 'Smart assignment', body: 'Assign by round-robin, source or territory.' },
        ],
      }}
    />
  );
}

export function Analytics() {
  return (
    <FeaturePage
      k="p.analytics"
      eyebrow="Product · Analytics"
      title="Know what’s working — and what to do next."
      lead="Clear reports on response times, sources and pipeline health, so your team knows where to focus."
      heroArt={<ChartMock />}
      capabilities={{
        eyebrow: 'Reports',
        title: 'The numbers that actually move deals.',
        items: [
          { icon: Timer, hue: 'mint', title: 'Response time', body: 'How quickly your team replies to new leads, by person and by channel.' },
          { icon: BarChart3, title: 'Leads by source', body: 'See which channels bring leads — and which bring customers.' },
          { icon: TrendingUp, hue: 'sky', title: 'Pipeline health', body: 'Deals by stage, value and age, with stuck deals highlighted.' },
          { icon: Activity, hue: 'orchid', title: 'Team activity', body: 'Conversations, follow-ups and wins across your team.' },
          { icon: Target, hue: 'coral', title: 'Conversion rates', body: 'Stage-to-stage conversion so you can fix the leaks in your funnel.' },
          { icon: Download, hue: 'sun', title: 'Export', body: 'Download reports as CSV whenever you need them.' },
        ],
      }}
    />
  );
}
