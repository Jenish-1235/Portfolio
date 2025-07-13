/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-overlay': 'var(--bg-overlay)',
        'bg-glass': 'var(--bg-glass)',
        
        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-accent': 'var(--text-accent)',
        'text-muted': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
        
        // Accent colors
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-hover': 'var(--accent-primary-hover)',
        'accent-primary-active': 'var(--accent-primary-active)',
        'accent-primary-light': 'var(--accent-primary-light)',
        'accent-primary-alpha': 'var(--accent-primary-alpha)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-secondary-hover': 'var(--accent-secondary-hover)',
        'accent-secondary-active': 'var(--accent-secondary-active)',
        'accent-secondary-alpha': 'var(--accent-secondary-alpha)',
        
        // State colors
        'success': 'var(--success)',
        'success-hover': 'var(--success-hover)',
        'success-bg': 'var(--success-background)',
        'warning': 'var(--warning)',
        'warning-hover': 'var(--warning-hover)',
        'warning-bg': 'var(--warning-background)',
        'error': 'var(--error)',
        'error-hover': 'var(--error-hover)',
        'error-bg': 'var(--error-background)',
        'info': 'var(--info)',
        'info-hover': 'var(--info-hover)',
        'info-bg': 'var(--info-background)',
        
        // Border colors
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        'border-accent': 'var(--border-accent)',
        'border-muted': 'var(--border-muted)',
        'border-hover': 'var(--border-hover)',
        
        // Component colors
        'nav-bg': 'var(--nav-background)',
        'nav-border': 'var(--nav-border)',
        'nav-link': 'var(--nav-link)',
        'nav-link-hover': 'var(--nav-link-hover)',
        'nav-link-active': 'var(--nav-link-active)',
        
        'card-bg': 'var(--card-background)',
        'card-border': 'var(--card-border)',
        
        'input-bg': 'var(--input-background)',
        'input-border': 'var(--input-border)',
        'input-border-focus': 'var(--input-border-focus)',
        'input-text': 'var(--input-text)',
        'input-placeholder': 'var(--input-placeholder)',
        
        'code-bg': 'var(--code-background)',
        'code-border': 'var(--code-border)',
        'code-text': 'var(--code-text)',
        'code-keyword': 'var(--code-keyword)',
        'code-string': 'var(--code-string)',
        'code-comment': 'var(--code-comment)',
        
        'link': 'var(--link-default)',
        'link-hover': 'var(--link-hover)',
        'link-visited': 'var(--link-visited)',
        'link-external': 'var(--link-external)',
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
        'glow-secondary': 'var(--shadow-glow-secondary)',
        'card': 'var(--card-shadow)',
        'card-hover': 'var(--card-hover-shadow)',
      },
      fontFamily: {
        'sans': 'var(--font-sans)',
        'mono': 'var(--font-mono)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'ease-out': 'var(--easing-ease-out)',
        'ease-in': 'var(--easing-ease-in)',
        'ease-in-out': 'var(--easing-ease-in-out)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal': 'var(--z-modal)',
        'tooltip': 'var(--z-tooltip)',
      },
    },
  },
  plugins: [],
}
