import {
    useEffect,
    useState
} from "react";

import {
    Navigate,
    Outlet
} from "react-router-dom";

import {
    getAdminMe
} from "../api/auth";

import {
    getAdminToken,
    removeAdminToken
} from "../utils/adminAuth";


function AdminProtectedRoute() {

    const [loading, setLoading] =
        useState(true);

    const [authenticated, setAuthenticated] =
        useState(false);


    useEffect(() => {

        async function verifyAdmin() {

            const token =
                getAdminToken();

            if (!token) {

                setAuthenticated(false);
                setLoading(false);

                return;
            }


            try {

                await getAdminMe();

                setAuthenticated(true);

            } catch (error) {

                console.error(
                    "Failed to validate admin token:",
                    error
                );

                removeAdminToken();

                setAuthenticated(false);

            } finally {

                setLoading(false);
            }
        }


        verifyAdmin();

    }, []);


    if (loading) {

        return (
            <div>
                Načítání administrace...
            </div>
        );
    }


    if (!authenticated) {

        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }


    return <Outlet />;
}


export default AdminProtectedRoute;