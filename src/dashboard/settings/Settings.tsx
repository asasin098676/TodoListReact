import { useContext, useState } from "react";
import { AuthContext, AuthContextProps } from "../../registration/Auth";
import './Settings.scss';
import { ChevronLeft } from 'lucide-react';
import { User, Lock, Palette } from 'lucide-react';
import img from '../../assets/png/225-default-avatar.png';
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { LogOut } from 'lucide-react';
import { app } from "../../database/firebase";

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext) as AuthContextProps;
    const auth = getAuth(app);

    const [email, setEmail] = useState(user?.email || '')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surName, setSurName] = useState('')

    const isFormValid = name.trim() || surName.trim() || password.trim()

    const updateUserInfomation = async () => {
        if (name.length > 0 && surName.length > 0) {
            updateUserNameAndSurname()
        }
        if (password.length > 0) {
            updateUserPassword()
        }
        if (email.length > 0) {
            updateUserEmail()
        }
    }

    const updateUserNameAndSurname = async () => {
        if (!auth.currentUser) return;

        try {
            await updateProfile(auth.currentUser, {
                displayName: `${name} ${surName}`,
                photoURL: user?.photoURL || img,

            });
            alert("Профіль успішно оновлено!");
        } catch (error) {
            console.error("Помилка оновлення профілю:", error);
            alert("Не вдалося оновити профіль. Спробуйте ще раз.");
        }
    };


    const updateUserEmail = async () => {
        if (!auth.currentUser) return;

        try {
            await updateEmail(auth.currentUser, email);

            await sendEmailVerification(auth.currentUser);
            alert("Електронна пошта успішно оновлена!");
        } catch (error) {
            console.error("Помилка оновлення електронної пошти:", error);
            alert("Не вдалося оновити електронну пошту. Спробуйте ще раз.");
        }
    };

    const updateUserPassword = async () => {
        if (!auth.currentUser) return;

        try {
            await updatePassword(auth.currentUser, password);
            alert("Пароль успішно змінено!");
        } catch (error) {
            console.error("Помилка зміни пароля:", error);
            alert("Не вдалося змінити пароль. Спробуйте ще раз.");
        }
    };


    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Не вдалося виконати вихід. Спробуйте ще раз.");
        }
    };
    return (
        <>
            <div className="settingsPage">
                <div className="settingsHeader">
                    <div className="settingsHeaderLeftBlock">
                        <button onClick={() => { navigate('/dashboard') }}> <ChevronLeft className="returnIcon" /></button>
                        <h2>Settings</h2>
                    </div>
                    <div className="settingsHeaderRightBlock">
                        <button className="exitButton" onClick={handleLogout} >
                            <LogOut className="exitIcon" />
                            Вийти
                        </button>
                    </div>
                </div>
                <div className="settingsBody">
                    <div className="settingsLeftBlock">
                        <div className="settingsCategory">
                            <button><User className="settingsIcon" />profile</button>
                            <button><Lock className="settingsIcon" />security</button>
                            <button><Palette className="settingsIcon" />design</button>
                        </div>
                    </div>
                    <div className="settingsMainBlock">
                        <div className="profileSettings">
                            <div className="profileSettingsHeader">
                                <h2>Налаштування профілю</h2>
                                <p>Керуйте своєю особистою інформацією</p>
                            </div>
                            <div className="profileSettingsBody">
                                <div className="profileSettingsImg">
                                    <img
                                        src={user?.photoURL || img}
                                        alt="Avatar"
                                        className="profilePhoto"
                                    />

                                    <button className="changePhotoButton">Змінити фото</button>
                                    <button className="deletePhotoButton">Видалити</button>
                                </div>
                                <div className="ProfileSettingsInputs">
                                    <div className="ProfileSettingsNameAndSurnameInputs">
                                        <div className="ProfileSettingNameInput">
                                            <span>Ім'я</span>
                                            <input placeholder="Нове ім'я" onChange={(e) => { setName(e.target.value) }}></input>
                                        </div>
                                        <div className="ProfileSettingSurnameInput">
                                            <span>Прізвище</span>
                                            <input placeholder="Нове Прізвище" onChange={(e) => { setSurName(e.target.value) }}></input>
                                        </div>

                                    </div>
                                    <div className="ProfileSettingsNameAndSurnameInputs">
                                        <div className="ProfileSettingPasswordInput">
                                            <span>Новий Пароль</span>
                                            <input placeholder="Новий пароль" onChange={(e) => { setPassword(e.target.value) }}></input>
                                        </div>
                                    </div>
                                    <div className="ProfileSettingEmailInput">
                                        <span>Email</span>
                                        <input value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                                    </div>

                                </div>

                                <button disabled={!isFormValid} onClick={updateUserInfomation} className="SaveChangesButton">Зберегти зміни</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
