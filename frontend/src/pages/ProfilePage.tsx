import { useEffect, useState } from "react";

import { getProfile } from "../api/profile";
import type { ProfileData } from "../types/Profile";

import "./ProfilePage.css";


function ProfilePage() {

    const [profile, setProfile] =
        useState<ProfileData | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadProfile() {

            try {

                setLoading(true);
                setError("");

                const data = await getProfile();

                setProfile(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Nepodařilo se načíst profil."
                );

            } finally {

                setLoading(false);
            }
        }

        loadProfile();

    }, []);


    if (loading) {

        return (
            <section className="profile-page">

                <h2>Profil</h2>

                <p>
                    Načítání profilu...
                </p>

            </section>
        );
    }


    if (error) {

        return (
            <section className="profile-page">

                <h2>Profil</h2>

                <div className="profile-message error">
                    {error}
                </div>

            </section>
        );
    }


    if (!profile) {
        return null;
    }


    return (

        <section className="profile-page">

            <div className="profile-header">

                <div>

                    <h1>
                        {profile.username}
                    </h1>

                    <p>
                        Profil hráče
                    </p>

                </div>

            </div>


            <div className="profile-stats">

                <div className="profile-stat">

                    <span className="profile-stat-label">
                        Body
                    </span>

                    <strong className="profile-stat-value">
                        {profile.pocet_bodu}
                    </strong>

                </div>


                <div className="profile-stat">

                    <span className="profile-stat-label">
                        Pořadí
                    </span>

                    <strong className="profile-stat-value">
                        {profile.poradi !== null
                            ? `${profile.poradi}.`
                            : "—"}
                    </strong>

                </div>

            </div>


            <section className="profile-section">

                <div className="profile-section-header">

                    <h2>
                        Tabulka ligy
                    </h2>

                </div>


                <div className="profile-table-wrapper">

                    <table className="profile-table">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Tým
                                </th>

                                <th>
                                    Body
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {profile.teams_table.map(team => (

                                <tr key={team.tym_id}>

                                    <td>
                                        {team.pozice}.
                                    </td>


                                    <td>

                                        <div className="profile-team">

                                            {team.logo_url ? (

                                                <img
                                                    className="profile-team-logo"
                                                    src={team.logo_url}
                                                    alt={`Logo ${team.nazev}`}
                                                />

                                            ) : (

                                                <div className="profile-team-logo-placeholder">
                                                    —
                                                </div>

                                            )}


                                            <span>
                                                {team.nazev}
                                            </span>

                                        </div>

                                    </td>


                                    <td>
                                        <strong>
                                            {team.body}
                                        </strong>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>


            <section className="profile-section">

                <div className="profile-section-header">

                    <h2>
                        Moje předpověď
                    </h2>

                    {!profile.season_ended && (

                        <span className="profile-season-status">
                            Sezóna probíhá
                        </span>

                    )}

                </div>


                {profile.season_prediction.length === 0 ? (

                    <div className="profile-empty">
                        Předpověď umístění nebyla zadána.
                    </div>

                ) : (

                    <div className="profile-table-wrapper">

                        <table className="profile-table">

                            <thead>

                                <tr>

                                    <th>
                                        Předpověď
                                    </th>

                                    <th>
                                        Tým
                                    </th>

                                    {profile.season_ended && (

                                        <th>
                                            Body
                                        </th>

                                    )}

                                </tr>

                            </thead>


                            <tbody>

                                {[
                                    ...profile.season_prediction
                                ]
                                    .sort(
                                        (a, b) =>
                                            a.predpoved_pozice -
                                            b.predpoved_pozice
                                    )
                                    .map(prediction => (

                                        <tr
                                            key={prediction.tym_id}
                                        >

                                            <td>
                                                <strong>
                                                    {prediction.predpoved_pozice}.
                                                </strong>
                                            </td>


                                            <td>

                                                <div className="profile-team">

                                                    {prediction.logo_url ? (

                                                        <img
                                                            className="profile-team-logo"
                                                            src={prediction.logo_url}
                                                            alt={`Logo ${prediction.nazev}`}
                                                        />

                                                    ) : (

                                                        <div className="profile-team-logo-placeholder">
                                                            —
                                                        </div>

                                                    )}


                                                    <span>
                                                        {prediction.nazev}
                                                    </span>

                                                </div>

                                            </td>


                                            {profile.season_ended && (

                                                <td>
                                                    <strong>
                                                        {prediction.body_ziskane}
                                                    </strong>
                                                </td>

                                            )}

                                        </tr>

                                    ))}

                            </tbody>

                        </table>

                    </div>

                )}


                {profile.season_ended && (

                    <div className="profile-season-points">

                        Body za předpověď sezóny:

                        <strong>
                            {profile.pocet_bodu_sezona}
                        </strong>

                    </div>

                )}

            </section>

        </section>
    );
}


export default ProfilePage;

