import { apiFetch } from "./client";
import type { Round } from "../types/Round";
import type {Match} from "../types/Match"

export interface RoundMatchesResponse {
    matches: Match[];
}


export async function getRounds(): Promise<Round[]> {

    const response = await apiFetch("/rounds");

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst kola."
        );
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
        throw new Error(
            "Nepodařilo se načíst zápasy."
        );
    }

    return await response.json();
}