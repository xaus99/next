import type { AppProps } from "next/app";
// Themes
import { darkTheme, lightTheme } from "../themes";
// Providers
import { ThemeProvider, CssBaseline } from "@mui/material";
import { UiProvider } from "../context/ui";
import { AuthProvider } from "../context/auth";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UiProvider>
        <ThemeProvider theme={darkTheme}>
          <Toaster position="top-center" />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </AuthProvider>
  );
}

export default MyApp;
