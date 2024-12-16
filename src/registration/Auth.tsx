import {
    getAuth,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { app } from "../database/firebase";
import Dashboard from "../dashboard/Dashboard";
import LoginPage from "./LogIn/LogIn";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrarionPage from "./RegistrarionPage/RegistrarionPage";

interface AuthContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = () => {
    const [user, setUser] = useState<User | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route
                    path="/"
                    element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
                />
                   <Route
                    path="/register"
                    element={!user ? <RegistrarionPage /> : <Navigate to="/dashboard" />}
                />

                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/" />}
                />

                <Route
                    path="/"
                    element={<Navigate to={user ? "/dashboard" : "/"} />}
                />

                <Route
                    path="*"
                    element={<Navigate to={user ? "/dashboard" : "/"} />}
                />
            </Routes>
        </AuthContext.Provider>
    );
};

export default AuthProvider;