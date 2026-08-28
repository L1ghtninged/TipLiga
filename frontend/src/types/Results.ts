import type { Round } from "./Round";

export interface ResultTip {
    id: number;
    uzivatel_id: number;
    username: string;
    predpoved_domaci_skore: number;
    predpoved_hostujici_skore: number;
    is_joker: boolean;
    body_ziskane: number;
    created_at: string | null;
}

export interface ResultMatch {
    id: number;
    domaci_tym: {
        id: number;
        nazev: string;
        logo_url: string | null;
    };
    hostujici_tym: {
        id: number;
        nazev: string;
        logo_url: string | null;
    };
    domaci_skore: number | null;
    hostujici_skore: number | null;
    zacatek_zapasu: string | null;
    stav: "scheduled" | "played" | "postponed";
    tipy: ResultTip[];
}

export interface Ranking {
    poradi: number;
    uzivatel_id: number;
    username: string;
    body_za_kolo: number;
    body: number;
}

export interface RoundResults {
    kolo: Round;
    message?: string;
    poradi?: Ranking[];
    zapasy?: ResultMatch[];
}