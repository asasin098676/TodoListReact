import { Bell, Settings, Search } from 'lucide-react';
import './Header.scss'
import img from '../../assets/png/225-default-avatar.png'
import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../../registration/Auth';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { user } = useContext(AuthContext) as AuthContextProps;
    console.log('user: ', user);
    const navigate = useNavigate();

    return (
        <>
            <div className='header'>
                <div className='leftBlock'>
                    <h1>TaskFlow</h1>
                    <input placeholder='пошук завдань....'></input>
                    <Search className="searchIcon" />
                </div>
                <div className='rightBlock'>
                    <div className='notification'>
                        <button>
                            <Bell className="icon" />
                        </button>
                    </div>
                    <div className='settings'>
                        <button onClick={() => {navigate("/settings")}}>
                            <Settings className="icon" />
                        </button>
                    </div>
                    <div className="profile">
                        <img src={user?.photoURL || img} alt="Avatar" />
                        <span className="font-medium">{user?.displayName}</span>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Header

