/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        stream: {
          bg: "#0b0b0f",
          surface: "#141418",
          card: "#1a1a22",
          border: "#2a2a35",
          muted: "#8b8b9e",
          accent: "#e50914",
          "accent-hover": "#f40612",
          gold: "#f5c518",
        },
      },
      backgroundImage: {
        "hero-fade":
          "linear-gradient(to top, #0b0b0f 0%, rgba(11,11,15,0.85) 25%, rgba(11,11,15,0.4) 55%, rgba(11,11,15,0.15) 100%)",
        "hero-fade-side":
          "linear-gradient(to right, #0b0b0f 0%, rgba(11,11,15,0.6) 35%, transparent 70%)",
        "nav-fade":
          "linear-gradient(to bottom, rgba(11,11,15,0.95) 0%, rgba(11,11,15,0.7) 60%, transparent 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        shimmer: "shimmer 1.8s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
