export type MatchStatus =
    | "scheduled"
    | "played"
    | "postponed";


export interface Match {
    id: number;
    kolo_id: number;

    domaci_tym_id: number;
    hostujici_tym_id: number;

    domaci_skore: number | null;
    hostujici_skore: number | null;

    zacatek_zapasu: string;

    stav: MatchStatus;
}