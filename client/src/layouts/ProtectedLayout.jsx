import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // Assume you have this component
import Footer from '../components/Footer'; // Assume you have this component

const ProtectedRoute = ({ children }) => {
    const { auth, loading } = useAuth();

    // Prevent rendering until authentication status is determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!auth) {
        return <Navigate to="/login" />;
    }

    // Render protected content with Navbar and Footer
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default ProtectedRoute;
