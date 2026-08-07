import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "./Layout.css";
import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getCurrentUser } from "../api/auth";

function Layout() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    async function loadUser() {
        const current = await getCurrentUser();
        setUser(current);
    }

    loadUser();
}, []);
    const navigate = useNavigate();

    function handleLogout() {

        logout();
        navigate("/");
    }

    return (
        <div className="layout">

            <header className="navbar">
                <div className="navbar-user">
            👤 {user?.username}
                </div>
                <h2 className="logo">
                    ⚽ TipLiga
                </h2>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Odhlásit
                </button>

            </header>

            <main className="content">

                <Outlet />

            </main>

        </div>
    );
}

export default Layout;