import {
    useEffect,
    useState
} from "react";

import {
    getAdminRounds,
    closeRound,
    calculateRound,
    recalculate,
    getAdminTeams,
    evaluateSeasonStandings
} from "../../api/admin";

import type { AdminRound } from "../../api/admin";

import "./EvaluationPage.css";


interface Team {
    id: number;
    nazev: string;
}


function EvaluationPage() {

    const [rounds, setRounds] =
        useState<AdminRound[]>([]);

    const [teams, setTeams] =
        useState<Team[]>([]);

    const [selectedRoundId, setSelectedRoundId] =
        useState<number | null>(null);

    const [seasonStandings, setSeasonStandings] =
        useState<Record<number, number>>({});

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    async function loadInitialData() {

        try {

            setLoading(true);
            setError("");

            const [
                roundsData,
                teamsData
            ] = await Promise.all([
                getAdminRounds(),
                getAdminTeams()
            ]);

            setRounds(roundsData);
            setTeams(teamsData);

            if (
                selectedRoundId === null &&
                roundsData.length > 0
            ) {

                setSelectedRoundId(
                    roundsData[0].id
                );
            }

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst data."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadInitialData();

    }, []);


    const selectedRound =
        rounds.find(
            round =>
                round.id === selectedRoundId
        );


    /*
     * =========================================================
     * Vyhodnocení kola
     * =========================================================
     */

    async function handleCloseRound() {

        if (!selectedRound) {
            return;
        }


        if (selectedRound.is_closed) {

            setError(
                "Toto kolo je již uzavřené."
            );

            return;
        }


        const confirmed =
            window.confirm(
                `Opravdu chcete uzavřít ${selectedRound.cislo_kola}. kolo?\n\n` +
                "Po uzavření již uživatelé nebudou moci toto kolo tipovat."
            );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await closeRound(
                selectedRound.id
            );

            setSuccess(
                `Kolo ${selectedRound.cislo_kola} bylo uzavřeno.`
            );

            await loadInitialData();

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se uzavřít kolo."
            );

        } finally {

            setActionLoading(false);
        }
    }


    async function handleCalculateRound() {

        if (!selectedRound) {
            return;
        }


        if (!selectedRound.is_closed) {

            setError(
                "Nejdříve je nutné kolo uzavřít."
            );

            return;
        }


        const confirmed =
            window.confirm(
                `Opravdu chcete vyhodnotit ${selectedRound.cislo_kola}. kolo?\n\n` +
                "Budou vypočítány body ze všech zápasů tohoto kola."
            );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            const result =
                await calculateRound(
                    selectedRound.id
                );

            setSuccess(
                `Kolo ${selectedRound.cislo_kola} bylo vyhodnoceno. ` +
                `Vyhodnoceno zápasů: ${result.matches.length}.`
            );

            await loadInitialData();

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vyhodnotit kolo."
            );

        } finally {

            setActionLoading(false);
        }
    }


    /*
     * =========================================================
     * Přepočet bodů
     * =========================================================
     */

    async function handleRecalculate() {

        const confirmed =
            window.confirm(
                "Opravdu chcete přepočítat všechny body?\n\n" +
                "Tato operace znovu vyhodnotí všechny dostupné tipy."
            );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await recalculate();

            setSuccess(
                "Body byly úspěšně přepočítány."
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se přepočítat body."
            );

        } finally {

            setActionLoading(false);
        }
    }


    /*
     * =========================================================
     * Konečné pořadí sezóny
     * =========================================================
     */


    function getTeamAtPosition(
        position: number
    ): number | undefined {

        return Object.entries(
            seasonStandings
        ).find(
            ([, standing]) =>
                standing === position
        )?.[0]
            ? Number(
                Object.entries(
                    seasonStandings
                ).find(
                    ([, standing]) =>
                        standing === position
                )?.[0]
            )
            : undefined;
    }


    function getSelectedTeamIds(): Set<number> {

        return new Set(
            Object.keys(
                seasonStandings
            ).map(Number)
        );
    }


    function isSeasonStandingComplete(): boolean {

        if (teams.length === 0) {
            return false;
        }

        if (teams.length !== 16) {
            return false;
        }

        for (let position = 1; position <= 16; position++) {

            if (
                getTeamAtPosition(position) === undefined
            ) {
                return false;
            }
        }

        return (
            getSelectedTeamIds().size === 16
        );
    }


    async function handleEvaluateSeason() {

        if (!isSeasonStandingComplete()) {

            setError(
                "Vyplňte kompletní konečné pořadí všech 16 týmů."
            );

            return;
        }


        const confirmed =
            window.confirm(
                "Opravdu chcete vyhodnotit body za konečné pořadí sezóny?\n\n" +
                "Po vyhodnocení budou body za umístění přidány k bodům uživatelů."
            );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);
            setError("");
            setSuccess("");

            await evaluateSeasonStandings(
                seasonStandings
            );

            setSuccess(
                "Konečné pořadí bylo vyhodnoceno a body byly přiděleny."
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vyhodnotit konečné pořadí."
            );

        } finally {

            setActionLoading(false);
        }
    }


    if (loading) {

        return (
            <section className="evaluation-page">

                <h2>Vyhodnocení</h2>

                <p>
                    Načítání dat...
                </p>

            </section>
        );
    }


    const selectedTeamIds =
        getSelectedTeamIds();


    return (

        <section className="evaluation-page">

            <div className="evaluation-page-header">

                <div>

                    <h2>
                        Vyhodnocení
                    </h2>

                    <p>
                        Uzavření kol, vyhodnocení tipů a konečného pořadí sezóny.
                    </p>

                </div>

            </div>


            {error && (

                <div className="evaluation-message error">
                    {error}
                </div>

            )}


            {success && (

                <div className="evaluation-message success">
                    {success}
                </div>

            )}


            {/* =====================================================
                Vyhodnocení kola
                ===================================================== */}

            <div className="evaluation-card">

                <h3>
                    Vyhodnocení kola
                </h3>


                <div className="evaluation-round-selector">

                    <label htmlFor="evaluation-round">
                        Kolo
                    </label>

                    <select
                        id="evaluation-round"
                        value={selectedRoundId ?? ""}
                        disabled={actionLoading}
                        onChange={(event) =>
                            setSelectedRoundId(
                                Number(
                                    event.target.value
                                )
                            )
                        }
                    >

                        <option value="" disabled>
                            Vyberte kolo
                        </option>

                        {rounds.map(round => (

                            <option
                                key={round.id}
                                value={round.id}
                            >
                                {round.cislo_kola}. kolo
                            </option>

                        ))}

                    </select>

                </div>


                {selectedRound ? (

                    <div className="evaluation-round-info">

                        <div>

                            <span className="evaluation-label">
                                Stav kola
                            </span>

                            <span
                                className={
                                    selectedRound.is_closed
                                        ? "evaluation-status closed"
                                        : "evaluation-status open"
                                }
                            >
                                {selectedRound.is_closed
                                    ? "Uzavřené"
                                    : "Otevřené"}
                            </span>

                        </div>


                        <div className="evaluation-actions">

                            <button
                                className="close-round-button"
                                disabled={
                                    actionLoading ||
                                    selectedRound.is_closed
                                }
                                onClick={
                                    handleCloseRound
                                }
                            >
                                {actionLoading
                                    ? "Provádím..."
                                    : "🔒 Uzavřít kolo"}
                            </button>


                            <button
                                className="calculate-round-button"
                                disabled={
                                    actionLoading ||
                                    !selectedRound.is_closed
                                }
                                onClick={
                                    handleCalculateRound
                                }
                                title={
                                    !selectedRound.is_closed
                                        ? "Kolo musí být nejdříve uzavřené."
                                        : undefined
                                }
                            >
                                {actionLoading
                                    ? "Vyhodnocuji..."
                                    : "✓ Vyhodnotit kolo"}
                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="evaluation-empty">

                        <p>
                            Nejsou k dispozici žádná kola.
                        </p>

                    </div>

                )}

            </div>


            {/* =====================================================
                Konečné pořadí sezóny
                ===================================================== */}

            <div className="evaluation-card season-standing-card">

                <div className="season-standing-header">

                    <div>

                        <h3>
                            🏆 Konečné pořadí sezóny
                        </h3>

                        <p>
                            Zadejte skutečné konečné pořadí týmů.
                            Podle něj budou následně přiděleny body za umístění.
                        </p>

                    </div>

                </div>


                <div className="season-standing-list">

                    {Array.from(
                        { length: 16 },
                        (_, index) => {

                            const position =
                                index + 1;

                            const selectedTeamId =
                                getTeamAtPosition(
                                    position
                                );

                            return (

                                <div
                                    className="season-standing-row"
                                    key={position}
                                >

                                    <div
                                        className="season-standing-position"
                                    >

                                        <span>
                                            {position === 1
                                                ? "🥇"
                                                : position === 2
                                                    ? "🥈"
                                                    : position === 3
                                                        ? "🥉"
                                                        : `${position}.`}
                                        </span>

                                    </div>


                                    <select
                                        className="season-standing-select"
                                        value={
                                            selectedTeamId ??
                                            ""
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        onChange={
                                            (event) => {

                                                const teamId =
                                                    Number(
                                                        event.target.value
                                                    );

                                                if (!teamId) {
                                                    return;
                                                }

                                                /*
                                                 * Pokud byl na této pozici
                                                 * již nějaký tým, odstraníme
                                                 * jeho staré umístění.
                                                 */
                                                setSeasonStandings(
                                                    previous => {

                                                        const updated = {
                                                            ...previous
                                                        };

                                                        if (
                                                            selectedTeamId !==
                                                            undefined
                                                        ) {

                                                            delete updated[
                                                                selectedTeamId
                                                            ];
                                                        }

                                                        updated[teamId] =
                                                            position;

                                                        return updated;
                                                    }
                                                );

                                                setError("");
                                                setSuccess("");
                                            }
                                        }
                                    >

                                        <option value="">
                                            Vyberte tým
                                        </option>

                                        {teams.map(team => (

                                            <option
                                                key={team.id}
                                                value={team.id}
                                                disabled={
                                                    selectedTeamIds.has(
                                                        team.id
                                                    ) &&
                                                    team.id !==
                                                        selectedTeamId
                                                }
                                            >
                                                {team.nazev}
                                            </option>

                                        ))}

                                    </select>

                                </div>
                            );
                        }
                    )}

                </div>


                <div className="season-standing-summary">

                    <span>
                        Vyplněno:
                    </span>

                    <strong>
                        {selectedTeamIds.size} / {teams.length}
                    </strong>

                </div>


                <div className="season-standing-actions">

                    <button
                        className="evaluate-season-button"
                        disabled={
                            actionLoading ||
                            !isSeasonStandingComplete()
                        }
                        onClick={
                            handleEvaluateSeason
                        }
                        title={
                            !isSeasonStandingComplete()
                                ? "Nejdříve vyplňte všech 16 pozic."
                                : undefined
                        }
                    >
                        {actionLoading
                            ? "Vyhodnocuji..."
                            : "🏆 Vyhodnotit body za sezónu"}
                    </button>

                </div>

            </div>


            {/* =====================================================
                Přepočet bodů
                ===================================================== */}

            <div className="evaluation-card recalculate-card">

                <div>

                    <h3>
                        Přepočítat body
                    </h3>

                    <p>
                        Znovu přepočítá body všech tipů.
                        Použijte například po ruční úpravě tipu.
                    </p>

                </div>


                <button
                    className="recalculate-button"
                    disabled={
                        actionLoading
                    }
                    onClick={
                        handleRecalculate
                    }
                >
                    {actionLoading
                        ? "Přepočítávám..."
                        : "🔄 Přepočítat body"}
                </button>

            </div>

        </section>
    );
}


export default EvaluationPage;