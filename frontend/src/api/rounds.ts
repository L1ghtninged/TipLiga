import { apiFetch } from "./client";
import type { Round } from "../types/Round";

export async function getRounds(): Promise<Round[]> {

    const response = await apiFetch("/rounds");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst kola.");
    }

    return await response.json();
}