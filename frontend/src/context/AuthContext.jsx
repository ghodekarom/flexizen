import React, { createContext, useState, useEffect } from 'react';
import { checkSession, loginAdmin, logoutAdmin } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user has an active session on load
        const verifySession = async () => {
            try {
                const res = await checkSession();
                if (res.data && res.data.authenticated) {
                    setIsLoggedIn(true);
                    setAdminUser({
                        username: res.data.username,
                        name: res.data.name,
                        email: res.data.email
                    });
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    const login = async (username, password) => {
        const res = await loginAdmin(username, password);
        if (res.status === 'success') {
            setIsLoggedIn(true);
            setAdminUser(res.data);
            return true;
        }
        return false;
    };

    const logout = async () => {
        await logoutAdmin();
        setIsLoggedIn(false);
        setAdminUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, adminUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
