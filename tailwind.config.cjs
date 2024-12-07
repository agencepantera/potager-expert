/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'soil': {
          50: '#f8f6f3',
          100: '#e8e4df',
          200: '#d5cdc4',
          300: '#c2b5a8',
          400: '#af9d8c',
          500: '#8b7a69',
          600: '#6f614f',
          700: '#524735',
          800: '#362e1c',
          900: '#1a1403',
        },
        'leaf': {
          50: '#f3f7f1',
          100: '#e0eadb',
          200: '#c1d5b5',
          300: '#9ebd8b',
          400: '#7ba461',
          500: '#5d8544',
          600: '#496a34',
          700: '#355025',
          800: '#223516',
          900: '#0f1a07',
        },
        'tomato': {
          50: '#fef2f2',
          100: '#fde3e3',
          200: '#fbc0c0',
          300: '#f79191',
          400: '#f15959',
          500: '#e62e2e',
          600: '#c51f1f',
          700: '#941818',
          800: '#631515',
          900: '#310a0a',
        },
        'pumpkin': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1' }],
        'display-2': ['3.75rem', { lineHeight: '1.2' }],
        'display-3': ['3rem', { lineHeight: '1.2' }],
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
        'gradient-soft': 'linear-gradient(165deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
        'gradient-subtle': 'linear-gradient(to right, transparent, var(--tw-gradient-from) 15%, var(--tw-gradient-to) 85%, transparent)',
        'gradient-accent': 'linear-gradient(45deg, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%)',
        'texture-soil': 'url("/images/soil-texture.png")',
        'texture-paper': 'url("/images/paper-texture.png")'
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
