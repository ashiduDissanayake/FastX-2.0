import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/DriverAuthContext';

const DriverProtectedRoute = ({ children }) => {
    const { auth, loading } = useAuth();

    // Prevent rendering until authentication status is determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!auth) {
        return <Navigate to="/driver-login" />;
    }

    // Render protected content with Navbar and Footer
    return (
        <>
            {children}
        </>
    );
};

export default DriverProtectedRoute;
