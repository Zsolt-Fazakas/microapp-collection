import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import HomeAdmin from "./Components/HomeAdmin";
import HomeClient from "./Components/HomeClient";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="/HomeAdmin" element={<HomeAdmin />} />
      <Route path="/HomeClient" element={<HomeClient />} />
    </Routes>
  );
};

export default AppRoutes;
