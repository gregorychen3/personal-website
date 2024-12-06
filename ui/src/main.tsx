import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { App } from "./App.tsx";
import { store } from "./app/store";
import { theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
