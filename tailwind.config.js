/** @type {import('tailwindcss').Config} */
/* ZOMIC MARKETING — PASTEL SCANDI
   Reuses the product app's design system verbatim (color, type, radius,
   shadow) so the marketing site and the CRM feel like one company.
   Extended with marketing-only display type + bouncy motion easing. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F4F1FF',
          alt: '#EFEBFC',
          raised: '#FFFFFF',
        },
        surface: {
          page: '#F4F1FF',
          alt: '#EFEBFC',
          card: '#FFFFFF',
          border: '#E4DFF7',
        },
        ink: {
          DEFAULT: '#2B2640',
          primary: '#2B2640',
          secondary: '#8A7FB8',
          tertiary: '#B3AAD1',
        },
        hairline: {
          DEFAULT: '#E4DFF7',
          strong: '#D2C9F0',
        },
        accent: {
          DEFAULT: '#C9BBFF',
          deep: '#7A6FCB',
          hover: '#B6A5F5',
        },
        peach: { DEFAULT: '#FFD6A8', deep: '#B8763A' },
        mint: { DEFAULT: '#A8E6C1', deep: '#2F8D5B' },
        butter: { DEFAULT: '#FFE9A8', deep: '#A87B12' },
        coral: { DEFAULT: '#FFC2C2', deep: '#B84545' },
        sky: { DEFAULT: '#BFE3F5', deep: '#2E7BA6' },
        semantic: {
          success: '#A8E6C1',
          'success-deep': '#2F8D5B',
          warning: '#FFE9A8',
          'warning-deep': '#A87B12',
          danger: '#FFC2C2',
          'danger-deep': '#B84545',
          info: '#BFE3F5',
          'info-deep': '#2E7BA6',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        /* product app ramp */
        display: ['48px', { lineHeight: '1.15', fontWeight: '800', letterSpacing: '-0.01em' }],
        h1: ['28px', { lineHeight: '1.25', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['14px', { lineHeight: '1.6', fontWeight: '500' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
        label: ['11px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '0.05em' }],
        /* marketing-only display ramp (Part 4: 48-72px hero) */
        'hero-xl': ['72px', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.02em' }],
        'hero-lg': ['60px', { lineHeight: '1.08', fontWeight: '800', letterSpacing: '-0.02em' }],
        'section-lg': ['44px', { lineHeight: '1.12', fontWeight: '800', letterSpacing: '-0.015em' }],
        'section': ['34px', { lineHeight: '1.18', fontWeight: '700', letterSpacing: '-0.01em' }],
        'lead': ['19px', { lineHeight: '1.6', fontWeight: '500' }],
      },
      spacing: {
        micro: '4px',
        tight: '8px',
        default: '12px',
        gap: '16px',
        section: '24px',
        block: '32px',
        major: '48px',
        page: '64px',
      },
      borderRadius: {
        btn: '12px',
        input: '12px',
        card: '20px',
        row: '16px',
        modal: '24px',
        tile: '14px',
        pill: '999px',
        icon: '12px',
        tooltip: '10px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(122,111,203,0.06)',
        'card-hover': '0 8px 24px rgba(122,111,203,0.12)',
        dropdown: '0 8px 20px rgba(122,111,203,0.14)',
        modal: '0 24px 64px rgba(122,111,203,0.20)',
        focus: '0 0 0 4px rgba(201,187,255,0.25)',
        'mega': '0 24px 60px rgba(122,111,203,0.18)',
      },
      backgroundImage: {
        'hero-stat': 'linear-gradient(135deg, #C9BBFF 0%, #B6A5F5 100%)',
      },
      transitionTimingFunction: {
        /* Part 3.1 — the bouncy overshoot that gives monday-style motion its life */
        bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'slide-up': { '0%': { opacity: 0, transform: 'translateY(10px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'scale-in': { '0%': { opacity: 0, transform: 'scale(0.94)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'blob-drift': {
          '0%,100%': { transform: 'translate(0,0) rotate(0deg) scale(1)' },
          '33%': { transform: 'translate(18px,-12px) rotate(8deg) scale(1.05)' },
          '66%': { transform: 'translate(-14px,10px) rotate(-6deg) scale(0.97)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 220ms cubic-bezier(0.22,1,0.36,1)',
        'scale-in': 'scale-in 220ms cubic-bezier(0.22,1,0.36,1)',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
      },
      maxWidth: {
        read: '640px',
        shell: '1200px',
      },
    },
  },
  plugins: [],
};
