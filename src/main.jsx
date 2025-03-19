import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App.jsx";
import theme from "./theme/index.js";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
