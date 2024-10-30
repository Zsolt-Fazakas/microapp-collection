import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.role !== "admin") {
        navigate("/HomeClient");
      }
    } else {
      navigate("/Login");
    }
  }, [navigate]);
};

export default useAutoRedirect;
