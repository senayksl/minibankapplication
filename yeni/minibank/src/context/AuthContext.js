import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            });
            const { data } = response;
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
                setCurrentUser({ email, token: data.token });
            } else {
                console.error("login fail");
            }
        } catch (error) {
            console.error("Login failed:", error.response || error);

        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    const signup = async (email, password,userName) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                email,
                password,
                userName
            });
            const { data } = response;
        } catch (error) {
            console.error("Signup failed:", error.response || error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setCurrentUser({ token });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        if (currentUser?.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [currentUser]);

    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        authToken,
        setAuthToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
