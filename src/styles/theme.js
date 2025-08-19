"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter)",
  },

  palette: {
    mode: "light",
    background: {
      default: "hsl(210, 25%, 94%)",
      paper: "hsl(0, 0%, 100%)",
    },
    primary: {
      main: "hsl(210, 90%, 40%)",
    },
    text: {
      primary: "hsl(210, 15%, 15%)",
      secondary: "hsl(210, 10%, 40%)",
    },
  },
});

export default theme;
