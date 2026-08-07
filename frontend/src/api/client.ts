const API_URL = "http://127.0.0.1:5000/api";
export default API_URL;


export function getToken(): string | null {
    return localStorage.getItem("token");
}

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {

    const token = getToken();

    const headers = new Headers(options.headers);

    if (!(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });
}