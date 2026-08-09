
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers, login } from "../api/auth";
import { setToken } from "../utils/auth";
import { useAuth } from "../auth/AuthProvider";

import type { User } from "../types/User";

import "./LoginPage.css";


function LoginPage() {

    const navigate = useNavigate();

    const {
        isAuthenticated,
        refreshUser
    } = useAuth();


    const [users, setUsers] =
        useState<User[]>([]);

    const [selectedUserId, setSelectedUserId] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [loadingUsers, setLoadingUsers] =
        useState(true);


    /*
     * Pokud už je uživatel přihlášený,
     * LoginPage není potřeba zobrazovat.
     */
    useEffect(() => {

        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }

    }, [isAuthenticated, navigate]);


    /*
     * Načtení uživatelů pro dropdown.
     */
    useEffect(() => {

        async function loadUsers() {

            try {

                const data =
                    await getUsers();

                setUsers(data);

                if (data.length > 0) {

                    setSelectedUserId(
                        data[0].id.toString()
                    );

                }

            } catch (error) {

                console.error(error);

                setError(
                    "Nepodařilo se načíst uživatele."
                );

            } finally {

                setLoadingUsers(false);
            }
        }

        loadUsers();

    }, []);


    async function handleLogin(
        event: React.FormEvent
    ) {

        event.preventDefault();

        setError("");
        setLoading(true);


        try {

            const token = await login(
                Number(selectedUserId),
                password
            );


            /*
             * Uložíme JWT.
             */
            setToken(token);


            /*
             * AuthProvider nyní zjistí,
             * kdo je přihlášený.
             */
            await refreshUser();


            /*
             * Po úspěšném přihlášení
             * přejdeme na dashboard.
             */
            navigate("/home", {
                replace: true
            });

        } catch (error) {

            console.error(error);

            setError(
                "Neplatné přihlašovací údaje."
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="login-page">

            <div className="login-card">

                <h1 className="login-title">
                    ⚽ TipLiga
                </h1>


                <p className="login-subtitle">
                    Přihlášení
                </p>


                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <label htmlFor="user">
                        Uživatel
                    </label>


                    <select
                        id="user"
                        value={selectedUserId}
                        onChange={(event) =>
                            setSelectedUserId(
                                event.target.value
                            )
                        }
                        disabled={
                            loadingUsers ||
                            loading
                        }
                    >

                        {loadingUsers ? (

                            <option>
                                Načítání uživatelů...
                            </option>

                        ) : (

                            users.map(user => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.username}
                                </option>

                            ))

                        )}

                    </select>


                    <label htmlFor="password">
                        Heslo
                    </label>


                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Zadejte heslo"
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        disabled={loading}
                    />


                    {error && (

                        <p className="error-message">
                            {error}
                        </p>

                    )}


                    <button
                        type="submit"
                        disabled={
                            loading ||
                            loadingUsers ||
                            users.length === 0 ||
                            !selectedUserId ||
                            !password
                        }
                    >

                        {loading
                            ? "Přihlašuji..."
                            : "Přihlásit"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
}


export default LoginPage;
