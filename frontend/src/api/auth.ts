import { adminFetch, apiFetch } from "./client";
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

export async function loginAdmin(
    heslo: string
): Promise<string> {

    const response = await apiFetch(
        "/auth/admin/login",
        {
            method: "POST",

            body: JSON.stringify({
                heslo
            })
        }
    );

    if (!response.ok) {

        const data = await response.json()
            .catch(() => null);

        throw new Error(
            data?.error ?? "Neplatné heslo."
        );
    }

    const data = await response.json();

    return data.access_token;
}


export async function getMe(): Promise<User> {

    const response =
        await apiFetch("/auth/me");


    if (!response.ok) {

        throw new Error(
            "Token is invalid or expired."
        );
    }


    return await response.json();
}

export async function getAdminMe(): Promise<{ role: string }> {

    const response = await adminFetch(
        "/auth/admin/me"
    );

    if (!response.ok) {
        throw new Error(
            "Admin token is invalid or expired."
        );
    }

    return response.json();
}