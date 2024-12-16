import { Bell, Settings, Search } from 'lucide-react';
import './Header.scss'
import img from '../../assets/png/225-default-avatar.png'

const Header = () => {

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
                            {/* <span></span> */}
                        </button>
                    </div>
                    <div className='settings'>
                        <button>
                            <Settings className="icon" />
                        </button>
                    </div>
                    <div className="profile">
                        <img src={img} alt="Avatar" />
                        <span className="font-medium">Іван Петров</span>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Header