/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Background layers
                'bg-primary': '#0A0A0A',
                'bg-secondary': '#141414',
                'surface': '#1A1A1A',

                // Borders
                'border-subtle': 'rgba(255, 255, 255, 0.06)',
                'border-medium': 'rgba(255, 255, 255, 0.12)',

                // Text
                'text-primary': '#FFFFFF',
                'text-secondary': '#A0A0A0',
                'text-tertiary': '#666666',

                // Accent
                'accent-primary': '#DC2626',
                'accent-glow': 'rgba(220, 38, 38, 0.15)',

                // Legacy support (will phase out)
                primary: "#0A0A0A",
                secondary: "#141414",
                accent: "#DC2626",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Syne', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display': ['96px', { lineHeight: '88px', letterSpacing: '-0.02em', fontWeight: '700' }],
                'h1': ['64px', { lineHeight: '72px', letterSpacing: '-0.02em', fontWeight: '700' }],
                'h2': ['48px', { lineHeight: '56px', letterSpacing: '-0.01em', fontWeight: '600' }],
                'h3': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
                'h4': ['24px', { lineHeight: '32px', letterSpacing: '0', fontWeight: '600' }],
                'body': ['18px', { lineHeight: '28px', letterSpacing: '0', fontWeight: '400' }],
                'small': ['14px', { lineHeight: '20px', letterSpacing: '0', fontWeight: '400' }],
            },
            spacing: {
                'xs': '8px',
                'sm': '16px',
                'md': '24px',
                'lg': '32px',
                'xl': '48px',
                '2xl': '64px',
                '3xl': '96px',
                '4xl': '128px',
            },
            boxShadow: {
                'elevation-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
                'elevation-md': '0 8px 24px rgba(0, 0, 0, 0.5)',
                'glow-accent': '0 0 32px rgba(220, 38, 38, 0.2)',
                'glow-accent-strong': '0 0 48px rgba(220, 38, 38, 0.3)',
            },
            transitionTimingFunction: {
                'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            transitionDuration: {
                'premium': '600ms',
            },
            backdropBlur: {
                'glass': '24px',
            },
        },
    },
    plugins: [],
}
