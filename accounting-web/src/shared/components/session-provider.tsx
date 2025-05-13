import { useLocation, useNavigate } from "react-router";
import { useUserSession } from "../hooks/use-session";
import { useEffect } from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isHydrated, setHydrated } = useUserSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const json = localStorage.getItem("user-session");
    if (json) {
      setHydrated();
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!user && location.pathname.includes("/home")) {
      navigate("/");
    } else if (user && !location.pathname.includes("/home")) {
      navigate("/home");
    }
  }, [user, isHydrated]);

  // if (!user && location.pathname.includes("/home")) return <></>;
  return <>{children}</>;
}
