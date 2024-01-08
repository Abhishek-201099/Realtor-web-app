import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticating, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated && !isAuthenticating) navigate("/sign-in");
    },
    [isAuthenticated, isAuthenticating, navigate]
  );

  if (isAuthenticating)
    return (
      <div className="fullpage">
        <Loader />;
      </div>
    );

  if (isAuthenticated) return children;
}
