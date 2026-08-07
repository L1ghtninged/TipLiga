import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "../api/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        async function verify() {

            try {

                await getCurrentUser();
                setAuthenticated(true);

            } catch {

                localStorage.removeItem("token");
                setAuthenticated(false);

            } finally {

                setLoading(false);

            }
        }

        verify();

    }, []);

    if (loading) {
        return <div>Načítání...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;