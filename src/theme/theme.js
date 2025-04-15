import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // or 'light'
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#0a0a0a",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default theme;
