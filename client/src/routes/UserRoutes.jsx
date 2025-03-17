import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default UserRoutes;
