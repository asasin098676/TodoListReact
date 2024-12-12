import { getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import React from "react";
import LoginPage from "./LogIn/LogIn";
import { app } from "../database/firebase";

interface AuthContextProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);
    if (!user) {
        return (
            <AuthContext.Provider value={{ user, setUser }}>
                {user ? children : <LoginPage />}
            </AuthContext.Provider>
        );
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;
