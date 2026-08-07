import type { Round } from "./Round";
import type { User } from "./User";

export interface DashboardRound extends Round {
    match_count: number;
    tip_count: number;
    joker_used: boolean;
    deadline: string | null;
}

export interface DashboardData {
    user: {
        id: number;
        username: string;
    };

    open_rounds: DashboardRound[];

    leaderboard: User[];
}