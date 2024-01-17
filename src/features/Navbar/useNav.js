import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export function useNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(function () {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return { isAuthenticated };
}
