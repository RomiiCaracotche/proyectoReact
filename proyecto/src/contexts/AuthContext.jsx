import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);

    const login = (username) => {
        const token = `fake-token-${username}`;
        if(username == 'admin@gmail.com') {
            setAdmin(true);
        }
        localStorage.setItem('authToken', token);
        setUser(username);
        window.location.replace("/")
    }

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setAdmin(false)
        window.location.replace("/")
    }

    function validarLogin() {
        const userToken = localStorage.getItem("authToken");
        if(userToken && userToken == "fake-token-admin@gmail.com") {
            setAdmin(true);
            return 
        }             
        if(userToken) {
            setUser(userToken)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, admin, validarLogin }}>
            {children}
        </AuthContext.Provider> 
    );
}
export const useAuthContext = () => useContext(AuthContext);