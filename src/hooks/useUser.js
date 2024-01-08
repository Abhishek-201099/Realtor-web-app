import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export function useUser() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(function () {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsAuthenticated(true);
      setIsAuthenticating(false);
    });
  }, []);

  return { isAuthenticating, isAuthenticated };
}
