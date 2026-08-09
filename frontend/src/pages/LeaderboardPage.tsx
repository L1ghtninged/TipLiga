import { useEffect, useState } from "react";

import {
    getLeaderboard,
    type LeaderboardUser
} from "../api/leaderboard";

import "./LeaderboardPage.css";


function LeaderboardPage() {

    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {

        async function loadLeaderboard() {

            try {

                const data =
                    await getLeaderboard();

                setUsers(data);

            } catch (error) {

                console.error(error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Nepodařilo se načíst žebříček."
                );

            } finally {

                setLoading(false);

            }
        }

        loadLeaderboard();

    }, []);


    if (loading) {

        return (
            <div className="leaderboard-page">
                <p>Načítání...</p>
            </div>
        );
    }


    if (error) {

        return (
            <div className="leaderboard-page">
                <p className="leaderboard-error">
                    {error}
                </p>
            </div>
        );
    }


    return (

        <div className="leaderboard-page">

            <div className="leaderboard-header">
                <h1>Žebříček</h1>
                <p>
                    Aktuální pořadí hráčů
                </p>
            </div>


            <div className="leaderboard">

                {users.map((user, index) => {

                    const position = index + 1;

                    return (

                        <div
                            key={user.id}
                            className={`
                                leaderboard-row
                                ${
                                    position <= 3
                                        ? "top-three"
                                        : ""
                                }
                            `}
                        >

                            <div className="leaderboard-position">

                                {position === 1 && "🥇"}

                                {position === 2 && "🥈"}

                                {position === 3 && "🥉"}

                                {position > 3 && position}

                            </div>


                            <div className="leaderboard-username">
                                {user.username}
                            </div>


                            <div className="leaderboard-points">
                                {user.pocet_bodu} b
                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default LeaderboardPage;