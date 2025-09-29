import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        accent: "hsl(var(--accent))",
        primary: "hsl(var(--primary))",
        surface: "hsl(var(--surface))",
        'text-primary': "hsl(var(--text-primary))",
        'text-secondary': "hsl(var(--text-secondary))",

        /* Legacy compatibility */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 15%, 15%, 0.08)',
        modal: '0 12px 32px hsla(220, 15%, 15%, 0.12)',
      },
      transitionDuration: {
        base: '200ms',
        fast: '100ms',
        slow: '400ms',
      },
      fontSize: {
        caption: ['14px', { lineHeight: '20px', fontWeight: '500' }],
        body: ['16px', { lineHeight: '24px', fontWeight: 'normal' }],
        heading: ['20px', { lineHeight: '28px', fontWeight: 'semibold' }],
        display: ['36px', { lineHeight: '44px', fontWeight: 'bold' }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
