import { useNavigate } from 'react-router-dom';
import './RegistrarionPage.scss'
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react"
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { AuthContext } from '../Auth';
import { app } from '../../database/firebase';
import img from '../../assets/png/Logo-google-icon-PNG.png'

const RegistrarionPage = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext не ініціалізований");
    }

    const { setUser } = authContext;

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aproovePassword, setaproovePassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showAproovePassword, setShowAproovePassword] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("User signed in with Google:", user);
                setUser(user);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error("Google login error:", error);
                setError(error.message);
            });
    };



    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== aproovePassword) {
            setError("Паролі не співпадають");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                const user = credentials.user;

                updateProfile(user, {
                    displayName: `${name} ${lastName}`,
                })
                    .then(() => {
                        console.log("Profile updated:", user);
                        setUser(user);
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error("Profile update error:", error);
                        setError("Не вдалося оновити профіль");
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error);
                setError(error.message);
            });
    };


    return (
        <>
            <div className="registrtionPage">
                <form className="registrationForm" onSubmit={handleRegister}>
                    <div className="registrationHeader">
                        <h1 className="text-2xl font-bold text-gray-900">Створити аккаунт</h1>
                        <p className="text-gray-600 mt-2">Заповніть форму для реєстрації</p>
                    </div>

                    <div className='body'>
                        <div className="inputs">
                            <div className="nameAndSurnameInputs">
                                <div className="nameInput">
                                    <div className='nameInputTitile'>
                                        <label className="emailLabel">
                                            Ім'я
                                        </label>
                                    </div>
                                    <input
                                        type="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="ivan"
                                    />
                                    <User className="userIcon" />
                                </div>

                                <div className="surnameInput">
                                    <div className='surnameInputTitile'>
                                        <label className="emailLabel">
                                            Прізвище
                                        </label>
                                    </div>
                                    <input
                                        type="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Ivanov"
                                    />
                                    <User className="userSecondIcon" />
                                </div>
                            </div>

                            <div className="emailInputs">
                                <div className='emailTitile'>
                                    <label className="emailLabel">
                                        Email
                                    </label>
                                </div>

                                <div className="emailInput">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                    />
                                    <Mail className='mailIcon' />
                                </div>
                            </div>

                            <div className="passwordInputs">
                                <div className="paswordInput">
                                    <div className='passwordTitile'>
                                        <label >Пароль</label>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    {showPassword ? <EyeOff onClick={() => setShowPassword(!showPassword)} className="eyeIcon" /> : <Eye onClick={() => setShowPassword(!showPassword)} className="eyeIcon" />}
                                    <Lock className="passwordLockIcon" />
                                </div>

                                <div className="paswordInput">
                                    <div className='passwordTitile'>
                                        <label >Підтведження пароля</label>
                                    </div>
                                    <input
                                        type={showAproovePassword ? 'text' : 'password'}
                                        value={aproovePassword}
                                        onChange={(e) => setaproovePassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <Lock className="passwordLockIcon" />
                                    {showAproovePassword ? <EyeOff onClick={() => setShowAproovePassword(!showAproovePassword)} className="eyeIcon" /> : <Eye onClick={() => setShowAproovePassword(!showAproovePassword)} className="eyeIcon" />}
                                </div>
                            </div>

                            {error && (
                                <p className="error">{error}</p>
                            )}

                            <div className="registerationButtons">
                                <button
                                    type="submit"
                                >
                                    Зареєструватися
                                </button>
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                >
                                    <img src={img}></img>
                                    Google
                                </button>
                            </div>

                            <div className="returtToLogin">
                                <p> Вже маєте обліковий запис? </p>
                                <nav
                                    onClick={() => navigate('/')}
                                    className="text-blue-600 hover:underline focus:outline-none"
                                >
                                    Увійти
                                </nav>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}


export default RegistrarionPage