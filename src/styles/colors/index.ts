import { css } from "@emotion/react";

export enum Colors {
    white = "#FFFFFF",
    grey = "#d5d5d5",
    tertiary = "#1B365D",
    tertiaryLight = "#2f3561",
    richBlack = "#0D1B2A",
    dark = "#101118",
    darkLighter = "#20222e",
}

export enum DarkTheme {
    // main color for bg elements (not all)
    primary = Colors.white,
    secondary = Colors.darkLighter,
    // main color for outlines, button bg, shadows ect
    tertiary = Colors.tertiary,

    bgElement = Colors.white,
    // main color for text
    textDefault = Colors.dark,
    textSecondary = Colors.tertiaryLight,
}

export const ThemeVar = css`
    :root {
        --primary: ${DarkTheme.primary};
        --secondary: ${DarkTheme.secondary};
        --tertiary: ${DarkTheme.tertiary};

        --bg-element: ${DarkTheme.bgElement};
        --text-default: ${DarkTheme.textDefault};
        --text-secondary: ${DarkTheme.textSecondary};
    }
`;

export const Theme = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    tertiary: "var(--tertiary)",
    bgElement: "var(--bg-element)",
    textDefault: "var(--text-default)",
    textSecondary: "var(--text-secondary)",
};
