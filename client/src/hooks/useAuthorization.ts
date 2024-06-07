import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authApi from "src/api/AuthApi";

export const useAuthorization = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // redirect root url
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) navigate("/login");

      try {
        const res = await authApi.verifyToken();
        if (res) navigate("/");
      } catch {
        return false;
      }
    })();
  }, [navigate]);
};
