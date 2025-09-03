import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminRequired = false }) => {
    const [authStatus, setAuthStatus] = useState('checking');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        /*---------------------------------
        Check token and role admin
        ----------------------------------*/
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (token && token.trim() !== '') {
            setAuthStatus('authenticated');
            setIsAdmin(user.role === 'admin');
        } else {
            setAuthStatus('unauthenticated');
        }
    }, []);

    if (authStatus === 'checking') {
        return <div>Loading...</div>;
    }

    if (authStatus === 'unauthenticated') {
        return <Navigate to="/login" replace />;
    }
    /*---------------------------------
     Navigate to not admin  
    ----------------------------------*/
    if (adminRequired && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
