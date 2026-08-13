import { adminFetch } from "./client";
import type { User } from "../types/User";
import type { Match } from "../types/Match";
import type { MatchTip } from "../types/MatchTip";
import type { Team } from "../types/Team";
import type { AdminMatch } from "../types/AdminMatch";
export async function getAdminUsers(): Promise<User[]> {
    const response = await adminFetch("/admin/users");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst uživatele.");
    }

    return response.json();
}


export async function createUser(
    username: string
): Promise<User> {

    const response = await adminFetch(
        "/admin/users",
        {
            method: "POST",
            body: JSON.stringify({
                username
            })
        }
    );

    if (!response.ok) {
        const data = await response.json()
            .catch(() => null);

        throw new Error(
            data?.error ?? "Nepodařilo se vytvořit uživatele."
        );
    }

    const data = await response.json();

    return data.user;
}


export async function deleteUser(
    username: string
): Promise<void> {

    const response = await adminFetch(
        `/admin/users/${encodeURIComponent(username)}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        const data = await response.json()
            .catch(() => null);

        throw new Error(
            data?.error ?? "Nepodařilo se smazat uživatele."
        );
    }
}

export interface AdminRound {
    id: number;
    cislo_kola: number;
    is_closed: boolean;
    closed_at?: string | null;
}


export async function getAdminRounds(): Promise<AdminRound[]> {

    const response = await adminFetch(
        "/admin/rounds"
    );

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst kola."
        );
    }

    return response.json();
}


export async function createRounds(
    count: number
): Promise<number> {

    const response =
        await adminFetch(
            "/admin/rounds",
            {
                method: "POST",
                body: JSON.stringify({
                    pocet_kol: count
                })
            }
        );

    if (!response.ok) {

        const data =
            await response.json()
                .catch(() => null);

        throw new Error(
            data?.error ??
            "Nepodařilo se vytvořit kola."
        );
    }

    const data =
        await response.json();

    return data.count;
}



export async function deleteRound(
    roundNumber: number
): Promise<void> {

    const response = await adminFetch(
        `/admin/rounds/${roundNumber}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

        const data = await response.json()
            .catch(() => null);

        throw new Error(
            data?.error ??
            "Nepodařilo se odstranit kolo."
        );
    }
}
export async function closeRound(
    roundId: number
): Promise<AdminRound> {

    const response = await adminFetch(
        `/admin/rounds/${roundId}/close`,
        {
            method: "PUT"
        }
    );

    if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
            data?.error ??
            "Nepodařilo se uzavřít kolo."
        );
    }

    const data = await response.json();

    return data.round;
}
export async function reopenRound(
    roundId: number
): Promise<void> {

    const response = await adminFetch(
        `/admin/rounds/${roundId}/reopen`,
        {
            method: "POST"
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.error ?? "Nepodařilo se znovu otevřít kolo."
        );
    }
}

export async function deleteRounds(
    roundIds: number[]
): Promise<void> {

    const response = await adminFetch("/admin/rounds", {
        method: "DELETE",
        body: JSON.stringify({
            round_ids: roundIds
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se smazat kola."
        );
    }
}
export async function getMatchesByRound(
    roundId: number
): Promise<AdminMatch[]> {

    const response = await adminFetch(
        `/admin/rounds/${roundId}/matches`
    );

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst zápasy."
        );
    }

    return response.json();
}


export async function createMatch(
    data: {
        kolo_id: number;
        domaci_tym_id: number;
        hostujici_tym_id: number;
        zacatek_zapasu: string | null;
    }
): Promise<Match> {

    const response = await adminFetch(
        "/admin/matches",
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se vytvořit zápas."
        );
    }

    const result = await response.json();

    return result.match;
}


export async function updateMatch(
    matchId: number,
    domaciSkore: number,
    hostujiciSkore: number
): Promise<Match> {

    const response = await adminFetch(
        `/admin/matches/${matchId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                domaci_skore: domaciSkore,
                hostujici_skore: hostujiciSkore
            })
        }
    );

    if (!response.ok) {

        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se upravit zápas."
        );
    }

    const result = await response.json();

    return result.match;
}

export async function rescheduleMatch(
    matchId: number,
    zacatekZapasu: string | null,
    stav: "scheduled" | "played" | "postponed"
): Promise<AdminMatch> {

    const response = await adminFetch(
        `/admin/matches/${matchId}/reschedule`,
        {
            method: "PUT",
            body: JSON.stringify({
                zacatek_zapasu: zacatekZapasu,
                stav: stav
            })
        }
    );

    if (!response.ok) {

        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se změnit termín zápasu."
        );
    }

    const result = await response.json();

    return result.match;
}


export async function closeMatch(
    matchId: number
): Promise<Match> {

    const response = await adminFetch(
        `/admin/matches/${matchId}/close`,
        {
            method: "PUT"
        }
    );

    if (!response.ok) {

        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se uzavřít zápas."
        );
    }

    const result = await response.json();

    return result.match;
}


export async function deleteMatch(
    matchId: number
): Promise<void> {

    const response = await adminFetch(
        `/admin/matches/${matchId}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {

        const error =
            await response.json().catch(() => null);

        throw new Error(
            error?.error ??
            "Nepodařilo se smazat zápas."
        );
    }
}

export async function getTipsForMatch(
    matchId: number
): Promise<MatchTip[]> {

    const response = await adminFetch(
        `/admin/tips/${matchId}`
    );

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst tipy."
        );
    }

    return response.json();
}
export async function getAdminTeams(): Promise<Team[]> {
    const response = await adminFetch("/admin/teams");

    if (!response.ok) {
        throw new Error(
            "Nepodařilo se načíst týmy pro admina."
        );
    }

    return response.json();
}

export async function createTeam(
    nazev: string
): Promise<number> {

    const response = await adminFetch("/admin/teams", {
        method: "POST",
        body: JSON.stringify({
            nazev
        })
    });

    if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se vytvořit tým."
        );
    }

    const data = await response.json();

    return data.id;
}


export async function deleteTeam(
    teamId: number
): Promise<void> {

    const response =
        await adminFetch(
            `/admin/teams/${teamId}`,
            {
                method: "DELETE"
            }
        );

    if (!response.ok) {
        const data =
            await response.json().catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se smazat tým."
        );
    }
}


export async function updateTeamLogo(
    teamId: number,
    logoUrl: string
): Promise<void> {

    const response =
        await adminFetch(
            `/admin/teams/${teamId}/logo`,
            {
                method: "PUT",
                body: JSON.stringify({
                    logo_url: logoUrl
                })
            }
        );

    if (!response.ok) {
        const data =
            await response.json().catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se upravit logo týmu."
        );
    }
}
export async function calculateRound(
    roundId: number
) {
    const response =
        await adminFetch(
            `/admin/rounds/${roundId}/calculate`,
            {
                method: "PUT"
            }
        );

    if (!response.ok) {
        const data =
            await response.json()
                .catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se vyhodnotit kolo."
        );
    }

    return response.json();
}
export async function recalculate(): Promise<void> {
    const response = await adminFetch(
        "/admin/recalculate",
        {
            method: "PUT"
        }
    );

    if (!response.ok) {
        const data = await response.json()
            .catch(() => null);

        throw new Error(
            data?.message ??
            "Nepodařilo se přepočítat body."
        );
    }
}
export type SeasonStandings = Record<number, number>;

export async function evaluateSeasonStandings(
    standings: Record<number, number>
) {
    const response = await adminFetch("/admin/season", {
        method: "POST",
        body: JSON.stringify(standings)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Nepodařilo se vyhodnotit konečné pořadí."
        );
    }

    return data;
}
