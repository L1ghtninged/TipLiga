
const API_URL = "/api";
import { getToken } from "../utils/auth";
import { getAdminToken } from "../utils/adminAuth";
export default API_URL;


export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {

    const token = getToken();

    const headers = new Headers(
        options.headers
    );


    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {
        headers.set(
            "Content-Type",
            "application/json"
        );
    }


    if (token) {

        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }


    return fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );
}


export async function adminFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {

    const token = getAdminToken();

    const headers = new Headers(
        options.headers
    );


    if (
        options.body &&
        !(options.body instanceof FormData) &&
        !headers.has("Content-Type")
    ) {
        headers.set(
            "Content-Type",
            "application/json"
        );
    }


    if (token) {

        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }


    return fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );
}
