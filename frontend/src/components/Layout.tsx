import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

import "./Layout.css";


function Layout() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();


    function handleLogout() {

        logout();

        navigate("/login");
    }


    return (
        <div className="layout">

            <header className="navbar">

                <div
                    className="navbar-logo"
                    onClick={() => navigate("/home")}
                >
                    ⚽ TipLiga
                </div>


                <nav className="navbar-links">

                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Domů
                    </NavLink>


                    <NavLink
                        to="/round/1"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Tipování
                    </NavLink>


                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Žebříček
                    </NavLink>

                </nav>


                <div className="navbar-user">

                    <button
                        className="user-button"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        {user?.username ?? "Uživatel"}
                    </button>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Odhlásit
                    </button>

                </div>

            </header>


            <main className="layout-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;