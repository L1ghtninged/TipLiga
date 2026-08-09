import { useEffect, useState } from "react";

import {
    getAdminRounds,
    getMatchesByRound,
    getAdminTeams,
    createMatch,
    updateMatch,
    closeMatch,
    deleteMatch,
    getTipsForMatch
} from "../../api/admin";

import type { MatchTip } from "../../types/MatchTip";

import type { Round } from "../../types/Round";
import type { Match } from "../../types/Match";

import "./MatchesPage.css";

interface Team {
    id: number;
    nazev: string;
}

function MatchesPage() {

    const [rounds, setRounds] = useState<Round[]>([]);
    const [matches, setMatches] = useState<Match[]>([]);

    const [selectedRoundId, setSelectedRoundId] =
        useState<number | null>(null);

    const [loading, setLoading] = useState(true);
    const [matchesLoading, setMatchesLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [editingMatchId, setEditingMatchId] =
        useState<number | null>(null);

    const [editHomeScore, setEditHomeScore] =
        useState("");

    const [editAwayScore, setEditAwayScore] =
        useState("");

    const [tipsMatchId, setTipsMatchId] =
        useState<number | null>(null);

    const [tips, setTips] =
        useState<MatchTip[]>([]);

    const [tipsLoading, setTipsLoading] =
        useState(false);

    /*
     * New match form
     */

    const [homeTeamId, setHomeTeamId] =
        useState("");

    const [awayTeamId, setAwayTeamId] =
        useState("");

    const [matchDate, setMatchDate] =
        useState("");

    /*
     * Temporary teams.
     *
     * Pokud už máš getAdminTeams(),
     * doporučuji načítat týmy z backendu.
     */

    const [teams, setTeams] = useState<Team[]>([]);
    async function loadInitialData() {

    try {

        setLoading(true);
        setError("");

        const [roundsData, teamsData] =
            await Promise.all([
                getAdminRounds(),
                getAdminTeams()
            ]);

        setRounds(roundsData);
        setTeams(teamsData);

        if (roundsData.length > 0) {
            setSelectedRoundId(roundsData[0].id);
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


    async function loadMatches(roundId: number) {

        try {

            setMatchesLoading(true);
            setError("");

            const data =
                await getMatchesByRound(roundId);

            setMatches(data);

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst zápasy."
            );

        } finally {

            setMatchesLoading(false);
        }
    }


    useEffect(() => {
        loadInitialData();
}, []);


    useEffect(() => {

        if (selectedRoundId === null) {
            return;
        }

        loadMatches(selectedRoundId);

    }, [selectedRoundId]);


    async function handleCreateMatch(
        event: React.FormEvent
    ) {

        event.preventDefault();

        if (selectedRoundId === null) {
            return;
        }

        if (!homeTeamId || !awayTeamId) {

            setError(
                "Vyberte oba týmy."
            );

            return;
        }

        if (homeTeamId === awayTeamId) {

            setError(
                "Domácí a hostující tým musí být rozdílný."
            );

            return;
        }

        if (!matchDate) {

            setError(
                "Vyberte začátek zápasu."
            );

            return;
        }

        try {

            setError("");
            setSuccess("");

            await createMatch({
                kolo_id: selectedRoundId,
                domaci_tym_id: Number(homeTeamId),
                hostujici_tym_id: Number(awayTeamId),
                zacatek_zapasu: matchDate
            });

            setSuccess(
                "Zápas byl vytvořen."
            );

            setHomeTeamId("");
            setAwayTeamId("");
            setMatchDate("");

            await loadMatches(selectedRoundId);

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vytvořit zápas."
            );
        }
    }


    function startEditing(match: Match) {

        setEditingMatchId(match.id);

        setEditHomeScore(
            match.domaci_skore?.toString() ?? ""
        );

        setEditAwayScore(
            match.hostujici_skore?.toString() ?? ""
        );

        setError("");
        setSuccess("");
    }


    function cancelEditing() {

        setEditingMatchId(null);
        setEditHomeScore("");
        setEditAwayScore("");
    }


    async function handleUpdateMatch(
        matchId: number
    ) {

        if (
            editHomeScore === "" ||
            editAwayScore === ""
        ) {

            setError(
                "Vyplňte oba výsledky."
            );

            return;
        }

        try {

            setError("");
            setSuccess("");

            await updateMatch(
                matchId,
                Number(editHomeScore),
                Number(editAwayScore)
            );

            setSuccess(
                "Výsledek byl upraven."
            );

            cancelEditing();

            if (selectedRoundId !== null) {
                await loadMatches(selectedRoundId);
            }

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se upravit zápas."
            );
        }
    }


    async function handleCloseMatch(
        match: Match
    ) {

        const confirmed =
            window.confirm(
                "Opravdu chcete tento zápas uzavřít a vyhodnotit?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await closeMatch(match.id);

            setSuccess(
                "Zápas byl uzavřen a vyhodnocen."
            );

            if (selectedRoundId !== null) {
                await loadMatches(selectedRoundId);
            }

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se uzavřít zápas."
            );
        }
    }


    async function handleDeleteMatch(
        match: Match
    ) {

        const confirmed =
            window.confirm(
                "Opravdu chcete tento zápas smazat?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteMatch(match.id);

            setSuccess(
                "Zápas byl smazán."
            );

            if (selectedRoundId !== null) {
                await loadMatches(selectedRoundId);
            }

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se smazat zápas."
            );
        }
    }


    async function handleShowTips(
        matchId: number
    ) {

        if (tipsMatchId === matchId) {

            setTipsMatchId(null);
            setTips([]);

            return;
        }

        try {

            setTipsLoading(true);
            setError("");

            const data =
                await getTipsForMatch(matchId);

            setTips(data);
            setTipsMatchId(matchId);

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst tipy."
            );

        } finally {

            setTipsLoading(false);
        }
    }


    function getTeamName(teamId: number) {

        const team =
            teams.find(
                team => team.id === teamId
            );

        return team?.nazev ??
            `Tým #${teamId}`;
    }


    function formatDate(
        value: string
    ) {

        return new Date(value)
            .toLocaleString(
                "cs-CZ",
                {
                    dateStyle: "short",
                    timeStyle: "short"
                }
            );
    }


    function getStatusLabel(
        status: Match["stav"]
    ) {

        switch (status) {

            case "scheduled":
                return "Naplánováno";

            case "played":
                return "Odehráno";

            case "postponed":
                return "Odloženo";

            default:
                return status;
        }
    }


    if (loading) {

        return (
            <section className="matches-page">

                <h2>Zápasy</h2>

                <p>
                    Načítání...
                </p>

            </section>
        );
    }


    return (

        <section className="matches-page">

            <header className="matches-header">

                <div>

                    <h2>
                        Zápasy
                    </h2>

                    <p>
                        Správa zápasů jednotlivých kol.
                    </p>

                </div>


                <div className="round-selector">

                    <label htmlFor="round">
                        Kolo
                    </label>

                    <select
                        id="round"
                        value={
                            selectedRoundId ?? ""
                        }
                        onChange={(event) =>
                            setSelectedRoundId(
                                Number(event.target.value)
                            )
                        }
                    >

                        {rounds.map(round => (

                            <option
                                key={round.id}
                                value={round.id}
                            >
                                {round.cislo_kola}
                            </option>

                        ))}

                    </select>

                </div>

            </header>


            {error && (

                <div className="matches-message error">
                    {error}
                </div>

            )}


            {success && (

                <div className="matches-message success">
                    {success}
                </div>

            )}


            <div className="matches-create-card">

                <h3>
                    Přidat zápas
                </h3>


                <form
                    className="matches-create-form"
                    onSubmit={handleCreateMatch}
                >

                    <div>

                        <label>
                            Domácí tým
                        </label>

                        <select
                            value={homeTeamId}
                            onChange={(event) =>
                                setHomeTeamId(
                                    event.target.value
                                )
                            }
                        >

                            <option value="">
                                Vyberte tým
                            </option>

                            {teams.map(team => (

                                <option
                                    key={team.id}
                                    value={team.id}
                                >
                                    {team.nazev}
                                </option>

                            ))}

                        </select>

                    </div>


                    <div>

                        <label>
                            Hostující tým
                        </label>

                        <select
                            value={awayTeamId}
                            onChange={(event) =>
                                setAwayTeamId(
                                    event.target.value
                                )
                            }
                        >

                            <option value="">
                                Vyberte tým
                            </option>

                            {teams.map(team => (

                                <option
                                    key={team.id}
                                    value={team.id}
                                >
                                    {team.nazev}
                                </option>

                            ))}

                        </select>

                    </div>


                    <div>

                        <label>
                            Začátek
                        </label>

                        <input
                            type="datetime-local"
                            value={matchDate}
                            onChange={(event) =>
                                setMatchDate(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    <button
                        type="submit"
                    >
                        Přidat zápas
                    </button>

                </form>

            </div>


            <div className="matches-list">

                {matchesLoading ? (

                    <p>
                        Načítání zápasů...
                    </p>

                ) : matches.length === 0 ? (

                    <div className="matches-empty">

                        <h3>
                            Žádné zápasy
                        </h3>

                        <p>
                            Toto kolo zatím nemá žádné zápasy.
                        </p>

                    </div>

                ) : (

                    matches.map(match => (

                        <article
                            className="match-card"
                            key={match.id}
                        >

                            <div className="match-main">

                                <div className="match-teams">

                                    <strong>
                                        {getTeamName(
                                            match.domaci_tym_id
                                        )}
                                    </strong>

                                    <span>
                                        vs.
                                    </span>

                                    <strong>
                                        {getTeamName(
                                            match.hostujici_tym_id
                                        )}
                                    </strong>

                                </div>


                                <div className="match-info">

                                    <span>
                                        {formatDate(
                                            match.zacatek_zapasu
                                        )}
                                    </span>

                                    <span
                                        className={`match-status ${match.stav}`}
                                    >
                                        {getStatusLabel(
                                            match.stav
                                        )}
                                    </span>

                                </div>

                            </div>


                            {editingMatchId === match.id ? (

                                <div className="match-edit">

                                    <input
                                        type="number"
                                        min="0"
                                        value={editHomeScore}
                                        onChange={(event) =>
                                            setEditHomeScore(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        :
                                    </span>

                                    <input
                                        type="number"
                                        min="0"
                                        value={editAwayScore}
                                        onChange={(event) =>
                                            setEditAwayScore(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <button
                                        onClick={() =>
                                            handleUpdateMatch(
                                                match.id
                                            )
                                        }
                                    >
                                        Uložit výsledek
                                    </button>

                                    <button
                                        className="secondary-button"
                                        onClick={
                                            cancelEditing
                                        }
                                    >
                                        Zrušit
                                    </button>

                                </div>

                            ) : (

                                <div className="match-score">

                                    {match.domaci_skore !== null &&
                                    match.hostujici_skore !== null
                                        ? (
                                            <>
                                                <strong>
                                                    {match.domaci_skore}
                                                </strong>

                                                <span>
                                                    :
                                                </span>

                                                <strong>
                                                    {match.hostujici_skore}
                                                </strong>
                                            </>
                                        )
                                        : (
                                            <span>
                                                – : –
                                            </span>
                                        )
                                    }

                                </div>

                            )}


                            <div className="match-actions">

                                <button
                                    onClick={() =>
                                        startEditing(match)
                                    }
                                >
                                    ✏️ Upravit
                                </button>


                                <button
                                    onClick={() =>
                                        handleShowTips(
                                            match.id
                                        )
                                    }
                                >
                                    👁 Tipy
                                </button>


                                {match.stav !== "played" && (

                                    <button
                                        onClick={() =>
                                            handleCloseMatch(
                                                match
                                            )
                                        }
                                    >
                                        ✓ Uzavřít
                                    </button>

                                )}


                                <button
                                    className="danger-button"
                                    onClick={() =>
                                        handleDeleteMatch(
                                            match
                                        )
                                    }
                                >
                                    🗑 Smazat
                                </button>

                            </div>


                            {tipsMatchId === match.id && (

                                <div className="match-tips">

                                    <h4>
                                        Tipy
                                    </h4>

                                    {tipsLoading ? (

                                        <p>
                                            Načítání tipů...
                                        </p>

                                    ) : tips.length === 0 ? (

                                        <p>
                                            Nikdo zatím netipoval.
                                        </p>

                                    ) : (

                                        <table>

                                            <thead>

                                                <tr>
                                                    <th>Uživatel</th>
                                                    <th>Tip</th>
                                                    <th>Body</th>
                                                    <th>Joker</th>
                                                </tr>

                                            </thead>

                                            <tbody>

                                                {tips.map(tip => (

                                                    <tr
                                                        key={tip.id}
                                                    >

                                                        <td>
                                                            {tip.uzivatel_id}
                                                        </td>

                                                        <td>
                                                            {tip.predpoved_domaci_skore}
                                                            {" : "}
                                                            {tip.predpoved_hostujici_skore}
                                                        </td>

                                                        <td>
                                                            {tip.body_ziskane}
                                                        </td>

                                                        <td>
                                                            {tip.is_joker
                                                                ? "🃏"
                                                                : "-"
                                                            }
                                                        </td>

                                                    </tr>

                                                ))}

                                            </tbody>

                                        </table>

                                    )}

                                </div>

                            )}

                        </article>

                    ))

                )}

            </div>

        </section>
    );
}

export default MatchesPage;