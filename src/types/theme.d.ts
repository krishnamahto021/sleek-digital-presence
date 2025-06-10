import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      sectionSpacing: {
        mobile: string;
        desktop: string;
      };
      cardSpacing: {
        padding: string;
        margin: string;
      };
      transitions: {
        fast: string;
        normal: string;
        slow: string;
      };
      borderRadius: {
        small: string;
        medium: string;
        large: string;
      };
      shadows: {
        card: string;
        cardHover: string;
        button: string;
      };
      gradients: {
        primary: string;
        secondary: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: {
      sectionSpacing?: {
        mobile?: string;
        desktop?: string;
      };
      cardSpacing?: {
        padding?: string;
        margin?: string;
      };
      transitions?: {
        fast?: string;
        normal?: string;
        slow?: string;
      };
      borderRadius?: {
        small?: string;
        medium?: string;
        large?: string;
      };
      shadows?: {
        card?: string;
        cardHover?: string;
        button?: string;
      };
      gradients?: {
        primary?: string;
        secondary?: string;
      };
    };
  }
}
