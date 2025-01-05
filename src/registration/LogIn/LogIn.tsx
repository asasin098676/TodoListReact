import React, { useContext, useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, googleAuthProvider } from "../../database/firebase";
import { AuthContext } from "../Auth";
import { Mail, Lock } from "lucide-react";
import './LogIn.scss';
import img from "../../assets/png/Logo-google-icon-PNG.png";
import { Link } from "react-router-dom"; // Змінюємо імпорт Link з react-router-dom

const LoginPage = () => {
    const auth = getAuth(app);
    const { setUser } = useContext(AuthContext)!;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleGoogleLogin = () => {
        setErrorMessage(null);
        signInWithPopup(auth, googleAuthProvider)
            .then((credentials) => setUser(credentials.user))
            .catch((error) => setErrorMessage(error.message));
    };

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        signInWithEmailAndPassword(auth, email, password)
            .then((credentials) => setUser(credentials.user))
            .catch(() => setErrorMessage('Невірний email або пароль. Спробуйте ще раз.'));
    };

    return (
        <div className="logInPage">
            <form onSubmit={handleEmailLogin} className="loginForm">
                <div className="loginHeader">
                    <h1 className="text-2xl font-bold text-gray-900">Вітаємо!</h1>
                    <p className="text-gray-600 mt-2">Увійдіть у свій акаунт</p>
                </div>

                <div className="inputs">
                    <div className="loginInputs">
                        <label className="emailLabel">
                            Email
                        </label>
                        <div className="emailInput">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                            />
                            <Mail className="icon" />
                        </div>
                    </div>

                    <div className="passwordInputs">
                        <label>Пароль</label>
                        <div className="paswordInput">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <Lock className="icon" />
                        </div>
                    </div>
                </div>

                {errorMessage && (
                    <div className="error-message">
                        <p className="text-red-500">{errorMessage}</p>
                    </div>
                )}

                <div className="loginButton">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Увійти
                    </button>
                </div>

                <hr />

                <div className="googleLogin">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <img src={img} alt="Google Logo" />
                        Google
                    </button>

                    <Link 
                        to="/register" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                        Зареєструватися
                    </Link>
                </div>
                <div>
                
                    
                </div>
            </form>
        </div>
    );
};

export default LoginPage;