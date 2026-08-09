import {
    useEffect,
    useState
} from "react";

import {
    createTeam,
    deleteTeam,
    getAdminTeams,
    updateTeamLogo
} from "../../api/admin";

import type { Team } from "../../types/Team";

import "./TeamsPage.css";


function TeamsPage() {

    const [teams, setTeams] =
        useState<Team[]>([]);

    const [teamName, setTeamName] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [creating, setCreating] =
        useState(false);

    const [savingLogoId, setSavingLogoId] =
        useState<number | null>(null);

    const [editingLogoId, setEditingLogoId] =
        useState<number | null>(null);

    const [logoUrl, setLogoUrl] =
        useState("");

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    async function loadTeams() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAdminTeams();

            setTeams(data);

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst týmy."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadTeams();

    }, []);


    async function handleCreateTeam(
        event: React.FormEvent
    ) {

        event.preventDefault();

        const trimmedName =
            teamName.trim();


        if (!trimmedName) {

            setError(
                "Název týmu nesmí být prázdný."
            );

            return;
        }


        try {

            setCreating(true);
            setError("");
            setSuccess("");

            await createTeam(
                trimmedName
            );

            setTeamName("");

            await loadTeams();

            setSuccess(
                `Tým ${trimmedName} byl vytvořen.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vytvořit tým."
            );

        } finally {

            setCreating(false);
        }
    }


    async function handleDeleteTeam(
        team: Team
    ) {

        const confirmed =
            window.confirm(
                `Opravdu chcete smazat tým "${team.nazev}"?`
            );


        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await deleteTeam(
                team.id
            );

            setTeams(
                currentTeams =>
                    currentTeams.filter(
                        currentTeam =>
                            currentTeam.id !== team.id
                    )
            );

            setSuccess(
                `Tým ${team.nazev} byl smazán.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se smazat tým."
            );
        }
    }


    function startEditingLogo(
        team: Team
    ) {

        setEditingLogoId(
            team.id
        );

        setLogoUrl(
            team.logo_url ?? ""
        );

        setError("");
        setSuccess("");
    }


    function cancelEditingLogo() {

        setEditingLogoId(null);
        setLogoUrl("");
    }


    async function handleSaveLogo(
        teamId: number
    ) {

        const trimmedUrl =
            logoUrl.trim();


        if (!trimmedUrl) {

            setError(
                "URL loga nesmí být prázdná."
            );

            return;
        }


        try {

            setSavingLogoId(teamId);
            setError("");
            setSuccess("");

            await updateTeamLogo(
                teamId,
                trimmedUrl
            );

            setTeams(
                currentTeams =>
                    currentTeams.map(
                        team =>
                            team.id === teamId
                                ? {
                                    ...team,
                                    logo_url: trimmedUrl
                                }
                                : team
                    )
            );

            cancelEditingLogo();

            setSuccess(
                "Logo týmu bylo aktualizováno."
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se upravit logo."
            );

        } finally {

            setSavingLogoId(null);
        }
    }


    if (loading) {

        return (
            <section className="teams-page">

                <h2>Týmy</h2>

                <p>
                    Načítání týmů...
                </p>

            </section>
        );
    }


    return (

        <section className="teams-page">

            <div className="teams-page-header">

                <div>

                    <h2>
                        Týmy
                    </h2>

                    <p>
                        Správa fotbalových týmů TipLigy.
                    </p>

                </div>


                <span className="teams-count">

                    {teams.length}
                    {" "}
                    {teams.length === 1
                        ? "tým"
                        : "týmů"}

                </span>

            </div>


            <div className="teams-create-card">

                <h3>
                    Přidat tým
                </h3>


                <form
                    className="teams-create-form"
                    onSubmit={handleCreateTeam}
                >

                    <input
                        type="text"
                        value={teamName}
                        placeholder="Název týmu"
                        maxLength={100}
                        disabled={creating}
                        onChange={
                            event =>
                                setTeamName(
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
                            : "Přidat tým"}
                    </button>

                </form>

            </div>


            {error && (

                <div className="teams-message error">
                    {error}
                </div>

            )}


            {success && (

                <div className="teams-message success">
                    {success}
                </div>

            )}


            <div className="teams-table-card">

                <table className="teams-table">

                    <thead>

                        <tr>

                            <th>
                                Logo
                            </th>

                            <th>
                                Tým
                            </th>

                            <th>
                                Logo URL
                            </th>

                            <th>
                                Akce
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {teams.map(team => (

                            <tr key={team.id}>

                                <td>

                                    {team.logo_url ? (

                                        <img
                                            className="team-logo"
                                            src={team.logo_url}
                                            alt={`Logo ${team.nazev}`}
                                        />

                                    ) : (

                                        <div className="team-logo-placeholder">
                                            —
                                        </div>

                                    )}

                                </td>


                                <td>

                                    <strong>
                                        {team.nazev}
                                    </strong>

                                </td>


                                <td>

                                    {editingLogoId === team.id ? (

                                        <input
                                            className="team-logo-input"
                                            type="url"
                                            value={logoUrl}
                                            placeholder="https://..."
                                            disabled={
                                                savingLogoId === team.id
                                            }
                                            onChange={
                                                event =>
                                                    setLogoUrl(
                                                        event.target.value
                                                    )
                                            }
                                        />

                                    ) : (

                                        <span className="team-logo-url">

                                            {team.logo_url ??
                                                "Bez loga"}

                                        </span>

                                    )}

                                </td>


                                <td>

                                    <div className="team-actions">

                                        {editingLogoId === team.id ? (

                                            <>

                                                <button
                                                    className="save-team-button"
                                                    disabled={
                                                        savingLogoId === team.id
                                                    }
                                                    onClick={() =>
                                                        handleSaveLogo(
                                                            team.id
                                                        )
                                                    }
                                                >
                                                    {savingLogoId === team.id
                                                        ? "Ukládám..."
                                                        : "Uložit"}
                                                </button>


                                                <button
                                                    className="secondary-button"
                                                    disabled={
                                                        savingLogoId === team.id
                                                    }
                                                    onClick={
                                                        cancelEditingLogo
                                                    }
                                                >
                                                    Zrušit
                                                </button>

                                            </>

                                        ) : (

                                            <button
                                                className="edit-team-button"
                                                onClick={() =>
                                                    startEditingLogo(
                                                        team
                                                    )
                                                }
                                            >
                                                🖼 Logo
                                            </button>

                                        )}


                                        <button
                                            className="delete-team-button"
                                            onClick={() =>
                                                handleDeleteTeam(
                                                    team
                                                )
                                            }
                                        >
                                            🗑 Smazat
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}


                        {teams.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="teams-empty"
                                >
                                    Zatím nejsou vytvořeny
                                    žádné týmy.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}


export default TeamsPage;