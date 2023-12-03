// import plugin from 'tailwindcss/plugin';

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{jsx,js,ts}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      // that is animation class
      animation: {
        fade: "fadeOut 0.2s ease-in-out",
        fadeInOut: "fadeInOut 2s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInOut: {
          "0%": { opacity: 0 },
          "20%": { opacity: 1 },
          "80%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      }),

      screens: {
        tablet: "683px",
        laptop: "1024px",
        leftHide: "838px",
        rightHide: "1122px",
        sliderHide: "1380px",
      },
      colors: {
        magnum: {
          50: "#fff9ed",
          100: "#fef2d6",
          200: "#fce0ac",
          300: "#f9c978",
          400: "#f7b155",
          500: "#f38d1c",
          600: "#e47312",
          700: "#bd5711",
          800: "#964516",
          900: "#793a15",
          950: "#411c09",
        },
        // NEW FIGMA COLORS
        // starting 1 is deep more is less deep colors
        twitterBlue1: "#1da1f2",
        twitterBlue2: "#1d9eef",
        twitterBlue3: "#1b9cf0",
        twitterBlueLight4: "#1da1f266",
        twitterGreen: "#01ba7c",
        twitterRed: "#f91880",
        twitterSky: "#bce2fb",
        twitterBlueLight1: "#1da1f21a",
        twitterRedLight1: "#f918801a",
        twitterGreenLight1: "#00ba7c1a",
        twitterCommentBackground: "#0D1720",
        whiteFull: "#ffffff",
        white1: "#f9f9f9",
        white2: "#f7f7f7",
        white3: "#f2f2f2",
        white4: "#efefef",
        white5: "#e7e7e8",

        blackFull: "#000000",
        black1: "#121212",
        black2: "#191919",
        black3: "#1f1f1f",
        black4: "#313131",

        gray1: "#747474",
        gray2: "#8d8d8d",
        gray3: "#bbbbbb",
        gray4: "#dfdfdf",

        grayDark1: "#3b3b3b",
        grayDark2: "#414141",
        grayDark3: "#4d4d4d",
        grayDark4: "#656565",
        grayDark5: "#909090",

        grayMate1: "#31353d",
        grayMate2: "#15181c",
        grayMate3: "#cfd9de",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              position: "relative",
              borderRadius: theme("borderRadius.md"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    // plugi(function ({ addVariant, matchUtilities, theme }) {
    // 	addVariant('hocus', ['&:hover', '&:focus']);
    // 	// Square utility
    // 	matchUtilities(
    // 		{
    // 			square: (value) => ({
    // 				width: value,
    // 				height: value
    // 			})
    // 		},
    // 		{ values: theme('spacing') }
    // 	);
    // }),
  ],
};
