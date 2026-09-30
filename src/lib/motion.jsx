// ═══════════════════════════════════════════════════════════════════
// FLAZYN — MOTION PRIMITIVES
// Scroll reveals use whileInView + once, so each element animates a
// single time. Only transform/opacity are animated. Everything
// short-circuits to static output under prefers-reduced-motion.
// ═══════════════════════════════════════════════════════════════════
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_POP = [0.34, 1.56, 0.64, 1];
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' };

const VARIANTS = {
  // Every entrance is a 3D move: flip up, swing in from the side, or pop forward.
  up: { hidden: { opacity: 0, y: 36, rotateX: 28, transformPerspective: 900 }, show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: EASE } } },
  pop: { hidden: { opacity: 0, y: 30, z: -120, rotateX: 22, transformPerspective: 900 }, show: { opacity: 1, y: 0, z: 0, rotateX: 0, transition: { duration: 0.75, ease: EASE } } },
  left: { hidden: { opacity: 0, x: -50, rotateY: 24, transformPerspective: 1200 }, show: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: EASE } } },
  right: { hidden: { opacity: 0, x: 50, rotateY: -24, transformPerspective: 1200 }, show: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: EASE } } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease: EASE } } },
};

/* <Reveal> single element, or <Reveal stagger> + <RevealItem> children. */
export function Reveal({ as = 'div', variant = 'up', stagger = 0, delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) return <Tag {...rest}>{children}</Tag>;
  const variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : { hidden: VARIANTS[variant].hidden, show: { ...VARIANTS[variant].show, transition: { ...VARIANTS[variant].show.transition, delay } } };
  return (
    <Tag initial="hidden" whileInView="show" viewport={VIEWPORT} variants={variants} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', variant = 'up', children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) return <Tag {...rest}>{children}</Tag>;
  return <Tag variants={VARIANTS[variant]} {...rest}>{children}</Tag>;
}

/* Tilt — card leans toward the pointer in 3D. */
export function Tilt({ children, max = 8, className = '', style, ...rest }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  if (reduce) return <div className={className} style={style} {...rest}>{children}</div>;
  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ ...style, rotateX: srx, rotateY: sry, transformPerspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ScrollTilt — the product window starts tilted back in 3D and
   straightens as it scrolls into view. */
export function ScrollTilt({ children, className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ rotateX, scale, y, transformPerspective: 2000 }}>
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  if (reduce) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* PageTransition — skipped on the very first (server-rendered) paint so
   prerendered content is visible immediately; fades in on later
   client-side navigations. */
let firstPaint = true;
export function PageTransition({ children }) {
  const reduce = useReducedMotion();
  const skip = useRef(typeof window === 'undefined' || firstPaint || reduce).current;
  useEffect(() => { firstPaint = false; }, []);
  return (
    <motion.div initial={skip ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      {children}
    </motion.div>
  );
}
