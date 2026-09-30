// ProductDemo — an interactive, illustrative Flazyn workspace. One lead
// travels through the pipeline while the conversation panel updates.
// Auto-plays while visible; any step click takes manual control.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  LayoutGrid, Users, MessageCircle, Mail, Workflow, BarChart3, Lock, Check, CheckCheck,
  Pause, Play, Sparkles, Clock,
} from 'lucide-react';
import { LogoMark } from './Logo.jsx';
import { EASE } from '../lib/motion.jsx';

const STAGES = [
  { label: 'New lead', dot: '#b3afca' },
  { label: 'Contacted', dot: '#3b9bff' },
  { label: 'Qualified', dot: '#b04bff' },
  { label: 'Won', dot: '#16c79a' },
];

const STEPS = [
  { label: 'Capture', event: 'Captured from website form', next: 'Send a first reply', score: 35, pipeline: '$48,200', replies: '—',
    msgs: [{ in: true, text: 'Hi! Do you have a plan for a team of 8? We’d like to see a demo.', meta: 'Website form · 10:02' }] },
  { label: 'Reply', event: 'Replied on WhatsApp in 1 min', next: 'Book a discovery call', score: 62, pipeline: '$48,200', replies: '1 min',
    msgs: [
      { in: true, text: 'Hi! Do you have a plan for a team of 8? We’d like to see a demo.', meta: 'Website form · 10:02' },
      { in: false, text: 'Hi Maya, thanks for reaching out! Would Thursday at 3pm work for a quick demo?', meta: 'Sarah · 10:03' },
    ] },
  { label: 'Qualify', event: 'Demo done · proposal viewed', next: 'Follow up on the proposal', score: 84, pipeline: '$48,200', replies: '1 min',
    msgs: [
      { in: false, text: 'Here’s the proposal we discussed — happy to walk through it.', meta: 'Sarah · Thu 16:20' },
      { in: true, text: 'The team loved the demo. Reviewing it now!', meta: 'Maya · Thu 17:05' },
    ] },
  { label: 'Win', event: 'Deal marked as won', next: 'Start onboarding', score: 100, pipeline: '$35,800', replies: '1 min',
    msgs: [
      { in: true, text: 'Everything looks great — we’re ready to go!', meta: 'Maya · Mon 09:12' },
      { in: false, text: 'Wonderful! Welcome aboard, Maya. Your onboarding call is booked.', meta: 'Sarah · Mon 09:14' },
    ] },
];

const OTHERS = [
  [{ n: 'James Wilson', c: 'Forma Studio', v: '$4,800', bg: '#ffb62e' }],
  [{ n: 'Sofia Chen', c: 'Orbit Design', v: '$8,200', bg: '#3b9bff' }],
  [{ n: 'Oliver Reed', c: 'Reed & Co.', v: '$6,400', bg: '#b04bff' }],
  [{ n: 'Alex Morgan', c: 'Evergreen', v: '$9,600', bg: '#16c79a' }],
];

const initials = (n) => n.split(' ').map((p) => p[0]).join('');

