import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          background: "linear-gradient(hsl(210, 24%, 9%) 100%, hsla(210, 100%, 23%, 0.2) 100%)",
        },
      },
    },
  },
});

export default theme;
