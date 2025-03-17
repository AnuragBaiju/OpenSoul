import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import LandingPage from "./pages/LandingPage";
import AdminRoutes from "./routes/AdminRoutes";
import "./App.css";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/*" element={<UserRoutes />} />
                    <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
