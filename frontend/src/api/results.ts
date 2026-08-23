import { apiFetch } from "./client";
import type { RoundResults } from "../types/Results";

export async function getRoundResults(
    roundId: number
): Promise<RoundResults> {

    const response = await apiFetch(
        `/results/${roundId}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se načíst výsledky kola."
        );
    }

    return await response.json();
}