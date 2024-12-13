import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User, 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import React from "react";
import LoginPage from "./LogIn/LogIn";
import { app } from "../database/firebase";

interface AuthContextProps {
    user: User | null; 
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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
            {user ? children : <LoginPage />}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
