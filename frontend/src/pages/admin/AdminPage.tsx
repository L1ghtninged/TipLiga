import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    logoutAdmin
} from "../../utils/adminAuth";

import "./AdminPage.css";
import UsersPage from "./UsersPage";
import RoundsPage from "./RoundsPage";
import MatchesPage from "./MatchesPage";
import TeamsPage from "./TeamsPage";
import EvaluationPage from "./EvaluationPage";


type AdminSection =
    | "users"
    | "rounds"
    | "teams"
    | "matches"
    | "calculation";


function AdminPage() {

    const navigate = useNavigate();

    const [section, setSection] =
        useState<AdminSection>("users");
    const [darkMode, setDarkMode] = useState(() => {
    const isDark =
        localStorage.getItem("theme") === "dark";

    document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
    );

    return isDark;
});

    function handleLogout() {

        logoutAdmin();

        navigate(
            "/admin/login",
            { replace: true }
        );
    }
    function toggleDarkMode() {
    setDarkMode((current) => {
        const newMode = !current;

        document.documentElement.setAttribute(
            "data-theme",
            newMode ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            newMode ? "dark" : "light"
        );

        return newMode;
    });
}


    return (

        <div className="admin-page">

            <header className="admin-header">
    <div>
        <h1>⚽ Tipovačka</h1>
        <span>Administrace</span>
    </div>

    <div className="admin-header-actions">
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

        <button
            className="admin-logout-button"
            onClick={handleLogout}
        >
            Odhlásit
        </button>
    </div>
</header>


            <div className="admin-layout">

                <aside className="admin-sidebar">

                    <button
                        className={
                            section === "users"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("users")
                        }
                    >
                        👥 Uživatelé
                    </button>


                    <button
                        className={
                            section === "rounds"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("rounds")
                        }
                    >
                        🏆 Kola
                    </button>


                    <button
                        className={
                            section === "teams"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("teams")
                        }
                    >
                        ⚽ Týmy
                    </button>


                    <button
                        className={
                            section === "matches"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("matches")
                        }
                    >
                        🗓️ Zápasy
                    </button>


                    <button
                        className={
                            section === "calculation"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("calculation")
                        }
                    >
                        🧮 Vyhodnocení
                    </button>

                </aside>


                <main className="admin-content">

                    {section === "users" && (
                        <UsersPage />
                    )}


                    {section === "rounds" && (
                        <RoundsPage />
                    )}


                    {section === "teams" && (
                        <TeamsPage />
                    )}


                    {section === "matches" && (
                        <MatchesPage />
                    )}


                    {section === "calculation" && (
                        <EvaluationPage />
                    )}

                </main>

            </div>

        </div>
    );
}



export default AdminPage;