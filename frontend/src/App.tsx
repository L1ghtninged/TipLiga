import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RoundPage from "./pages/RoundPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/admin/AdminPage";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Přesměrování na login */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Veřejná stránka */}
                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                {/* Chráněné stránky */}
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

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

                    <Route
                        path="/admin/*"
                        element={<AdminPage />}
                    />

                </Route>

                {/* Neznámá adresa */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;