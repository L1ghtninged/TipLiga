export interface ProfileTeam {
    tym_id: number;
    nazev: string;
    logo_url: string | null;
    body: number;
    pozice: number;
}

export interface SeasonPrediction {
    tym_id: number;
    nazev: string;
    logo_url: string | null;
    predpoved_pozice: number;
    body_ziskane: number;
}

export interface ProfileData {
    username: string;
    pocet_bodu: number;
    poradi: number | null;
    season_prediction: SeasonPrediction[];
    teams_table: ProfileTeam[];
    pocet_bodu_sezona: number;
    season_ended: boolean;
}