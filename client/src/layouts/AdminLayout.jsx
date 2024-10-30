import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedLayout = ({ children }) => {
    const [auth, setAuth] = useState(true);


    // Redirect to login if not authenticated
    if (!auth) {
        return <Navigate to="/adminlogin" />;
    }

    // Render protected content with Navbar and Footer
    return (
        <>
            {children}
        </>
    );
};

export default AdminProtectedLayout;
