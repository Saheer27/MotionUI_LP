module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          notch: ["Notch Grotesk", "sans-serif"],
        },
        spacing: {
          "vh-600": "600vh",
        },
        perspective: {
          "10000": "10000px",
        },
      },
    },
    plugins: [],
  };
  