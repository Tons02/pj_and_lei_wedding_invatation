// theme.js
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  direction: "ltr", // change to rtl only if needed
  palette: {
    mode: "light",

    primary: {
      main: "#800020", // burgundy
      light: "#A0454F",
      dark: "#5C0015",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#D6C1A3", // beige
      light: "#E6D6BF",
      dark: "#B8A082",
      contrastText: "#3A2E2A",
    },

    background: {
      default: "#F8F5F2", // cream
      paper: "#FFFFFF",
    },

    text: {
      primary: "#3A2E2A",
      secondary: "#7B1E26",
    },

    error: {
      main: "#b3261e",
    },
  },

  typography: {
    fontFamily: `"Lato", sans-serif`,
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    body1: {
      fontFamily: `"Lato", sans-serif`,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
          padding: "10px 24px",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#3A2E2A",
          "&.Mui-focused": {
            color: "#800020",
          },
          "&.Mui-error": {
            color: "#b3261e",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#800020",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b3261e",
          },
        },
      },
    },
  },
});
