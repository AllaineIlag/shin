/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
          soft: "#A78BFA",
        },
        theme: {
          bg: "var(--color-bg)",
          card: "var(--color-card)",
          high: "var(--color-high)",
          highest: "var(--color-highest)",
          outline: "var(--color-outline)",
          text: "var(--color-text)",
          muted: "var(--color-muted)",
          accent: "var(--color-accent)",
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
          info: "var(--color-info)",
        },
      },
      fontFamily: {
        // Classic style: Google Sans Rounded
        sans: ["GoogleSansRounded-Regular"],
        "sans-light": ["GoogleSansRounded-Light"],
        "sans-medium": ["GoogleSansRounded-Medium"],
        "sans-semibold": ["GoogleSansRounded-SemiBold"],
        "sans-bold": ["GoogleSansRounded-Bold"],
        "sans-extrabold": ["GoogleSansRounded-ExtraBold"],
        "sans-black": ["GoogleSansRounded-Black"],

        // Minimal style: Figtree
        figtree: ["Figtree-Regular"],
        "figtree-light": ["Figtree-Light"],
        "figtree-medium": ["Figtree-Medium"],
        "figtree-semibold": ["Figtree-SemiBold"],
        "figtree-bold": ["Figtree-Bold"],
        "figtree-extrabold": ["Figtree-ExtraBold"],
        "figtree-black": ["Figtree-Black"],

        // Express / Specialty
        flex: ["GoogleSansFlex"],
        nunito: ["Nunito"],
        serif: ["PlayfairDisplay"],
        "serif-italic": ["PlayfairDisplay-Italic"],
      },
      borderRadius: {
        card: "24px",
        "card-express": "30px",
        dialog: "28px",
        sheet: "34px",
      },
    },
  },
  plugins: [],
};
