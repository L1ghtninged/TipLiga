import API_URL from "../api/client";

export function saveToken(token: string): void {
    localStorage.setItem("token", token);
}

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function isLoggedIn(): boolean {
    return getToken() !== null;
}

export function logout(): void {
    localStorage.removeItem("token");
}
export async function validateToken(): Promise<boolean> {

    const token = getToken();

    if (!token) {
        return false;
    }

    try {

        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            logout();
            return false;
        }

        return true;

    } catch {

        logout();
        return false;

    }
}