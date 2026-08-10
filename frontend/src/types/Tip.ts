export interface Tip {
    id: number;
    uzivatel_id: number;
    zapas_id: number;
    predpoved_domaci_skore: number;
    predpoved_hostujici_skore: number;
    body_ziskane: number;
    created_at: string;
    is_joker: boolean;
}