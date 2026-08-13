import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getRounds,
    getRoundMatches,
} from "../api/rounds";
import type {Match} from "../types/Match";

import {
    getTips,
    saveTip,
} from "../api/tips";
import type { Tip } from "../types/Tip";

import type { Round } from "../types/Round";

import "./RoundPage.css";


interface TipInput {
    domaci_skore: string;
    hostujici_skore: string;
    is_joker: boolean;
}


function RoundPage() {

    const { roundId } = useParams();
    const navigate = useNavigate();

    const selectedRoundId = Number(roundId);


    const [rounds, setRounds] = useState<Round[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);
    const [tips, setTips] = useState<Tip[]>([]);
    const [tipInputs, setTipInputs] = useState<Record<number, TipInput>>({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);


    /* Načtení všech kol */
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


    /* Načtení zápasů a tipů vybraného kola */
    useEffect(() => {
        if (!selectedRoundId) return;

        async function loadRound() {
            setLoading(true);
            setError(null);
            setSaveMessage(null);

            try {
                const [matchesData, tipsData] = await Promise.all([
                    getRoundMatches(selectedRoundId),
                    getTips(selectedRoundId)
                ]);

                setMatches(matchesData.matches);
                setTips(tipsData);

                const inputs: Record<number, TipInput> = {};
                for (const tip of tipsData) {
                    inputs[tip.zapas_id] = {
                        domaci_skore: String(tip.predpoved_domaci_skore),
                        hostujici_skore: String(tip.predpoved_hostujici_skore),
                        is_joker: tip.is_joker
                    };
                }
                setTipInputs(inputs);

            } catch (error) {
                console.error(error);
                setError("Nepodařilo se načíst data kola.");
            } finally {
                setLoading(false);
            }
        }

        loadRound();
    }, [selectedRoundId]);


    const selectedRound = rounds.find(round => round.id === selectedRoundId);


    function handleScoreChange(
        matchId: number,
        field: "domaci_skore" | "hostujici_skore",
        value: string
    ) {
        setTipInputs(previous => ({
            ...previous,
            [matchId]: {
                domaci_skore: previous[matchId]?.domaci_skore ?? "",
                hostujici_skore: previous[matchId]?.hostujici_skore ?? "",
                is_joker: previous[matchId]?.is_joker ?? false,
                [field]: value
            }
        }));
    }


    function handleJokerChange(matchId: number) {
        setTipInputs(previous => {
            const current = previous[matchId]?.is_joker ?? false;
            const newState: Record<number, TipInput> = {};

            for (const [id, input] of Object.entries(previous)) {
                newState[Number(id)] = {
                    ...input,
                    is_joker: false
                };
            }

            newState[matchId] = {
                domaci_skore: previous[matchId]?.domaci_skore ?? "",
                hostujici_skore: previous[matchId]?.hostujici_skore ?? "",
                is_joker: !current
            };

            return newState;
        });
    }


    async function handleSave() {
        if (!selectedRound) return;

        setSaving(true);
        setError(null);
        setSaveMessage(null);

        try {
            const oldJoker = tips.find(tip => tip.is_joker);
            const newJokerEntry = Object.entries(tipInputs).find(([, input]) => input.is_joker);
            const newJokerId = newJokerEntry ? Number(newJokerEntry[0]) : null;

            if (oldJoker && newJokerId !== null && oldJoker.zapas_id !== newJokerId) {
                const oldInput = tipInputs[oldJoker.zapas_id];
                if (oldInput) {
                    await saveTip(selectedRoundId, {
                        zapas_id: oldJoker.zapas_id,
                        predpoved_domaci_skore: Number(oldInput.domaci_skore),
                        predpoved_hostujici_skore: Number(oldInput.hostujici_skore),
                        is_joker: false
                    });
                }
            }

            for (const match of matches) {
                const input = tipInputs[match.id];
                if (!input || input.domaci_skore === "" || input.hostujici_skore === "") {
                    continue;
                }

                const existingTip = tips.find(tip => tip.zapas_id === match.id);

                if (
                    existingTip &&
                    existingTip.predpoved_domaci_skore === Number(input.domaci_skore) &&
                    existingTip.predpoved_hostujici_skore === Number(input.hostujici_skore) &&
                    existingTip.is_joker === input.is_joker
                ) {
                    continue;
                }

                if (
                    oldJoker &&
                    oldJoker.zapas_id === match.id &&
                    newJokerId !== null &&
                    oldJoker.zapas_id !== newJokerId
                ) {
                    continue;
                }

                await saveTip(selectedRoundId, {
                    zapas_id: match.id,
                    predpoved_domaci_skore: Number(input.domaci_skore),
                    predpoved_hostujici_skore: Number(input.hostujici_skore),
                    is_joker: input.is_joker
                });
            }

            const updatedTips = await getTips(selectedRoundId);
            setTips(updatedTips);

            const updatedInputs: Record<number, TipInput> = {};
            for (const tip of updatedTips) {
                updatedInputs[tip.zapas_id] = {
                    domaci_skore: String(tip.predpoved_domaci_skore),
                    hostujici_skore: String(tip.predpoved_hostujici_skore),
                    is_joker: tip.is_joker
                };
            }
            setTipInputs(updatedInputs);
            setSaveMessage("Tipy byly úspěšně uloženy.");

        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : "Nepodařilo se uložit tipy.");
        } finally {
            setSaving(false);
        }
    }


    function getRoundStatus(round: Round): "open" | "closed" {
        return round.is_closed ? "closed" : "open";
    }

    function formatMatchDate(value: string | null) {
    if (!value) {
        return null;
    }

    return new Date(value).toLocaleString("cs-CZ", {
        weekday: "short",
        day: "numeric",
        month: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
    function renderMatchDate(match: Match) {
    const formattedDate =
        formatMatchDate(match.zacatek_zapasu);

    if (match.stav === "postponed") {
        if (formattedDate) {
            return (
                <>
                    🔄{" "}
                    <span>
                        Nový termín: {formattedDate}
                    </span>
                </>
            );
        }

        return (
            <>
                ⏸️{" "}
                <span>
                    Odloženo — nový termín není znám
                </span>
            </>
        );
    }

    if (formattedDate) {
        return (
            <>
                🕒{" "}
                <span>
                    {formattedDate}
                </span>
            </>
        );
    }

    return (
        <>
            🕒{" "}
            <span>
                Termín není znám
            </span>
        </>
    );
}


    if (loading) {
        return (
            <div className="round-page">
                <p className="loading-text">Načítání zápasů...</p>
            </div>
        );
    }

    if (error && !matches.length) {
        return (
            <div className="round-page">
                <p className="error-message">{error}</p>
            </div>
        );
    }


    return (
        <div className="round-page">

            {/* Název a přepínač kol */}
            <div className="round-header">
                <h1>Tipování výsledků</h1>
                <div className="round-selector">
                    {rounds.map(round => (
                        <button
                            key={round.id}
                            className={`round-number ${getRoundStatus(round)} ${round.id === selectedRoundId ? "selected" : ""}`}
                            onClick={() => navigate(`/round/${round.id}`)}
                        >
                            {round.cislo_kola}
                        </button>
                    ))}
                </div>
            </div>

            <div className="round-title">
                <h2>{selectedRound?.cislo_kola}. kolo</h2>
            </div>

            {error && <p className="error-message">{error}</p>}
            {saveMessage && <p className="success-message">{saveMessage}</p>}

            {/* Seznam zápasů */}
            <div className="matches-list">
                {matches.map(match => {
                    const input = tipInputs[match.id];
                    const isClosed = selectedRound?.is_closed ?? false;
                    const isJokerActive = input?.is_joker ?? false;

                    return (
                        <div
    key={match.id}
    className={`match-card ${
        match.stav === "played" ? "played" : ""
    } ${
        match.stav === "postponed"
            ? "postponed"
            : ""
    } ${
        isJokerActive ? "has-joker" : ""
    }`}
>
    {/* 1. Horní lišta karty - Datum a čas */}
    <div className="match-card-header">
        <span
    className={`match-date ${
        match.stav === "postponed"
            ? "match-date-postponed"
            : ""
    }`}
>
    {renderMatchDate(match)}
</span>
    </div>

    {/* 2. Hlavní řádek: Domácí - Skóre - Hosté */}
    <div className="match-card-body">

        {/* Domácí tým */}
        <div className="team team-home">
            <span className="team-name">
                {match.domaci_tym.nazev}
            </span>

            <div className="logo-box">
                {match.domaci_tym.logo_url ? (
                    <img
                        className="team-logo"
                        src={match.domaci_tym.logo_url}
                        alt={match.domaci_tym.nazev}
                    />
                ) : (
                    <div className="logo-placeholder">⚽</div>
                )}
            </div>
        </div>

        {/* Tip uživatele */}
        <div className="score-box">
            <input
    type="number"
    min="0"
    max="99"
    step="1"
    inputMode="numeric"
    placeholder="-"
    value={input?.domaci_skore ?? ""}
    disabled={isClosed}
    onKeyDown={e => {
        if (
            !/[0-9]/.test(e.key) &&
            ![
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End"
            ].includes(e.key)
        ) {
            e.preventDefault();
        }
    }}
    onChange={e =>
        handleScoreChange(
            match.id,
            "domaci_skore",
            e.target.value
        )
    }
/>

            <span className="score-divider">:</span>

            <input
    type="number"
    min="0"
    max="99"
    step="1"
    inputMode="numeric"
    placeholder="-"
    value={input?.hostujici_skore ?? ""}
    disabled={isClosed}
    onKeyDown={e => {
        if (
            !/[0-9]/.test(e.key) &&
            ![
                "Backspace",
                "Delete",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
                "Home",
                "End"
            ].includes(e.key)
        ) {
            e.preventDefault();
        }
    }}
    onChange={e =>
        handleScoreChange(
            match.id,
            "hostujici_skore",
            e.target.value
        )
    }
/>
        </div>

        {/* Hostující tým */}
        <div className="team team-away">
            <div className="logo-box">
                {match.hostujici_tym.logo_url ? (
                    <img
                        className="team-logo"
                        src={match.hostujici_tym.logo_url}
                        alt={match.hostujici_tym.nazev}
                    />
                ) : (
                    <div className="logo-placeholder">⚽</div>
                )}
            </div>

            <span className="team-name">
                {match.hostujici_tym.nazev}
            </span>
        </div>

    </div>

    {/* 3. Výsledek a body */}
    {isClosed && match.stav === "played" ? (
        <div className="match-result">

            <div className="actual-result-label">
                Skutečný výsledek
            </div>

            <div className="actual-result">
                {match.domaci_skore} : {match.hostujici_skore}
            </div>

            {input && (
                <div
                    className={`points-earned ${
                        tips.find(
                            tip => tip.zapas_id === match.id
                        )?.is_joker
                            ? "joker-points"
                            : ""
                    }`}
                >
                    +{
                        tips.find(
                            tip => tip.zapas_id === match.id
                        )?.body_ziskane ?? 0
                    } bodů
                </div>
            )}

        </div>
    ) : (
        <div className="match-card-footer">
            {!isClosed ? (
                <button
                    type="button"
                    className={`joker-pill ${
                        isJokerActive ? "active" : ""
                    }`}
                    onClick={() => handleJokerChange(match.id)}
                >
                    <span className="joker-icon">🃏</span>
                    <span>Žolík</span>
                </button>
            ) : (
                <span className="closed-badge">
                    🔒 Uzavřeno
                </span>
            )}
        </div>
    )}
</div>
                        
                    );
                })}
            </div>

            {/* Tlačítko uložení */}
            {!selectedRound?.is_closed && (
                <button
                    className="save-tips-button"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Ukládání..." : "Uložit tipy"}
                </button>
            )}

        </div>
    );
}

export default RoundPage;