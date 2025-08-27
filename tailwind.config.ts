import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#3771ff',
        'yellow-color': '#ffa800',
        'green-color': '#aee753',
        'red-color': '#f9022f',
        'dark-bg': '#353945',
        'neutral-1': '#141416',
        'neutral-5': '#B1B5C3',
        'neutral-6': '#E6E8EC',
        'neutral-7': '#F4F5F6',
        'sidebar-text': '#777E90',
        'research': '#AEE753',
        'design': '#F90430',
        'feedback': '#3772FF',
        'ux-research': '#FFA800',
        'other': '#777E90',
        'interface': '#353945',
      },
    },
  },
  plugins: [],
}
export default config