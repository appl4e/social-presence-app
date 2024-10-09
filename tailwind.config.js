/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: "hsl(var(--primary))",
				"primary-light": "hsl(var(--primary-light))",
				muted: "hsl(var(--muted))",
			},
		},
	},
	plugins: [],
};
