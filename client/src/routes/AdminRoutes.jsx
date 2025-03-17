import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
     
    </Routes>
  );
}

export default AdminRoutes;