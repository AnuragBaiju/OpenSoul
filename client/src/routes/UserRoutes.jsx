import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/User/Home";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
}

export default UserRoutes;
