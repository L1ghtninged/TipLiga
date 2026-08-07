import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToken, validateToken } from "../utils/auth";
import "./LoginPage.css";

import { getUsers, login } from "../api/auth";
import type { User } from "../types/User";

function LoginPage() {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    async function initialize() {

        const valid = await validateToken();

        if (valid) {
            navigate("/home");
            return;
        }

        await loadUsers();
    }

    initialize();

}, []);
    useEffect(() => {
        loadUsers();
    }, []);


    async function loadUsers() {
        try {
            const data = await getUsers();

            setUsers(data);

            if (data.length > 0) {
                setSelectedUserId(data[0].id.toString());
            }

        } catch (err) {
            console.error(err);
            setError("Nepodařilo se načíst uživatele.");
        }
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const token = await login(
                Number(selectedUserId),
                password
            );

            saveToken(token);

            navigate("/home");

        } catch {

            setError("Neplatné heslo.");

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
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        {users.map(user => (
                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.username}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="password">
                        Heslo
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Zadejte heslo"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Přihlašuji..."
                            : "Přihlásit"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;