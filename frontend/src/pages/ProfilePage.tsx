import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthProvider";

import "./ProfilePage.css";


function ProfilePage() {

    const navigate = useNavigate();

    const {
        user,
        logout
    } = useAuth();


    function handleLogout() {

        logout();

        navigate("/login", {
            replace: true
        });
    }


    if (!user) {
        return null;
    }


    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1 className="profile-title">
                    Profil
                </h1>


                <div className="profile-info">

                    <div className="profile-row">

                        <span className="profile-label">
                            Uživatel
                        </span>

                        <span className="profile-value">
                            {user.username}
                        </span>

                    </div>


                    <div className="profile-row">

                        <span className="profile-label">
                            ID
                        </span>

                        <span className="profile-value">
                            {user.id}
                        </span>

                    </div>

                </div>


                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Odhlásit se
                </button>

            </div>

        </div>
    );
}


export default ProfilePage;
