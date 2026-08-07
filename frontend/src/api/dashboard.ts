import { apiFetch } from "./client";
import type { DashboardData } from "../types/Dashboard";

export async function getDashboard(): Promise<DashboardData> {

    const response = await apiFetch("/dashboard");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst dashboard.");
    }

    return await response.json();
}