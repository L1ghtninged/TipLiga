import { apiFetch } from "./client";
import type { User } from "../types/User";

export async function getUsers(): Promise<User[]> {
    const response = await apiFetch("/auth/users");

    if (!response.ok) {
        throw new Error("Nepodařilo se načíst uživatele.");
    }

    return response.json();
}

export async function login(userId: number, password: string): Promise<string> {
    const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            uzivatel_id: userId,
            heslo: password,
        }),
    });

    if (!response.ok) {
        throw new Error("Neplatné přihlašovací údaje.");
    }

    const data = await response.json();
    return data.access_token;
}

export async function getCurrentUser(): Promise<User> {
    const response = await apiFetch("/auth/me");

    if (!response.ok) {
        throw new Error("Token není platný.");
    }

    return response.json();
}