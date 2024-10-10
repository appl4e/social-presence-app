/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				"background-light": "hsl(var(--background-light))",
				foreground: "hsl(var(--foreground))",
				primary: "hsl(var(--primary))",
				"primary-light": "hsl(var(--primary-light))",
				muted: "hsl(var(--muted))",
				"muted-light": "hsl(var(--muted-light))",
			},
			boxShadow: {
				input: "0px 0px 9px 1px hsl(249 100 92%)",
			},
		},
	},
	plugins: [],
};
