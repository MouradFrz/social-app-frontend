/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#cfaecb",
				lightgrey: "#eeebf2",
				darkgrey: "#bfbfbf",
				secondary: "#e3e0e7",
			},
		},
	},
	plugins: [],
};
