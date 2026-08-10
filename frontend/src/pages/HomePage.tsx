import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../api/dashboard";
import type { DashboardData } from "../types/Dashboard";

import "./HomePage.css";

function HomePage() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    const [showAllRounds, setShowAllRounds] =
        useState(false);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data =
                    await getDashboard();

                setDashboard(data);

            } catch (error) {

                console.error(error);

            }
        }

        loadDashboard();

    }, []);


    if (!dashboard) {

        return (

            <div className="home-page-loading">

                <h2>
                    Načítání...
                </h2>

            </div>

        );
    }


    const visibleRounds =
        showAllRounds
            ? dashboard.open_rounds
            : dashboard.open_rounds.slice(0, 3);


    const currentUser =
        dashboard.leaderboard.find(
            user =>
                user.username ===
                dashboard.user.username
        );


    return (

        <div className="home-page">

            <header className="home-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Vítejte v TipLize!
                    </p>

                </div>

            </header>


            <div className="home-overview">

                <section className="home-card leaderboard-card">

                    <div className="home-card-header">

                        <div>

                            <h2>
                                🏆 Žebříček
                            </h2>

                            <p>
                                Aktuální pořadí hráčů
                            </p>

                        </div>

                        <button
                            className="secondary-button"
                            onClick={() =>
                                navigate("/leaderboard")
                            }
                        >
                            Celý žebříček
                        </button>

                    </div>


                    {dashboard.leaderboard.length === 0 ? (

                        <p className="home-empty">
                            Zatím nejsou žádné výsledky.
                        </p>

                    ) : (

                        <table className="leaderboard-preview">

                            <tbody>

                                {dashboard.leaderboard
                                    .slice(0, 5)
                                    .map((user, index) => (

                                        <tr
                                            key={user.id}
                                            className={
                                                index === 0
                                                    ? "leaderboard-first"
                                                    : ""
                                            }
                                        >

                                            <td className="leaderboard-position">

                                                {index === 0
                                                    ? "🥇"
                                                    : index === 1
                                                    ? "🥈"
                                                    : index === 2
                                                    ? "🥉"
                                                    : `${index + 1}.`}

                                            </td>

                                            <td>
                                                {user.username}
                                            </td>

                                            <td className="leaderboard-points">

                                                {user.pocet_bodu}
                                                {" "}
                                                b

                                            </td>

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    )}

                </section>


                <section className="home-card player-status-card">

                    <h2>
                        📊 Přehled
                    </h2>

                    <div className="player-status">

                        <div className="status-value">

                            {currentUser?.pocet_bodu ?? 0}

                        </div>

                        <div className="status-label">
                            bodů
                        </div>

                    </div>


                    <div className="status-divider" />


                    <div className="status-row">

                        <span>
                            Otevřená kola
                        </span>

                        <strong>
                            {dashboard.open_rounds.length}
                        </strong>

                    </div>


                    <div className="status-row">

                        <span>
                            Nejbližší uzávěrka
                        </span>

                        <strong>

                            {dashboard.open_rounds.length > 0 &&
                            dashboard.open_rounds[0].deadline

                                ? new Date(
                                    dashboard.open_rounds[0].deadline
                                ).toLocaleString(
                                    "cs-CZ",
                                    {
                                        dateStyle: "short",
                                        timeStyle: "short"
                                    }
                                )

                                : "—"}

                        </strong>

                    </div>

                </section>

            </div>


            <section className="home-section">

                <div className="home-section-header">

                    <div>

                        <h2>
                            📅 Otevřená kola
                        </h2>

                        <p>
                            Kola, ve kterých můžete stále odesílat tipy.
                        </p>

                    </div>

                    {dashboard.open_rounds.length > 3 && (

                        <button
                            className="secondary-button"
                            onClick={() =>
                                setShowAllRounds(
                                    current => !current
                                )
                            }
                        >

                            {showAllRounds
                                ? "Zobrazit méně"
                                : "Zobrazit všechna kola"}

                        </button>

                    )}

                </div>


                {visibleRounds.length === 0 ? (

                    <div className="home-empty-card">

                        <div className="home-empty-icon">
                            🎉
                        </div>

                        <h3>
                            Žádná otevřená kola
                        </h3>

                        <p>
                            Momentálně není možné odesílat žádné tipy.
                        </p>

                    </div>

                ) : (

                    <div className="rounds-grid">

                        {visibleRounds.map(round => (

                            <article
                                key={round.id}
                                className="round-card"
                            >

                                <div className="round-card-header">

                                    <div>

                                        <span className="round-label">
                                            KOLO
                                        </span>

                                        <h3>
                                            {round.cislo_kola}.
                                        </h3>

                                    </div>

                                    <span
                                        className={
                                            round.tip_count ===
                                            round.match_count
                                                ? "round-complete"
                                                : "round-progress"
                                        }
                                    >

                                        {round.tip_count ===
                                        round.match_count
                                            ? "✓ Hotovo"
                                            : "Probíhá"}

                                    </span>

                                </div>


                                <div className="round-card-info">

                                    <div>

                                        <span>
                                            Tipy
                                        </span>

                                        <strong>
                                            {round.tip_count}
                                            {" / "}
                                            {round.match_count}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Joker
                                        </span>

                                        <strong>
                                            {round.joker_used
                                                ? "🃏 Použit"
                                                : "Volný"}
                                        </strong>

                                    </div>

                                </div>


                                <div className="round-deadline">

                                    <span>
                                        Uzávěrka
                                    </span>

                                    <strong>

                                        {round.deadline

                                            ? new Date(
                                                round.deadline
                                            ).toLocaleString(
                                                "cs-CZ",
                                                {
                                                    dateStyle: "short",
                                                    timeStyle: "short"
                                                }
                                            )

                                            : "Není určena"}

                                    </strong>

                                </div>


                                <button
                                    className="round-open-button"
                                    onClick={() =>
                                        navigate(
                                            `/round/${round.id}`
                                        )
                                    }
                                >
                                    {round.tip_count ===
                                    round.match_count
                                        ? "Zobrazit kolo"
                                        : "Tipovat kolo"}
                                </button>

                            </article>

                        ))}

                    </div>

                )}

            </section>

        </div>

    );
}

export default HomePage;
