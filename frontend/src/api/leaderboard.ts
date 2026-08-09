import { apiFetch } from "./client";

export interface LeaderboardUser {
    id: number;
    username: string;
    pocet_bodu: number;
}

export async function getLeaderboard(): Promise<LeaderboardUser[]> {

    const response = await apiFetch("/leaderboard");

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst žebříček."
        );
    }

    return await response.json();
}