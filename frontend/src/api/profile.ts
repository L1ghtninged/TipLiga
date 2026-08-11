import { apiFetch } from "./client";
import type { ProfileData } from "../types/Profile";


export async function getProfile(): Promise<ProfileData> {

    const response =
        await apiFetch("/profile", {
            method: "GET"
        });

    if (!response.ok) {

        throw new Error(
            "Nepodařilo se načíst profil."
        );
    }

    return response.json();
}

export async function updateSeasonPrediction(
    standings: number[]
): Promise<void> {

    await apiFetch("/profile/season-prediction", {
        method: "PUT",
        body: JSON.stringify({
            standings: standings.map(tym_id => ({
                tym_id
            }))
        })
    });
}

