/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  primary: "#0F0D13", // Cor principal do seu projeto
		  secundary: "#29282D",
		  details: "#A238FF",
		  hover: "#B560FF",
		},
		fontFamily: {
		  sans: ["Poppins", "sans-serif"], // Definindo Poppins como fonte padrão
		},
	  },
	},
	plugins: [],
  };
  