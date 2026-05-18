/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // ইনফিনিট লুপের জন্য পারফেক্ট এক্স-অক্ষ ট্রান্সলেশন
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      animation: {
        // ৩০ সেকেন্ডে পুরো লুপটি স্মুথলি শেষ হবে এবং আজীবন চলতে থাকবে
        "ticker-infinite": "ticker 30s linear infinite",
      }
    },
  },
  plugins: [],
};