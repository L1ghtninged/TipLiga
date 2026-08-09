import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getRounds,
    getRoundMatches,
    type Match
} from "../api/rounds";

import {
    getTips,
    saveTip,
    type Tip
} from "../api/tips";

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

    const [tipInputs, setTipInputs] = useState<
        Record<number, TipInput>
    >({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);


    /*
     * Načtení všech kol
     */
    useEffect(() => {

        async function loadRounds() {

            try {

                const data = await getRounds();

                setRounds(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Nepodařilo se načíst kola."
                );
            }
        }

        loadRounds();

    }, []);


    /*
     * Načtení zápasů a tipů vybraného kola
     */
    useEffect(() => {

        if (!selectedRoundId) {
            return;
        }

        async function loadRound() {

            setLoading(true);
            setError(null);
            setSaveMessage(null);

            try {

                const [matchesData, tipsData] =
                    await Promise.all([
                        getRoundMatches(selectedRoundId),
                        getTips(selectedRoundId)
                    ]);

                setMatches(matchesData.matches);
                setTips(tipsData);

                /*
                 * Převod existujících tipů
                 * do stavu formuláře.
                 */
                const inputs: Record<number, TipInput> = {};

                for (const tip of tipsData) {

                    inputs[tip.zapas_id] = {
                        domaci_skore:
                            String(tip.predpoved_domaci_skore),

                        hostujici_skore:
                            String(tip.predpoved_hostujici_skore),

                        is_joker:
                            tip.is_joker
                    };
                }

                setTipInputs(inputs);

            } catch (error) {

                console.error(error);

                setError(
                    "Nepodařilo se načíst data kola."
                );

            } finally {

                setLoading(false);
            }
        }

        loadRound();

    }, [selectedRoundId]);


    /*
     * Stav vybraného kola
     */
    const selectedRound = rounds.find(
        round => round.id === selectedRoundId
    );


    /*
     * Změna skóre
     */
    function handleScoreChange(
        matchId: number,
        field: "domaci_skore" | "hostujici_skore",
        value: string
    ) {

        setTipInputs(previous => ({

            ...previous,

            [matchId]: {

                domaci_skore:
                    previous[matchId]?.domaci_skore ?? "",

                hostujici_skore:
                    previous[matchId]?.hostujici_skore ?? "",

                is_joker:
                    previous[matchId]?.is_joker ?? false,

                [field]: value
            }
        }));
    }


    /*
     * Změna jokera
     *
     * Pokud uživatel označí nový joker,
     * všechny ostatní jokery se vypnou.
     */
    function handleJokerChange(
        matchId: number
    ) {

        setTipInputs(previous => {

            const current =
                previous[matchId]?.is_joker ?? false;

            const newState: Record<number, TipInput> = {};

            for (const [id, input] of Object.entries(previous)) {

                newState[Number(id)] = {
                    ...input,
                    is_joker: false
                };
            }

            newState[matchId] = {

                domaci_skore:
                    previous[matchId]?.domaci_skore ?? "",

                hostujici_skore:
                    previous[matchId]?.hostujici_skore ?? "",

                /*
                 * Pokud byl joker zapnutý,
                 * vypneme ho.
                 *
                 * Pokud byl vypnutý,
                 * zapneme ho a ostatní vypneme.
                 */
                is_joker: !current
            };

            return newState;
        });
    }


    /*
     * Uložení všech tipů
     */
    async function handleSave() {

    if (!selectedRound) {
        return;
    }

    setSaving(true);
    setError(null);
    setSaveMessage(null);

    try {

        /*
         * Najdeme původního a nového jokera.
         */
        const oldJoker = tips.find(
            tip => tip.is_joker
        );

        const newJokerEntry = Object.entries(tipInputs)
            .find(([, input]) => input.is_joker);

        const newJokerId = newJokerEntry
            ? Number(newJokerEntry[0])
            : null;


        /*
         * Pokud se joker přesouvá na jiný zápas,
         * nejdříve zrušíme původního jokera.
         */
        if (
            oldJoker &&
            newJokerId !== null &&
            oldJoker.zapas_id !== newJokerId
        ) {

            const oldInput =
                tipInputs[oldJoker.zapas_id];

            if (oldInput) {

                await saveTip(
                    selectedRoundId,
                    {
                        zapas_id: oldJoker.zapas_id,

                        predpoved_domaci_skore:
                            Number(oldInput.domaci_skore),

                        predpoved_hostujici_skore:
                            Number(oldInput.hostujici_skore),

                        is_joker: false
                    }
                );
            }
        }


        /*
         * Projdeme všechny tipy.
         */
        for (const match of matches) {

            const input =
                tipInputs[match.id];

            if (
                !input ||
                input.domaci_skore === "" ||
                input.hostujici_skore === ""
            ) {
                continue;
            }


            const existingTip =
                tips.find(
                    tip => tip.zapas_id === match.id
                );


            /*
             * Pokud tip existuje a jeho hodnoty
             * se nezměnily, nic neposíláme.
             */
            if (
                existingTip &&
                existingTip.predpoved_domaci_skore ===
                    Number(input.domaci_skore) &&
                existingTip.predpoved_hostujici_skore ===
                    Number(input.hostujici_skore) &&
                existingTip.is_joker ===
                    input.is_joker
            ) {
                continue;
            }


            /*
             * Pokud jsme právě přesouvali jokera,
             * starý tip už jsme aktualizovali výše.
             */
            if (
                oldJoker &&
                oldJoker.zapas_id === match.id &&
                newJokerId !== null &&
                oldJoker.zapas_id !== newJokerId
            ) {
                continue;
            }


            await saveTip(
                selectedRoundId,
                {
                    zapas_id: match.id,

                    predpoved_domaci_skore:
                        Number(input.domaci_skore),

                    predpoved_hostujici_skore:
                        Number(input.hostujici_skore),

                    is_joker:
                        input.is_joker
                }
            );
        }


        /*
         * Načteme aktuální stav z backendu.
         */
        const updatedTips =
            await getTips(selectedRoundId);

        setTips(updatedTips);


        /*
         * Synchronizujeme formulář.
         */
        const updatedInputs: Record<number, TipInput> = {};

        for (const tip of updatedTips) {

            updatedInputs[tip.zapas_id] = {

                domaci_skore:
                    String(tip.predpoved_domaci_skore),

                hostujici_skore:
                    String(tip.predpoved_hostujici_skore),

                is_joker:
                    tip.is_joker
            };
        }

        setTipInputs(updatedInputs);


        setSaveMessage(
            "Tipy byly úspěšně uloženy."
        );

    } catch (error) {

        console.error(error);

        setError(
            error instanceof Error
                ? error.message
                : "Nepodařilo se uložit tipy."
        );

    } finally {

        setSaving(false);
    }
}


    /*
     * Stav kola
     */
    function getRoundStatus(
        round: Round
    ): "open" | "closed" {

        if (round.is_closed) {
            return "closed";
        }

        return "open";
    }


    if (loading) {

        return (
            <div className="round-page">
                <p>Načítání...</p>
            </div>
        );
    }


    if (error && !matches.length) {

        return (
            <div className="round-page">
                <p>{error}</p>
            </div>
        );
    }


    return (

        <div className="round-page">

            <div className="round-header">

                <h1>Tipování</h1>


                <div className="round-selector">

                    {rounds.map(round => (

                        <button
                            key={round.id}
                            className={`
                                round-number
                                ${getRoundStatus(round)}
                                ${
                                    round.id === selectedRoundId
                                        ? "selected"
                                        : ""
                                }
                            `}
                            onClick={() =>
                                navigate(
                                    `/round/${round.id}`
                                )
                            }
                        >
                            {round.cislo_kola}
                        </button>

                    ))}

                </div>

            </div>


            <div className="round-title">

                <h2>
                    {selectedRound?.cislo_kola}. kolo
                </h2>

            </div>


            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}


            {saveMessage && (
                <p className="success-message">
                    {saveMessage}
                </p>
            )}


            <div className="matches">

                {matches.map(match => {

                    const input =
                        tipInputs[match.id];

                    const isClosed =
                        selectedRound?.is_closed ?? false;

                    return (

                        <div
                            key={match.id}
                            className="match-card"
                        >

                            <div className="match-info">

                                <span>
                                    Tým {match.domaci_tym_id}
                                </span>

                                <span className="match-time">
                                    {new Date(
                                        match.zacatek_zapasu
                                    ).toLocaleString(
                                        "cs-CZ"
                                    )}
                                </span>

                                <span>
                                    Tým {match.hostujici_tym_id}
                                </span>

                            </div>


                            <div className="score-inputs">

                                <input
                                    type="number"
                                    min="0"
                                    value={
                                        input?.domaci_skore ?? ""
                                    }
                                    disabled={isClosed}
                                    onChange={event =>
                                        handleScoreChange(
                                            match.id,
                                            "domaci_skore",
                                            event.target.value
                                        )
                                    }
                                />

                                <span>:</span>

                                <input
                                    type="number"
                                    min="0"
                                    value={
                                        input?.hostujici_skore ?? ""
                                    }
                                    disabled={isClosed}
                                    onChange={event =>
                                        handleScoreChange(
                                            match.id,
                                            "hostujici_skore",
                                            event.target.value
                                        )
                                    }
                                />

                            </div>


                            <label className="joker-checkbox">

                                <input
                                    type="checkbox"
                                    checked={
                                        input?.is_joker ?? false
                                    }
                                    disabled={isClosed}
                                    onChange={() =>
                                        handleJokerChange(
                                            match.id
                                        )
                                    }
                                />

                                Joker

                            </label>

                        </div>
                    );
                })}

            </div>


            {!selectedRound?.is_closed && (

                <button
                    className="save-tips-button"
                    onClick={handleSave}
                    disabled={saving}
                >

                    {saving
                        ? "Ukládání..."
                        : "Uložit tipy"}

                </button>

            )}

        </div>
    );
}

export default RoundPage;