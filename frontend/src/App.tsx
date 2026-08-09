import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RoundPage from "./pages/RoundPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";

import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";


function App() {

    return (
        <BrowserRouter>

                <Routes>
                    <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/admin/login"
                    element={<AdminLoginPage />}
                />
                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route
                            path="/home"
                            element={<HomePage />}
                        />

                        <Route
                            path="/round/:roundId"
                            element={<RoundPage />}
                        />

                        <Route
                            path="/leaderboard"
                            element={<LeaderboardPage />}
                        />

                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />

                    </Route>

                </Route>
                <Route element={<AdminProtectedRoute />}>
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;