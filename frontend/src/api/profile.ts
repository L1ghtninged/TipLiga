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
