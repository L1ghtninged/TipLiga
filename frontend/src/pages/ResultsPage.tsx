import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRounds } from "../api/rounds";
import { getRoundResults } from "../api/results";

import type { Round } from "../types/Round";
import type { RoundResults } from "../types/Results";

import "./ResultsPage.css";

function ResultsPage() {
    const { roundId } = useParams();
    const navigate = useNavigate();

    const selectedRoundId = Number(roundId);

    const [rounds, setRounds] = useState<Round[]>([]);
    const [results, setResults] = useState<RoundResults | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // =========================
    // NAČTENÍ KOL
    // =========================

    useEffect(() => {
        async function loadRounds() {
            try {
                const data = await getRounds();
                setRounds(data);
            } catch (error) {
                console.error(error);

                setError("Nepodařilo se načíst kola.");
            }
        }

        loadRounds();
    }, []);

    // =========================
    // NAČTENÍ VÝSLEDKŮ
    // =========================

    useEffect(() => {
        if (!selectedRoundId) {
            return;
        }

        async function loadResults() {
            setLoading(true);
            setError(null);
            setResults(null);

            try {
                const data = await getRoundResults(selectedRoundId);

                setResults(data);
            } catch (error) {
                console.error(error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Nepodařilo se načíst výsledky."
                );
            } finally {
                setLoading(false);
            }
        }

        loadResults();
    }, [selectedRoundId]);

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="results-page">
                <p className="loading-text">
                    Načítání výsledků...
                </p>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error || !results) {
        return (
            <div className="results-page">
                <p className="error-message">
                    {error ?? "Výsledky nejsou dostupné."}
                </p>
            </div>
        );
    }
    function getRoundStatus(round: Round): "open" | "closed" {
        return round.is_closed ? "closed" : "open";
    }
    // =========================
    // NEUZAVŘENÉ KOLO
    // =========================
    
    if (results.message) {
        return (
            <div className="results-page">
                <div className="results-header">
                    <h1>Výsledky</h1>

                    <div className="round-selector">
                        {rounds.map((round) => (
                            <button
                                key={round.id}
                                className={`round-number ${getRoundStatus(round)} ${
            round.id === selectedRoundId ? "selected" : ""
        }`}
                                onClick={() =>
                                    navigate(`/results/${round.id}`)
                                }
                            >
                                {round.cislo_kola}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="results-title">
                    <h2>
                        {results.kolo.cislo_kola}. kolo
                    </h2>
                </div>

                <section className="results-closed-message">
                    <div className="results-closed-icon">
                        🔒
                    </div>

                    <h2>
                        Výsledky zatím nejsou dostupné
                    </h2>

                    <p>
                        Toto kolo ještě není uzavřené.
                    </p>

                    <p>
                        Výsledky a tipy ostatních uživatelů
                        budou dostupné po uzavření kola.
                    </p>
                </section>
            </div>
        );
    }

    // =========================
    // UZAVŘENÉ KOLO
    // =========================
    
    return (
        <div className="results-page">

            {/* HEADER */}

            <div className="results-header">
                <h1>Výsledky</h1>

                <div className="round-selector">
                    {rounds.map((round) => (
                        <button
                            key={round.id}
                            className={`round-number ${getRoundStatus(round)} ${
            round.id === selectedRoundId ? "selected" : ""
        }`}
                            onClick={() =>
                                navigate(`/results/${round.id}`)
                            }
                        >
                            {round.cislo_kola}
                        </button>
                    ))}
                </div>
            </div>

            {/* NÁZEV KOLA */}

            <div className="results-title">
                <h2>
                    {results.kolo.cislo_kola}. kolo
                </h2>
            </div>

            {/* =========================
                POŘADÍ
            ========================= */}

            <section className="rankings-section">
                <h2>Pořadí po kole</h2>

                <div className="rankings-list">
                    {results.poradi?.map((player) => (
                        <div
                            key={player.uzivatel_id}
                            className="ranking-row"
                        >
                            <span className="ranking-position">
                                {player.poradi}.
                            </span>

                            <span className="ranking-username">
                                {player.username}
                            </span>

                            <span className="ranking-round-points">
                                +{player.body_za_kolo}
                            </span>

                            <span className="ranking-total-points">
                                {player.body} b
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* =========================
                ZÁPASY
            ========================= */}

            <section className="matches-section">
                <h2>Zápasy</h2>

                <div className="results-matches-list">
                    {results.zapasy?.map((match) => (
                        <div
                            key={match.id}
                            className={
                                `result-match-card ${
                                    match.stav === "postponed"
                                        ? "postponed"
                                        : ""
                                }`
                            }
                        >

                            {/* ZÁPAS */}

                            <div className="result-match-header">

                                {/* DOMÁCÍ TÝM */}

                                <div className="result-team result-team-home">
                                    <span className="result-team-name">
                                        {match.domaci_tym.nazev}
                                    </span>

                                    <div className="result-logo-box">
                                        {match.domaci_tym.logo_url ? (
                                            <img
                                                className="result-team-logo"
                                                src={
                                                    match.domaci_tym.logo_url
                                                }
                                                alt={
                                                    match.domaci_tym.nazev
                                                }
                                            />
                                        ) : (
                                            <div className="result-logo-placeholder">
                                                ⚽
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SKÓRE */}

                                <strong className="result-match-score">
                                    {match.stav === "played"
                                        ? `${match.domaci_skore} : ${match.hostujici_skore}`
                                        : "— : —"}
                                </strong>

                                {/* HOSTUJÍCÍ TÝM */}

                                <div className="result-team result-team-away">

                                    <div className="result-logo-box">
                                        {match.hostujici_tym.logo_url ? (
                                            <img
                                                className="result-team-logo"
                                                src={
                                                    match.hostujici_tym.logo_url
                                                }
                                                alt={
                                                    match.hostujici_tym.nazev
                                                }
                                            />
                                        ) : (
                                            <div className="result-logo-placeholder">
                                                ⚽
                                            </div>
                                        )}
                                    </div>

                                    <span className="result-team-name">
                                        {match.hostujici_tym.nazev}
                                    </span>

                                </div>
                            </div>

                            {/* TIPY */}

                            <div className="tips-list">
                                {match.tipy.length === 0 ? (
                                    <p className="no-tips">
                                        Nikdo netipoval.
                                    </p>
                                ) : (
                                    match.tipy.map((tip) => (
                                        <div
                                            key={tip.id}
                                            className="result-tip-row"
                                        >
                                            <span className="tip-username">
                                                {tip.username}
                                            </span>

                                            <span className="tip-score">
                                                {
                                                    tip.predpoved_domaci_skore
                                                }
                                                {" : "}
                                                {
                                                    tip.predpoved_hostujici_skore
                                                }
                                            </span>

                                            {tip.is_joker && (
                                                <span className="tip-joker">
                                                    🃏
                                                </span>
                                            )}

                                            <span className="tip-points">
                                                +{tip.body_ziskane} b
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default ResultsPage;
