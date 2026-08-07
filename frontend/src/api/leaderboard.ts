import { apiFetch } from "./client";
import type { User } from "../types/User";

export async function getLeaderboard(): Promise<User[]> {

    const response = await apiFetch("/leaderboard");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst leaderboard.");
    }

    return await response.json();
}