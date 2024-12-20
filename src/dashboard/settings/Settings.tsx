import { useContext, useState } from "react";
import { AuthContext, AuthContextProps } from "../../registration/Auth";
import './Settings.scss';
import { User, Lock, Palette } from 'lucide-react';
import img from '../../assets/png/225-default-avatar.png';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from "../../database/firebase";
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";

const Settings = () => {
    const { user } = useContext(AuthContext) as AuthContextProps;

    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || img);

    const uploadFile = () => {
        if (!imageUpload) {
            toast.error("Please select an image");
            return;
        }
        const imageRef = storageRef(storage, `products/${uuid()}`);

        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        setPhotoURL(url); // Оновлення фото URL
                        toast.success("Photo uploaded successfully!");
                    })
                    .catch((error) => toast.error(error.message));
            })
            .catch((error) => toast.error(error.message));
    };

    return (
        <>
            <div className="settingsPage">
                <div className="settingsHeader">
                    <h2>Settings</h2>
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
                                <img
                                    src={photoURL || img}
                                    alt="Avatar"
                                    className="profilePhoto"
                                />
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImageUpload(e.target.files[0]);
                                        }
                                    }}
                                />
                                <button onClick={uploadFile}>Upload Photo</button>
                            </div>
                        </div>
                        <h2>{user?.displayName}</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
