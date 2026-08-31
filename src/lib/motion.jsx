// ═══════════════════════════════════════════════════════════════════
// ZOMIC MARKETING — MOTION SYSTEM
//
// Every animation on the site is driven from this file. All primitives
// use Framer Motion's `whileInView` + `viewport={{ once: true }}` so
// elements animate exactly once, on first scroll into view.
//
// Signature easing: EASE_BOUNCY = [0.34, 1.56, 0.64, 1]
//   The second control point (1.56) overshoots past 1, so animations
//   settle with a small pop instead of a flat corporate fade.
//
// Every primitive short-circuits to static output when the user has
// prefers-reduced-motion enabled.
// ═══════════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, Children } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
  useReducedMotion,
} from 'framer-motion';

/* ─── Easing curves ─── */
export const EASE_BOUNCY = [0.34, 1.56, 0.64, 1];
export const EASE_SOFT = [0.22, 1, 0.36, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

/* ─── Shared viewport config — animate once, never re-trigger ─── */
export const VIEWPORT_ONCE = { once: true, margin: '-8% 0px -8% 0px' };

/* ─── Variant library ───
   Each entry is a hidden→show pair. `hidden` is the pre-animation state,
   `show` is the final state plus its own transition timing. */
export const V = {
  /* text: opacity 0→1, y 24→0, 600ms bouncy */
  text: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_BOUNCY } },
  },
  /* image: opacity 0→1, scale 0.92→1, 700ms bouncy */
  image: {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_BOUNCY } },
  },
  /* icon: adds a -8deg→0 rotate for personality */
  icon: {
    hidden: { opacity: 0, y: 16, rotate: -8 },
    show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.55, ease: EASE_BOUNCY } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: EASE_SOFT } },
  },
  /* cards "come together" — slide in from either side */
  fromLeft: {
    hidden: { opacity: 0, x: -56 },
    show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_BOUNCY } },
  },
  fromRight: {
    hidden: { opacity: 0, x: 56 },
    show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE_BOUNCY } },
  },
  /* cards scale up from 0.8 with a pop */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE_BOUNCY } },
  },
  /* blur-in — premium feel for big headings */
  blurUp: {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
  },
};

/* ─── staggerContainer — parent variant that offsets its children ─── */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/* ═══════════════════════════════════════════════════════════════════
   Reveal — the workhorse scroll-reveal wrapper.
   Uses whileInView + viewport={{ once: true }}.

   <Reveal>                       single element, text variant
   <Reveal variant="image">       scale entrance
   <Reveal stagger={0.08}>        children animate 80ms apart
   ═══════════════════════════════════════════════════════════════════ */