export default function ProductDemo() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const visible = useInView(ref, { amount: 0.35 });
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const auto = playing && visible && !reduce;
  const cur = STEPS[step];

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4200);
    return () => clearInterval(id);
  }, [auto]);

  const pick = (i) => { setStep(i); setPlaying(false); };
  const fade = reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3, ease: EASE } };

  return (
    <div ref={ref}>
      <div className="demo-window">
        <div className="demo-chrome">
          <div className="demo-dots"><i /><i /><i /></div>
          <div className="demo-url"><Lock size={11} /> app.flazyn.com/pipeline</div>
          <span className="demo-sample"><i /> Sample data</span>
        </div>
        <div className="demo-body">
          <aside className="demo-side" aria-hidden="true">
            <div className="demo-side-brand"><LogoMark /> Flazyn</div>
            <div className="demo-nav"><LayoutGrid size={16} /> Overview</div>
            <div className="demo-nav on"><Users size={16} /> Pipeline <b>12</b></div>
            <div className="demo-nav"><MessageCircle size={16} /> Inbox <b>3</b></div>
            <div className="demo-nav"><Mail size={16} /> Campaigns</div>
            <div className="demo-nav"><Workflow size={16} /> Automations</div>
            <div className="demo-nav"><BarChart3 size={16} /> Reports</div>
          </aside>

          <div className="demo-main">
            <div className="demo-head">
              <div><h3>Sales pipeline</h3><p>Northwind team · this month</p></div>
            </div>
            <div className="demo-kpis">
              <div className="demo-kpi"><span>Open pipeline</span><strong>{cur.pipeline}</strong></div>
              <div className="demo-kpi"><span>First reply</span><strong>{cur.replies}</strong></div>
              <div className="demo-kpi"><span>Won</span><strong>{step === 3 ? '$12,400' : '$0'}</strong></div>
            </div>
            <LayoutGroup id="demo">
              <div className="demo-board">
                {STAGES.map((st, i) => (
                  <div key={st.label} className={`demo-col ${step === i ? 'on' : ''}`}>
                    <div className="demo-col-head"><span><i style={{ background: st.dot }} />{st.label}</span><b>{step === i ? 2 : 1}</b></div>
                    <div className="demo-cards">
                      {step === i && (
                        <motion.div
                          layoutId="lead"
                          className={`demo-card ${i === 3 ? 'won' : 'hero-card'}`}
                          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 24 }}
                        >
                          <div className="demo-person">
                            <span className="avatar" style={{ background: 'linear-gradient(135deg,#7a5cff,#ff6b4a)' }}>MP</span>
                            <span style={{ minWidth: 0 }}><strong>Maya Patel</strong><small>Northwind Studio</small></span>
                          </div>
                          <div className="demo-card-foot"><strong>$12,400</strong>{i === 3 ? <span className="badge badge-mint"><Check size={12} /> Won</span> : <span className="badge"><MessageCircle size={12} /> {i + 1}</span>}</div>
                          <div className="demo-card-event"><CheckCheck size={12} /> {cur.event}</div>
                        </motion.div>
                      )}
                      {OTHERS[i].map((o) => (
                        <div className="demo-card" key={o.n}>
                          <div className="demo-person">
                            <span className="avatar" style={{ background: o.bg }}>{initials(o.n)}</span>
                            <span style={{ minWidth: 0 }}><strong>{o.n}</strong><small>{o.c}</small></span>
                          </div>
                          <div className="demo-card-foot"><strong>{o.v}</strong></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </LayoutGroup>
          </div>

          <div className="demo-chat">
            <div className="demo-chat-head">
              <span className="avatar" style={{ background: 'linear-gradient(135deg,#7a5cff,#ff6b4a)' }}>MP</span>
              <span><strong>Maya Patel</strong><small><MessageCircle size={12} color="#16c79a" /> WhatsApp · {STAGES[step].label}</small></span>
            </div>
            <div className="demo-msgs" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                {cur.msgs.map((m) => (
                  <motion.div key={step + m.text} className={`msg ${m.in ? 'msg-in' : 'msg-out'}`} {...fade}>
                    {m.text}
                    <small>{m.meta}{!m.in && <CheckCheck size={12} color="#3b9bff" />}</small>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="demo-next">
              <span><Sparkles size={12} /> Next best action</span>
              <strong>{cur.next}</strong>
              <div className="demo-score" role="img" aria-label={`Engagement ${cur.score} of 100`}>
                <motion.i animate={{ width: `${cur.score}%` }} initial={false} transition={{ duration: reduce ? 0 : 0.7, ease: EASE }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-controls">
        <div className="demo-steps" role="group" aria-label="Follow a lead through Flazyn">
          {STEPS.map((s, i) => (
            <button key={s.label} type="button" className={`demo-step ${step === i ? 'on' : ''}`} onClick={() => pick(i)} aria-pressed={step === i}>
              <span>{i < step ? <Check size={13} /> : i + 1}</span>{s.label}
            </button>
          ))}
        </div>
        {!reduce && (
          <button type="button" className="demo-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause demo' : 'Play demo'}>
            {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? 'Pause' : 'Play'}
          </button>
        )}
      </div>
      <p className="demo-caption"><Clock size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /> Illustrative preview with sample data. Flazyn is currently in early access.</p>
    </div>
  );
}
