import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./AuthProvider";


function ProtectedRoute() {

    const {
        isAuthenticated,
        loading
    } = useAuth();


    /*
     * AuthProvider právě zjišťuje,
     * jestli máme platný token.
     */
    if (loading) {

        return (
            <div>
                Načítání...
            </div>
        );
    }


    /*
     * Uživatel není přihlášený.
     */
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    /*
     * Uživatel je přihlášený.
     *
     * Outlet vykreslí konkrétní
     * chráněnou route.
     */
    return <Outlet />;
}


export default ProtectedRoute;
