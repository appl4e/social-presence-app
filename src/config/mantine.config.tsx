import { colorsTuple, createTheme } from "@mantine/core";

export const theme = createTheme({
	primaryColor: "purple",
	colors: {
		purple: colorsTuple("hsl(var(--primary))"),
		"primary-light": colorsTuple("hsl(var(--primary-light))"),
		muted: colorsTuple("hsl(var(--muted))"),
	},
	defaultRadius: "md",
});
