import {
    useEffect,
    useState
} from "react";

import {
    createUser,
    deleteUser,
    getAdminUsers
} from "../../api/admin";

import type { User } from "../../types/User";

import "./UsersPage.css";


function UsersPage() {

    const [users, setUsers] =
        useState<User[]>([]);

    const [username, setUsername] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [creating, setCreating] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    async function loadUsers() {

        try {

            setError("");

            const data =
                await getAdminUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

            setError(
                "Nepodařilo se načíst uživatele."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadUsers();

    }, []);


    async function handleCreateUser(
        event: React.FormEvent
    ) {

        event.preventDefault();

        const trimmedUsername =
            username.trim();

        if (!trimmedUsername) {

            setError(
                "Uživatelské jméno nesmí být prázdné."
            );

            return;
        }


        try {

            setCreating(true);
            setError("");
            setSuccess("");

            const user =
                await createUser(
                    trimmedUsername
                );

            setUsers(
                currentUsers => [
                    ...currentUsers,
                    user
                ]
            );

            setUsername("");

            setSuccess(
                `Uživatel ${user.username} byl vytvořen.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se vytvořit uživatele."
            );

        } finally {

            setCreating(false);
        }
    }


    async function handleDeleteUser(
        user: User
    ) {

        const confirmed =
            window.confirm(
                `Opravdu chcete smazat uživatele "${user.username}"?`
            );

        if (!confirmed) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await deleteUser(
                user.username
            );

            setUsers(
                currentUsers =>
                    currentUsers.filter(
                        currentUser =>
                            currentUser.id !== user.id
                    )
            );

            setSuccess(
                `Uživatel ${user.username} byl smazán.`
            );

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nepodařilo se smazat uživatele."
            );
        }
    }


    if (loading) {

        return (
            <section className="users-page">

                <h2>Uživatelé</h2>

                <p>Načítání uživatelů...</p>

            </section>
        );
    }


    return (

        <section className="users-page">

            <div className="users-page-header">

                <div>
                    <h2>Uživatelé</h2>

                    <p>
                        Správa uživatelů TipLigy.
                    </p>
                </div>

                <span className="users-count">
                    {users.length} uživatelů
                </span>

            </div>


            <div className="users-create-card">

                <h3>
                    Přidat uživatele
                </h3>

                <form
                    className="users-create-form"
                    onSubmit={handleCreateUser}
                >

                    <input
                        type="text"
                        value={username}
                        placeholder="Uživatelské jméno"
                        maxLength={50}
                        disabled={creating}
                        onChange={(event) =>
                            setUsername(
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
                            : "Přidat uživatele"}
                    </button>

                </form>

            </div>


            {error && (

                <div className="users-message error">
                    {error}
                </div>

            )}


            {success && (

                <div className="users-message success">
                    {success}
                </div>

            )}


            <div className="users-table-card">

                <table className="users-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Uživatel</th>
                            <th>Body</th>
                            <th>Akce</th>
                        </tr>

                    </thead>


                    <tbody>

                        {users.map(user => (

                            <tr key={user.id}>

                                <td>
                                    {user.id}
                                </td>

                                <td>
                                    {user.username}
                                </td>

                                <td>
                                    {user.pocet_bodu ?? 0}
                                </td>

                                <td>

                                    <button
                                        className="delete-user-button"
                                        onClick={() =>
                                            handleDeleteUser(
                                                user
                                            )
                                        }
                                    >
                                        🗑 Smazat
                                    </button>

                                </td>

                            </tr>

                        ))}


                        {users.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="users-empty"
                                >
                                    Zatím nejsou vytvořeni
                                    žádní uživatelé.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}


export default UsersPage;