import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    loginAdmin
} from "../../api/auth";

import {
    getAdminToken,
    saveAdminToken
} from "../../utils/adminAuth";

import "./AdminLoginPage.css";


function AdminLoginPage() {

    const navigate = useNavigate();

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    useEffect(() => {

        const token = getAdminToken();

        if (token) {

            navigate("/admin", {
                replace: true
            });
        }

    }, [navigate]);


    async function handleLogin(
        event: React.FormEvent
    ) {

        event.preventDefault();

        setError("");
        setLoading(true);


        try {

            const token =
                await loginAdmin(password);


            saveAdminToken(token);


            navigate("/admin", {
                replace: true
            });

        } catch (error) {

            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Přihlášení se nezdařilo."
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                <h1>
                    ⚽ TipLiga
                </h1>

                <p className="admin-login-subtitle">
                    Administrace
                </p>


                <form
                    onSubmit={handleLogin}
                    className="admin-login-form"
                >

                    <label htmlFor="admin-password">
                        Heslo
                    </label>


                    <input
                        id="admin-password"
                        type="password"
                        value={password}
                        placeholder="Zadejte heslo"
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        autoFocus
                        required
                    />


                    {error && (

                        <p className="admin-login-error">
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


export default AdminLoginPage;

