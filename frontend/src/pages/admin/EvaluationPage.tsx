import {
    useEffect,
    useState
} from "react";

import {
    getAdminRounds,
    closeRound,
    calculateRound,
    recalculate
} from "../../api/admin";

import type { AdminRound } from "../../api/admin";

import "./EvaluationPage.css";


function EvaluationPage() {

    const [rounds, setRounds] =
        useState<AdminRound[]>([]);

    const [selectedRoundId, setSelectedRoundId] =
        useState<number | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    async function loadRounds() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminRounds();

            setRounds(data);

            if (
                selectedRoundId === null &&
                data.length > 0
            ) {

                setSelectedRoundId(
                    data[0].id
                );
            }

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst kola."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadRounds();

    }, []);


    const selectedRound =
        rounds.find(
            round =>
                round.id === selectedRoundId
        );


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

            await loadRounds();

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

            await loadRounds();

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


    if (loading) {

        return (
            <section className="evaluation-page">

                <h2>Vyhodnocení</h2>

                <p>
                    Načítání kol...
                </p>

            </section>
        );
    }


    return (

        <section className="evaluation-page">

            <div className="evaluation-page-header">

                <div>

                    <h2>
                        Vyhodnocení
                    </h2>

                    <p>
                        Uzavření kol a vyhodnocení tipů.
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
                                Number(event.target.value)
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
                    disabled={actionLoading}
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