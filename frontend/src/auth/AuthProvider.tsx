import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from "react";

import {
    getMe
} from "../api/auth";

import {
    getToken,
    removeToken
} from "../utils/auth";


export interface User {
    id: number;
    username: string;
}


interface AuthContextType {

    user: User | null;

    loading: boolean;

    isAuthenticated: boolean;

    logout: () => void;

    refreshUser: () => Promise<void>;
}


const AuthContext =
    createContext<AuthContextType | undefined>(
        undefined
    );


interface AuthProviderProps {
    children: ReactNode;
}


export function AuthProvider({
    children
}: AuthProviderProps) {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);


    async function refreshUser() {

        const token = getToken();

        if (!token) {

            setUser(null);
            return;
        }


        try {

            const currentUser =
                await getMe();

            setUser(currentUser);

        } catch (error) {

            console.error(
                "Failed to validate token:",
                error
            );

            removeToken();

            setUser(null);
        }
    }


    function logout() {

        removeToken();

        setUser(null);
    }


    useEffect(() => {

        async function initializeAuth() {

            try {

                await refreshUser();

            } finally {

                setLoading(false);
            }
        }

        initializeAuth();

    }, []);


    const value: AuthContextType = {

        user,

        loading,

        isAuthenticated:
            user !== null,

        logout,

        refreshUser
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth(): AuthContextType {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}