// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
    "./src/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        troutlytics: {
          primary: "#2C7BE5", // Sky Blue
          secondary: "#2A4365", // Deep Blue
          background: "#F7FAFC", // Light Off-White
          card: "#FFFFFF", // White for containers
          text: "#1A202C", // Slate Gray
          subtext: "#4A5568", // Medium Gray
          accent: "#38B2AC", // Teal (for buttons/success)
        },
      },
    },
  },
  plugins: [],
};
