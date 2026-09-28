import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Header } from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { config } from "./config/environment";
import { initAnalytics } from "./utils/analytics";

const App = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // GitHub Pages serves 404.html for deep links; it stores the path for us
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Analytics only in production browsers
  useEffect(() => {
    if (import.meta.env.DEV || !config.amplitude.apiKey) return;
    initAnalytics({ apiKey: config.amplitude.apiKey });
  }, []);

  // The breed detail page is full-bleed; its back button replaces the header
  const isBreedPage = pathname.startsWith("/rasse/");

  return (
    <>
      {!isBreedPage && <Header />}
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </>
  );
};

export default App;
