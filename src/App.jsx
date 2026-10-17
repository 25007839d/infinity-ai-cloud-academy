import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function AppThemeController() {
  const location = useLocation();

  useEffect(() => {
    const isAdmin = location.pathname.startsWith("/admin");
    const isStudent =
      location.pathname === "/student" || location.pathname.startsWith("/learn");

    document.body.classList.toggle("public-site", !isAdmin && !isStudent);

    return () => document.body.classList.remove("public-site");
  }, [location.pathname]);

  return <AppRoutes />;
}

export default function App() {
  return <AppThemeController />;
}
