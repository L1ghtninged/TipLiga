import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../api/dashboard";
import type { DashboardData } from "../types/Dashboard";

import "./HomePage.css";

function HomePage() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState<DashboardData | null>(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboard();
                setDashboard(data);

            } catch (error) {

                console.error(error);

            }
        }

        loadDashboard();

    }, []);

    if (!dashboard) {
        return <h2>Načítání...</h2>;
    }

    return (

        <div className="home-page">

            <h1>Dashboard</h1>

            <section>

                <h2>📅 Otevřená kola</h2>

                {dashboard.open_rounds.map(round => (

                    <div
                        key={round.id}
                        className="round-card"
                    >

                        <h3>{round.cislo_kola}. kolo</h3>

                        <p>
                            Uzávěrka:
                            {" "}
                            {round.deadline
                                ? new Date(round.deadline).toLocaleString("cs-CZ")
                                : "Není určena"}
                        </p>

                        <p>

                            Tipy:
                            {" "}
                            {round.tip_count}
                            {" / "}
                            {round.match_count}

                        </p>

                        <p>

                            Joker:
                            {" "}
                            {round.joker_used ? "Ano" : "Ne"}

                        </p>

                        <button
                            onClick={() => navigate(`/round/${round.id}`)}
                        >
                            Otevřít
                        </button>

                    </div>

                ))}

            </section>

            <section>

                <h2>🏆 Leaderboard</h2>

                <table>

                    <tbody>

                        {dashboard.leaderboard.slice(0, 5).map((user, index) => (

                            <tr key={user.id}>

                                <td>{index + 1}.</td>

                                <td>{user.username}</td>

                                <td>{user.pocet_bodu} b</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                <button
                    onClick={() => navigate("/leaderboard")}
                >
                    Celá tabulka
                </button>

            </section>

        </div>

    );
}

export default HomePage;