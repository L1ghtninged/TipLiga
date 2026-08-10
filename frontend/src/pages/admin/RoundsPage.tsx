import {
    useEffect,
    useState
} from "react";

import {
    createRounds,
    deleteRounds,
    getAdminRounds,
    closeRound,
    reopenRound,
    type AdminRound
} from "../../api/admin";

import "./RoundsPage.css";


function RoundsPage() {

    const [rounds, setRounds] =
        useState<AdminRound[]>([]);

    const [roundCount, setRoundCount] =
        useState("");

    const [selectedRoundIds, setSelectedRoundIds] =
        useState<number[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [creating, setCreating] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [closingRoundId, setClosingRoundId] =
        useState<number | null>(null);
    const [reopeningRoundId, setReopeningRoundId] =
    useState<number | null>(null);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    async function handleReopenRound(
    round: AdminRound
) {

    const confirmed =
        window.confirm(
            `Opravdu chcete znovu otevřít ${round.cislo_kola}. kolo?`
        );

    if (!confirmed) {
        return;
    }

    try {

        setReopeningRoundId(round.id);
        setError("");
        setSuccess("");

        await reopenRound(round.id);

        setRounds(
            currentRounds =>
                currentRounds.map(
                    currentRound =>
                        currentRound.id === round.id
                            ? {
                                ...currentRound,
                                is_closed: false
                            }
                            : currentRound
                )
        );

        setSuccess(
            `Kolo ${round.cislo_kola} bylo znovu otevřeno.`
        );

    } catch (error) {

        console.error(error);

        setError(
            error instanceof Error
                ? error.message
                : "Nepodařilo se znovu otevřít kolo."
        );

    } finally {

        setReopeningRoundId(null);
    }
}

    async function loadRounds() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminRounds();

            setRounds(data);

            setSelectedRoundIds([]);

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


    async function handleCreateRounds(
        event: React.FormEvent
    ) {

        event.preventDefault();

        const count =
            Number(roundCount);


        if (
            !Number.isInteger(count) ||
            count <= 0
        ) {

            setError(
                "Počet kol musí být kladné celé číslo."
            );

            return;
        }


        try {

            setCreating(true);
            setError("");
            setSuccess("");

            await createRounds(count);

            setRoundCount("");

            await loadRounds();

            setSuccess(
                `${count} ${count === 1 ? "kolo bylo" : "kol bylo"} vytvořeno.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vytvořit kola."
            );

        } finally {

            setCreating(false);
        }
    }


    function toggleRoundSelection(
        round: AdminRound
    ) {

        if (round.is_closed) {
            return;
        }

        setSelectedRoundIds(
            currentIds => {

                if (
                    currentIds.includes(round.id)
                ) {

                    return currentIds.filter(
                        id => id !== round.id
                    );
                }

                return [
                    ...currentIds,
                    round.id
                ];
            }
        );
    }


    function toggleSelectAll() {

        const openRoundIds =
            rounds
                .filter(round => !round.is_closed)
                .map(round => round.id);


        const allSelected =
            openRoundIds.length > 0 &&
            openRoundIds.every(
                id =>
                    selectedRoundIds.includes(id)
            );


        if (allSelected) {

            setSelectedRoundIds([]);

        } else {

            setSelectedRoundIds(
                openRoundIds
            );
        }
    }


    async function handleDeleteSelected() {

        if (
            selectedRoundIds.length === 0
        ) {
            return;
        }


        const confirmed =
            window.confirm(
                `Opravdu chcete smazat ${selectedRoundIds.length} vybraných kol?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setDeleting(true);
            setError("");
            setSuccess("");

            await deleteRounds(
                selectedRoundIds
            );

            setSelectedRoundIds([]);

            await loadRounds();

            setSuccess(
                "Vybraná kola byla smazána."
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se smazat kola."
            );

        } finally {

            setDeleting(false);
        }
    }


    async function handleCloseRound(
        round: AdminRound
    ) {

        const confirmed =
            window.confirm(
                `Opravdu chcete uzavřít ${round.cislo_kola}. kolo?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setClosingRoundId(round.id);
            setError("");
            setSuccess("");

            await closeRound(round.id);

            setRounds(
                currentRounds =>
                    currentRounds.map(
                        currentRound =>
                            currentRound.id === round.id
                                ? {
                                    ...currentRound,
                                    is_closed: true
                                }
                                : currentRound
                    )
            );

            setSelectedRoundIds(
                currentIds =>
                    currentIds.filter(
                        id => id !== round.id
                    )
            );

            setSuccess(
                `Kolo ${round.cislo_kola} bylo uzavřeno.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se uzavřít kolo."
            );

        } finally {

            setClosingRoundId(null);
        }
    }


    if (loading) {

        return (
            <section className="rounds-page">

                <h2>Kola</h2>

                <p>
                    Načítání kol...
                </p>

            </section>
        );
    }


    const openRoundIds =
        rounds
            .filter(round => !round.is_closed)
            .map(round => round.id);


    const allOpenRoundsSelected =
        openRoundIds.length > 0 &&
        openRoundIds.every(
            id =>
                selectedRoundIds.includes(id)
        );


    return (

        <section className="rounds-page">

            <div className="rounds-page-header">

                <div>

                    <h2>
                        Kola
                    </h2>

                    <p>
                        Správa kol TipLigy.
                    </p>

                </div>


                <span className="rounds-count">

                    {rounds.length}
                    {" "}
                    {rounds.length === 1
                        ? "kolo"
                        : "kol"}

                </span>

            </div>


            <div className="rounds-create-card">

                <h3>
                    Vytvořit kola
                </h3>

                <form
                    className="rounds-create-form"
                    onSubmit={handleCreateRounds}
                >

                    <input
                        type="number"
                        min="1"
                        value={roundCount}
                        placeholder="Počet kol"
                        disabled={creating}
                        onChange={
                            event =>
                                setRoundCount(
                                    event.target.value
                                )
                        }
                    />


                    <button
                        type="submit"
                        disabled={creating}
                    >
                        {creating
                            ? "Vytvářím..."
                            : "Vytvořit kola"}
                    </button>

                </form>

                <p className="rounds-create-hint">
                    Vytvoří se následující dostupná čísla kol.
                </p>

            </div>


            {error && (

                <div className="rounds-message error">
                    {error}
                </div>

            )}


            {success && (

                <div className="rounds-message success">
                    {success}
                </div>

            )}


            <div className="rounds-toolbar">

                <label className="rounds-select-all">

                    <input
                        type="checkbox"
                        checked={
                            allOpenRoundsSelected
                        }
                        disabled={
                            openRoundIds.length === 0
                        }
                        onChange={
                            toggleSelectAll
                        }
                    />

                    <span>
                        Vybrat všechna otevřená kola
                    </span>

                </label>


                {selectedRoundIds.length > 0 && (

                    <button
                        className="delete-selected-rounds-button"
                        disabled={deleting}
                        onClick={
                            handleDeleteSelected
                        }
                    >
                        {deleting
                            ? "Mažu..."
                            : `🗑 Smazat vybraná (${selectedRoundIds.length})`}
                    </button>

                )}

            </div>


            <div className="rounds-table-card">

                <table className="rounds-table">

                    <thead>

                        <tr>

                            <th className="round-checkbox-column">
                            </th>

                            <th>
                                Kolo
                            </th>

                            <th>
                                Stav
                            </th>

                            <th>
                                Akce
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {rounds.map(round => (

                            <tr key={round.id}>

                                <td>

                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedRoundIds.includes(
                                                round.id
                                            )
                                        }
                                        disabled={
                                            round.is_closed
                                        }
                                        onChange={() =>
                                            toggleRoundSelection(
                                                round
                                            )
                                        }
                                    />

                                </td>


                                <td>

                                    <strong>
                                        {round.cislo_kola}. kolo
                                    </strong>

                                </td>


                                <td>

                                    <span
                                        className={
                                            round.is_closed
                                                ? "round-status closed"
                                                : "round-status open"
                                        }
                                    >
                                        {round.is_closed
                                            ? "Uzavřené"
                                            : "Otevřené"}
                                    </span>

                                </td>


                                <td>

                                    <div className="round-actions">

    {!round.is_closed ? (

        <button
            className="close-round-button"
            disabled={
                closingRoundId === round.id
            }
            onClick={() =>
                handleCloseRound(round)
            }
        >
            {closingRoundId === round.id
                ? "Uzavírám..."
                : "✓ Uzavřít"}
        </button>

    ) : (

        <button
            className="reopen-round-button"
            disabled={
                reopeningRoundId === round.id
            }
            onClick={() =>
                handleReopenRound(round)
            }
        >
            {reopeningRoundId === round.id
                ? "Otevírám..."
                : "↩ Znovu otevřít"}
        </button>

    )}

</div>

                                </td>

                            </tr>

                        ))}


                        {rounds.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="rounds-empty"
                                >
                                    Zatím nejsou vytvořena
                                    žádná kola.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}


export default RoundsPage;