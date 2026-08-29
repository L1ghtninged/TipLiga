import type { Team } from "./Team";

export interface Match {
    id: number;

    domaci_tym: Team;
    hostujici_tym: Team;

    domaci_skore: number | null;
    hostujici_skore: number | null;

    zacatek_zapasu: string;

    stav: "scheduled" | "in_progress" | "played" | "postponed";
}