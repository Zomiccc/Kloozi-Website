// ═══════════════════════════════════════════════════════════════════
// ZOMIC MASCOT — "Zo"
//
// An ORIGINAL character. Not monday's llama.
// Style brief (per request): faded, single-tone. The whole character is
// drawn in tints of ONE hue (lavender) — no multi-colour blocks, no
// bright accents. Depth comes from tonal value only, which gives the
// soft, faded, premium look rather than a cartoon sticker.
//
// Concept: a rounded, friendly creature whose head IS a speech bubble —
// representing "a conversation becoming a customer." Long soft ears give
// it personality and something to animate.
//
// Every part is a separate SVG group so it can be animated
// independently: ears sway, body breathes, eyes blink, head tilts.
// ═══════════════════════════════════════════════════════════════════

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_BOUNCY, EASE_SOFT } from '../lib/motion.jsx';

/* Single-hue tonal ramp — this is what creates the "faded, no colours"
   look. Every value is the same lavender at a different lightness. */
const T = {
  t100: '#F1EDFF', // lightest — highlights
  t200: '#E2DAFB',
  t300: '#CFC4F5', // body base
  t400: '#B9AAEC',
  t500: '#9F8DDF', // shading
  t600: '#8271C4',
  t700: '#61529A', // features / eyes
  t800: '#443A6B',
};

/* mood: 'idle' | 'wave' | 'celebrate' | 'peek' | 'think'
   Each mood changes which secondary animations run, so the same
   character feels different in different places on the site. */
