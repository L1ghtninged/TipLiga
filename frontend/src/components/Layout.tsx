import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthProvider";

import "./Layout.css";

function Layout() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });


    useEffect(() => {
        const theme = darkMode ? "dark" : "light";

        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [darkMode]);


    function handleLogout() {

        logout();

        navigate("/login");
    }


    function toggleDarkMode() {
        setDarkMode((current) => !current);
    }


    return (

        <div className="layout">

            <header className="navbar">

                <div
                    className="navbar-logo"
                    onClick={() => navigate("/home")}
                >
                    ⚽ Tipovačka
                </div>


                <nav className="navbar-links">

                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Domů
                    </NavLink>


                    <NavLink
                        to="/round/1"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Tipování
                    </NavLink>


                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Žebříček
                    </NavLink>


                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Profil
                    </NavLink>

                </nav>


                <div className="navbar-user">

                    <button
                        className="theme-button"
                        onClick={toggleDarkMode}
                        aria-label={
                            darkMode
                                ? "Přepnout na světlý režim"
                                : "Přepnout na tmavý režim"
                        }
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>


                    <span className="navbar-username">
                        {user?.username ?? "Uživatel"}
                    </span>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Odhlásit
                    </button>

                </div>

            </header>


            <main className="layout-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;