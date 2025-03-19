import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DC7633", // Orange
      contrastText: "#FFFFFF", // White text on primary color
    },
    secondary: {
      main: "#7F8C8D", // Custom Gray
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF", // White background
      paper: "#F5F5F5", // Light gray for surfaces
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#555555", // Dark gray text
    },
    action: {
      hover: "#E67E22", // Lighter orange hover effect
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Keep button text normal case
          borderRadius: 8, // Slightly rounded corners
        },
      },
    },
  },
});

export default theme;
