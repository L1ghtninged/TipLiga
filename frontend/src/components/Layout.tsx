import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthProvider";
import { getRounds } from "../api/rounds";

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
    async function handleTipovaniClick() {
        try {
            const rounds = await getRounds();

            const openRounds = rounds
                .filter((round) => !round.is_closed)
                .sort(
                    (a, b) => a.cislo_kola - b.cislo_kola
                );
            
            if (openRounds.length === 0) {
                const firstRound = [...rounds].sort((a, b) => a.cislo_kola - b.cislo_kola)[0];
                navigate(`/round/${firstRound.id}`);
            }

            const latestRound = openRounds[0];
            

            navigate(`/round/${latestRound.id}`);
        } catch (error) {
            console.error("Nepodařilo se načíst kola:", error);
        }
    }
    async function handleResultsClick() {
        try {
            const rounds = await getRounds();

            const closedRounds = rounds
                .filter((round) => round.is_closed)
                .sort(
                    (a, b) => b.cislo_kola - a.cislo_kola
                );
            
            if (closedRounds.length === 0) {
                const firstRound = [...rounds].sort((a, b) => a.cislo_kola - b.cislo_kola)[0];
                navigate(`/results/${firstRound.id}`);
            }

            const latestRound = closedRounds[0];
            

            navigate(`/results/${latestRound.id}`);
            /*
            if (rounds.length === 0) {
                console.error("Nejsou k dispozici žádná kola.");
                return;
            }
            const firstRound = [...rounds].sort(
                (a, b) => a.cislo_kola - b.cislo_kola
            )[0];
            navigate(`/results/${firstRound.id}`);
            */
        } catch (error) {
            console.error(
                "Nepodařilo se načíst kola:",
                error
            );
        }
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


                    <button
                        type="button"
                        className={`nav-link nav-button ${location.pathname.startsWith("/round/")
                                ? "active"
                                : ""
                            }`}
                        onClick={handleTipovaniClick}
                    >
                        Tipování
                    </button>
                    <button
                        type="button"
                        className={`nav-link nav-button ${location.pathname.startsWith("/results/")
                                ? "active"
                                : ""
                            }`}
                        onClick={handleResultsClick}
                    >
                        Výsledky
                    </button>


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