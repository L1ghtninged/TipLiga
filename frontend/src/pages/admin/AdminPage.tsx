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


    function handleLogout() {

        logoutAdmin();

        navigate(
            "/admin/login",
            { replace: true }
        );
    }


    return (

        <div className="admin-page">

            <header className="admin-header">

                <div>
                    <h1>⚽ TipLiga</h1>

                    <span>
                        Administrace
                    </span>
                </div>


                <button
                    className="admin-logout-button"
                    onClick={handleLogout}
                >
                    Odhlásit
                </button>

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