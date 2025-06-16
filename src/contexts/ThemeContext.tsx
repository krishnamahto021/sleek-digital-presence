import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize the theme state
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for client-side rendering
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) return savedTheme;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark ? "dark" : "light";
    }
    return "light"; // Default for server-side rendering
  });

  // Create Material UI theme based on current theme
  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === "dark" ? "#60a5fa" : "#3b82f6", // blue-400 : blue-500
        light: theme === "dark" ? "#93c5fd" : "#60a5fa", // blue-300 : blue-400
        dark: theme === "dark" ? "#2563eb" : "#1d4ed8", // blue-600 : blue-700
      },
      secondary: {
        main: theme === "dark" ? "#a78bfa" : "#8b5cf6", // violet-400 : violet-500
        light: theme === "dark" ? "#c4b5fd" : "#a78bfa", // violet-300 : violet-400
        dark: theme === "dark" ? "#7c3aed" : "#6d28d9", // violet-600 : violet-700
      },
      background: {
        default: theme === "dark" ? "#0f1419" : "#ffffff", // Darker background for better contrast
        paper: theme === "dark" ? "#1a202c" : "#f8fafc", // Darker paper background
      },
      text: {
        primary: theme === "dark" ? "#ffffff" : "#0f172a", // Pure white for better contrast : slate-900
        secondary: theme === "dark" ? "#e2e8f0" : "#475569", // Lighter secondary text : slate-600
      },
      divider: theme === "dark" ? "#334155" : "#e2e8f0", // slate-700 : slate-200
    },

    // Centralized Typography System
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

      // Hero Section Typography
      h1: {
        fontSize: "clamp(2.5rem, 8vw, 5rem)", // Responsive hero title
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
      },

      // Section Headers
      h2: {
        fontSize: "clamp(2rem, 5vw, 2.5rem)", // Responsive section titles
        fontWeight: 700,
        lineHeight: 1.2,
        marginBottom: "1rem",
      },

      // Subsection Headers
      h3: {
        fontSize: "clamp(1.5rem, 4vw, 2rem)",
        fontWeight: 600,
        lineHeight: 1.3,
        marginBottom: "0.75rem",
      },

      // Card Titles
      h4: {
        fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: "0.5rem",
      },

      // Component Titles
      h5: {
        fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
        fontWeight: 600,
        lineHeight: 1.5,
      },

      // Small Headers
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.6,
      },

      // Body Text
      body1: {
        fontSize: "1rem",
        lineHeight: 1.7,
        marginBottom: "1rem",
      },

      // Secondary Text
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },

      // Button Text
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        textTransform: "none",
        letterSpacing: "0.02em",
      },

      // Caption Text
      caption: {
        fontSize: "0.75rem",
        lineHeight: 1.5,
      },
    },

    // Centralized Spacing System
    spacing: 8, // Base spacing unit (8px)

    // Custom Breakpoints
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },

    // Centralized Component Styling
    components: {
      // Global Baseline Styles
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: theme === "dark" ? "#1e293b" : "#f1f5f9",
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme === "dark" ? "#475569" : "#cbd5e1",
              borderRadius: "4px",
            },
          },
          // Global font smoothing
          "*": {
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },

      // AppBar Styling
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
          },
        },
      },

      // Card Styling
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            },
          },
        },
      },

      // Paper Styling
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: "12px",
          },
        },
      },

      // Button Styling
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "8px",
            fontWeight: 500,
            padding: "10px 20px",
            fontSize: "0.875rem",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          },
          contained: {
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
          outlined: {
            borderWidth: "1.5px",
            "&:hover": {
              borderWidth: "1.5px",
            },
          },
        },
      },

      // Chip Styling
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            fontWeight: 500,
          },
        },
      },

      // Typography Styling
      MuiTypography: {
        styleOverrides: {
          // Section Title Variant - only apply gradient to h2 with gradient class
          h2: {
            textAlign: "center",
            marginBottom: "0.5rem",
          },
        },
      },

      // Container Styling
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "1rem",
            paddingRight: "1rem",
            "@media (min-width: 640px)": {
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            },
            "@media (min-width: 1024px)": {
              paddingLeft: "2rem",
              paddingRight: "2rem",
            },
          },
        },
      },

      // TextField Styling
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-1px)",
              },
              "&.Mui-focused": {
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
              },
            },
          },
        },
      },

      // Fab Styling
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              transform: "scale(1.05)",
            },
          },
        },
      },
    },
  });

  // Add custom theme extensions
  const extendedTheme = createTheme(muiTheme, {
    // Custom Design Tokens
    custom: {
      // Section Spacing
      sectionSpacing: {
        mobile: muiTheme.spacing(8), // 64px
        desktop: muiTheme.spacing(12), // 96px
      },

      // Card Spacing
      cardSpacing: {
        padding: muiTheme.spacing(3), // 24px
        margin: muiTheme.spacing(2), // 16px
      },

      // Animation Durations
      transitions: {
        fast: "0.2s",
        normal: "0.3s",
        slow: "0.5s",
      },

      // Border Radius
      borderRadius: {
        small: "6px",
        medium: "8px",
        large: "12px",
      },

      // Box Shadows
      shadows: {
        card: "0 2px 8px rgba(0,0,0,0.1)",
        cardHover: "0 10px 25px rgba(0,0,0,0.15)",
        button: "0 4px 12px rgba(0,0,0,0.15)",
      },

      // Common Gradients
      gradients: {
        primary:
          theme === "dark"
            ? "linear-gradient(135deg, #60a5fa 0%, #93c5fd 50%, #2563eb 100%)"
            : "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #1d4ed8 100%)",
        secondary:
          theme === "dark"
            ? "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #7c3aed 100%)"
            : "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #6d28d9 100%)",
      },
    },
  });

  useEffect(() => {
    // Apply theme class to document
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={extendedTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
