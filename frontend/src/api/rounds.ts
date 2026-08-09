import { apiFetch } from "./client";
import type { Round } from "../types/Round";

export interface Match {
    id: number;
    kolo_id: number;
    domaci_tym_id: number;
    hostujici_tym_id: number;
    domaci_skore: number | null;
    hostujici_skore: number | null;
    zacatek_zapasu: string;
    stav: "scheduled" | "played" | "postponed";
}

export interface RoundMatchesResponse {
    round: Round;
    matches: Match[];
}

export async function getRounds(): Promise<Round[]> {

    const response = await apiFetch("/rounds");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst kola.");
    }

    return await response.json();
}

export async function getRoundMatches(
    roundId: number
): Promise<RoundMatchesResponse> {

    const response = await apiFetch(
        `/rounds/${roundId}/matches`
    );

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst zápasy.");
    }

    return await response.json();
}