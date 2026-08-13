export interface AdminMatch {
    id: number;

    domaci_tym_id: number;
    hostujici_tym_id: number;

    domaci_skore: number | null;
    hostujici_skore: number | null;

    zacatek_zapasu: string | null;

    stav: "scheduled" | "played" | "postponed";
}