export function Reveal({
  children,
  as = 'div',
  variant = 'text',
  delay = 0,
  stagger = 0,
  className = '',
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className} style={style} {...rest}>{children}</Tag>;
  }

  /* Stagger mode: this element becomes a variant container. Its
     RevealItem children inherit `show` and fire N ms apart. */
  if (stagger) {
    return (
      <MotionTag
        className={className}
        style={style}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_ONCE}
        variants={staggerContainer(stagger, delay)}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  const v = V[variant] || V.text;
  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: v.hidden,
        show: { ...v.show, transition: { ...v.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ─── RevealItem — child of <Reveal stagger={...}> ───
   Inherits the `show` state from its parent container, so its timing is
   controlled by the parent's staggerChildren. */
export function RevealItem({ children, variant = 'text', className = '', as = 'div', style, ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  if (reduce) {
    const Tag = as;
    return <Tag className={className} style={style}>{children}</Tag>;
  }
  return (
    <MotionTag className={className} style={style} variants={V[variant] || V.text} {...rest}>
      {children}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CountUp — stat numbers tick 0→value on scroll into view.
   1200ms, ease-out. Uses framer-motion's imperative `animate()`.
   ═══════════════════════════════════════════════════════════════════ */
export function CountUp({ to, suffix = '', prefix = '', duration = 1.4, decimals = 0, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduce]);

  const display = decimals > 0
    ? val.toFixed(decimals)
    : Math.round(val).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Float — ambient idle motion. translateY oscillates ±range over a
   `duration` loop using repeatType "mirror" so it eases both ways.
   This is what makes the hero feel alive with no user input.
   ═══════════════════════════════════════════════════════════════════ */
export function Float({ children, className = '', range = 6, duration = 5, delay = 0, style }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [range, -range] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Blob — soft decorative background shape with organic drift.
   Each blob gets its own duration/delay so they never sync up. ─── */
export function Blob({ className = '', color = 'var(--accent)', size = 320, duration = 18, delay = 0, style = {} }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      className={`blob ${className}`}
      style={{ width: size, height: size, background: color, ...style }}
      animate={{
        x: [0, 22, -16, 0],
        y: [0, -14, 12, 0],
        scale: [1, 1.06, 0.96, 1],
      }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SquashBounce — mascot reaction on scroll into view.
   Enters with a squash (scaleY 0.8 / scaleX 1.15) that springs back to
   1/1, giving a cartoon "landing" feel rather than a rigid fade.
   ═══════════════════════════════════════════════════════════════════ */
export function SquashBounce({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, scaleY: 0.78, scaleX: 1.18 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: EASE_BOUNCY, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ScrollProgress — thin accent bar at the very top of the viewport
   that fills as you scroll. useScroll gives scrollYProgress (0→1),
   piped through a spring so it feels fluid rather than jumpy.
   ═══════════════════════════════════════════════════════════════════ */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  if (reduce) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* ═══════════════════════════════════════════════════════════════════
   Marquee — infinite horizontal scroll for logo strips.
   Renders the children twice back-to-back and animates x from 0 to
   -50%, so the loop is seamless. Pauses on hover.
   ═══════════════════════════════════════════════════════════════════ */
export function Marquee({ children, duration = 28, reverse = false, className = '' }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={`marquee-static ${className}`}>{children}</div>;
  }
  return (
    <div className={`marquee ${className}`}>
      <motion.div
        className="marquee-track"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Magnetic — button/element that leans toward the cursor.
   Tracks pointer offset from the element centre, divides it down, and
   feeds it into a spring so the element drifts a few px toward the
   mouse then springs back on leave.
   ═══════════════════════════════════════════════════════════════════ */
export function Magnetic({ children, className = '', strength = 0.25, style }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 });
  const sy = useSpring(y, { stiffness: 260, damping: 18 });

  if (reduce) return <div className={className} style={style}>{children}</div>;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Spotlight — card that renders a soft radial glow following the
   cursor. Two motion values track the pointer position inside the
   card and drive a radial-gradient background on an overlay layer.
   Combined with the -6px hover lift this is the "alive" card feel.
   ═══════════════════════════════════════════════════════════════════ */
export function Spotlight({ children, className = '', lift = -6, style }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bg = useTransform(
    [mx, my],
    ([px, py]) => `radial-gradient(420px circle at ${px}% ${py}%, rgba(201,187,255,0.22), transparent 65%)`
  );

  if (reduce) return <div className={className} style={style}>{children}</div>;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight ${className}`}
      style={style}
      onMouseMove={onMove}
      whileHover={{ y: lift }}
      transition={{ duration: 0.24, ease: EASE_SOFT }}
    >
      <motion.span className="spotlight-glow" style={{ background: bg }} aria-hidden="true" />
      <span className="spotlight-inner">{children}</span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WordReveal — splits a headline into words and animates each one up
   from below with a blur, 40ms apart. Far more premium than fading a
   whole paragraph as one block.
   ═══════════════════════════════════════════════════════════════════ */
export function WordReveal({ text, className = '', as = 'h1', stagger = 0.04, delay = 0, onLoad = false }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.h1;
  const words = String(text).split(' ');

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  /* onLoad=true → animate immediately (hero). Otherwise scroll-trigger. */
  const trigger = onLoad
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: VIEWPORT_ONCE };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...trigger}
      variants={staggerContainer(stagger, delay)}
    >
      {words.map((w, i) => (
        <span key={i} className="word-mask">
          <motion.span
            className="word"
            variants={{
              hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
              show: { opacity: 1, y: '0em', filter: 'blur(0px)', transition: { duration: 0.62, ease: EASE_OUT } },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Parallax — moves a layer at a different rate than the scroll.
   useScroll tracks the element's own progress through the viewport,
   then useTransform maps 0→1 onto a pixel offset.
   ═══════════════════════════════════════════════════════════════════ */
export function Parallax({ children, className = '', distance = 60, style }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

/* ─── TiltCard — subtle 3D tilt toward the cursor (perspective) ─── */
export function TiltCard({ children, className = '', max = 8, style }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  if (reduce) return <div className={className} style={style}>{children}</div>;

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ButtonHover — scale 1.03 on hover, 0.97 on press ─── */
export function ButtonHover({ children, className = '', ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <button className={className} {...rest}>{children}</button>;
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: EASE_SOFT }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ─── HoverLift — card lift + shadow deepen on hover ─── */
export function HoverLift({ children, className = '', lift = -6, style }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      whileHover={{ y: lift, boxShadow: '0 20px 44px rgba(122,111,203,0.18)' }}
      transition={{ duration: 0.22, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}

/* ─── PageTransition — route change fade + slight scale, 300ms ─── */
export function PageTransition({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
