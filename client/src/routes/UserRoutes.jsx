import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home";
import UserProfileDashboard from "../pages/User/UserProfileDashboard";
import UserLayout from "../layouts/UserLayout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import GroupConfessionPage from "../components/confession/GroupConfessionPage";
import Login from "../pages/auth/Login";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UserLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<UserProfileDashboard />} />
                <Route path="/confession-page/:confessionId" element={<GroupConfessionPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default UserRoutes;
