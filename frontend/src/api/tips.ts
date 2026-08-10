import { apiFetch } from "./client";
import type { Tip } from "../types/Tip";


export async function getTips(
    roundId: number
): Promise<Tip[]> {

    const response = await apiFetch(
        `/tips/${roundId}`
    );

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst tipy.");
    }

    return await response.json();
}


export async function saveTip(
    roundId: number,
    data: {
        zapas_id: number;
        predpoved_domaci_skore: number;
        predpoved_hostujici_skore: number;
        is_joker: boolean;
    }
): Promise<Tip> {

    const response = await apiFetch(
        `/tips/${roundId}`,
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.error ?? "Nepodařilo se uložit tip."
        );
    }

    const result = await response.json();

    return result.tip;
}