export default function Mascot({
  size = 120,
  mood = 'idle',
  className = '',
  /* seed lets each instance desync its idle loops from the others, so
     multiple mascots on one page never move in lockstep */
  seed = 0,
}) {
  const reduce = useReducedMotion();
  const uid = `zo${size}${mood}${seed}`;

  /* stagger all loops by the seed so instances feel independent */
  const off = (seed % 5) * 0.37;

  /* ── Body breathing — gentle vertical squash, anchored at the feet ── */
  const breathe = reduce ? {} : {
    animate: { scaleY: [1, 1.035, 1], scaleX: [1, 0.985, 1] },
    transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: off },
  };

  /* ── Ear sway — the ears lag behind the body, like soft fabric ── */
  const earL = reduce ? {} : {
    animate: { rotate: [0, -7, 2, 0] },
    transition: { duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: off },
  };
  const earR = reduce ? {} : {
    animate: { rotate: [0, 6, -3, 0] },
    transition: { duration: 4.9, repeat: Infinity, ease: 'easeInOut', delay: off + 0.4 },
  };

  /* ── Blink — eyes squash to a line briefly, then snap back.
        `times` places the blink in a narrow window so most of the loop
        is spent open. ── */
  const blink = reduce ? {} : {
    animate: { scaleY: [1, 1, 0.08, 1, 1] },
    transition: {
      duration: mood === 'think' ? 3.2 : 4.6,
      repeat: Infinity,
      times: [0, 0.52, 0.56, 0.6, 1],
      ease: 'easeInOut',
      delay: off,
    },
  };

  /* ── Head tilt — tiny rotation, makes the character feel attentive ── */
  const headTilt = reduce ? {} : {
    animate: { rotate: mood === 'think' ? [0, 3.5, 0] : [0, -1.8, 1.8, 0] },
    transition: { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: off },
  };

  /* ── Wave — the arm swings, with overshoot easing for cartoon snap ── */
  const wave = reduce ? {} : {
    animate: { rotate: [0, -26, 14, -18, 8, 0] },
    transition: { duration: 1.7, repeat: Infinity, repeatDelay: 1.8, ease: EASE_BOUNCY, delay: off },
  };

  /* ── Celebrate — small hop, squash on landing ── */
  const hop = reduce ? {} : {
    animate: { y: [0, -9, 0], scaleY: [1, 1.06, 0.94, 1] },
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1.1, ease: EASE_BOUNCY, delay: off },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Zo, the Zomic mascot"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* soft tonal gradient — light at top, deeper at the base */}
        <linearGradient id={`${uid}-body`} x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor={T.t200} />
          <stop offset="55%" stopColor={T.t300} />
          <stop offset="100%" stopColor={T.t400} />
        </linearGradient>
        <linearGradient id={`${uid}-ear`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.t300} />
          <stop offset="100%" stopColor={T.t500} />
        </linearGradient>
        {/* inner glow so the face area reads slightly lighter */}
        <radialGradient id={`${uid}-face`} cx="0.5" cy="0.42" r="0.62">
          <stop offset="0%" stopColor={T.t100} stopOpacity="0.95" />
          <stop offset="100%" stopColor={T.t100} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── ground shadow — breathes in sync with the body ── */}
      <motion.ellipse
        cx="60" cy="120" rx="27" ry="5"
        fill={T.t700} opacity="0.16"
        animate={reduce ? {} : { scaleX: [1, 0.93, 1], opacity: [0.16, 0.11, 0.16] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: off }}
        style={{ originX: '60px', originY: '120px' }}
      />

      {/* ══ whole character hops together on celebrate ══ */}
      <motion.g {...(mood === 'celebrate' ? hop : {})} style={{ originX: '60px', originY: '120px' }}>

        {/* ── legs — simple soft stubs ── */}
        <rect x="47" y="102" width="10" height="16" rx="5" fill={T.t500} />
        <rect x="63" y="102" width="10" height="16" rx="5" fill={T.t500} />

        {/* ══ BODY — breathes ══ */}
        <motion.g {...breathe} style={{ originX: '60px', originY: '118px' }}>
          {/* torso */}
          <path
            d="M38 78c0-11 9.9-20 22-20s22 9 22 20v14c0 8.3-9.9 15-22 15s-22-6.7-22-15V78z"
            fill={`url(#${uid}-body)`}
          />
          {/* belly highlight — tonal, keeps it single-hue */}
          <ellipse cx="60" cy="88" rx="12" ry="14" fill={T.t100} opacity="0.4" />

          {/* ── waving arm (wave + celebrate moods) ── */}
          {(mood === 'wave' || mood === 'celebrate') ? (
            <motion.g {...wave} style={{ originX: '40px', originY: '82px' }}>
              <path d="M40 80c-7 -3 -13 -9 -14 -17" stroke={T.t500} strokeWidth="8" strokeLinecap="round" fill="none" />
              <circle cx="25" cy="61" r="6" fill={T.t400} />
            </motion.g>
          ) : (
            <path d="M40 82c-6 2 -10 7 -11 13" stroke={T.t500} strokeWidth="8" strokeLinecap="round" fill="none" />
          )}
          {/* resting arm on the other side */}
          <path d="M80 82c6 2 10 7 11 13" stroke={T.t500} strokeWidth="8" strokeLinecap="round" fill="none" />
        </motion.g>

        {/* ══ HEAD — a speech bubble. Tilts gently. ══ */}
        <motion.g {...headTilt} style={{ originX: '60px', originY: '66px' }}>

          {/* ── ears — sway independently ── */}
          <motion.g {...earL} style={{ originX: '44px', originY: '30px' }}>
            <path d="M44 32c-3-11 -1-21 3-24 4 3 6 13 3 24z" fill={`url(#${uid}-ear)`} />
          </motion.g>
          <motion.g {...earR} style={{ originX: '76px', originY: '30px' }}>
            <path d="M76 32c3-11 1-21 -3-24 -4 3 -6 13 -3 24z" fill={`url(#${uid}-ear)`} />
          </motion.g>

          {/* speech-bubble head */}
          <path
            d="M28 44c0-11.6 9.4-21 21-21h22c11.6 0 21 9.4 21 21v14c0 11.6-9.4 21-21 21H56l-13 10.5V79h-1c-9.9 0-18-8.1-18-18V44z"
            fill={`url(#${uid}-body)`}
          />
          {/* face light pool */}
          <ellipse cx="60" cy="52" rx="26" ry="22" fill={`url(#${uid}-face)`} />

          {/* ── eyes — blink together ── */}
          <motion.g {...blink} style={{ originY: '53px' }}>
            <ellipse cx="50" cy="53" rx="4.4" ry="5.6" fill={T.t700} />
            <ellipse cx="70" cy="53" rx="4.4" ry="5.6" fill={T.t700} />
            {/* catchlights — tonal white-lavender, keeps the palette */}
            <circle cx="51.6" cy="51.2" r="1.5" fill={T.t100} />
            <circle cx="71.6" cy="51.2" r="1.5" fill={T.t100} />
          </motion.g>

          {/* cheeks — same hue, just deeper. No pink. */}
          <ellipse cx="42" cy="62" rx="4.5" ry="3" fill={T.t400} opacity="0.75" />
          <ellipse cx="78" cy="62" rx="4.5" ry="3" fill={T.t400} opacity="0.75" />

          {/* mouth — changes per mood */}
          {mood === 'think' ? (
            <path d="M54 65h9" stroke={T.t700} strokeWidth="2.4" strokeLinecap="round" />
          ) : mood === 'celebrate' ? (
            <path d="M53 63c1.8 4.4 5.4 6.6 9 6.6s7.2-2.2 9-6.6c-3 1.4-6 2-9 2s-6-.6-9-2z" fill={T.t700} />
          ) : (
            <path d="M54 64.5c1.9 2.6 4.1 3.9 6.5 3.9s4.6-1.3 6.5-3.9"
              stroke={T.t700} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          )}
        </motion.g>
      </motion.g>

      {/* ── thought dots for 'think' — fade in sequence ── */}
      {mood === 'think' && !reduce && (
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={92 + i * 8} cy={28 - i * 5} r={2.4 + i * 0.7}
              fill={T.t400}
              animate={{ opacity: [0.15, 1, 0.15] }}
              transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.28 + off, ease: 'easeInOut' }}
            />
          ))}
        </g>
      )}

      {/* ── celebrate sparks — tonal, not multicolour ── */}
      {mood === 'celebrate' && !reduce && (
        <g>
          {[
            { x: 22, y: 26, d: 0 },
            { x: 96, y: 34, d: 0.5 },
            { x: 88, y: 12, d: 0.9 },
          ].map((s, i) => (
            <motion.path
              key={i}
              d={`M${s.x} ${s.y}l1.7 4.3 4.3 1.7-4.3 1.7-1.7 4.3-1.7-4.3-4.3-1.7 4.3-1.7z`}
              fill={T.t300}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.15, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: s.d + off, ease: 'easeInOut' }}
              style={{ originX: `${s.x}px`, originY: `${s.y}px` }}
            />
          ))}
        </g>
      )}
    </motion.svg>
  );
}
