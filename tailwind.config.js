/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#000000',
          surface: '#080305',
          card: '#0e0508',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        burgundy: {
          DEFAULT: '#6D001A',
          deep: '#4A0012',
          light: '#8E0022',
          bright: '#B8002E',
          glow: '#E01E43',
        },
        accent: {
          burgundy: '#6D001A',
          rose: '#990026',
          crimson: '#c41238',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(109, 0, 26, 0.3)' },
          '100%': { boxShadow: '0 0 35px rgba(184, 0, 46, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
