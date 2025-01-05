import Todo from './todo/Todo'
import './Dashboard.scss'
import BasicDateCalendar from './calendar/BasicDateCalendar'
import Category from './category/Category'
import Header from './header/Header'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='dashboard'>
                <header className='header'>
                    <Header ></Header>
                </header>
                <div className='body' >
                    <div className="leftBlock">
                        <div>
                            <BasicDateCalendar></BasicDateCalendar>
                        </div>
                        <div>
                            <Category></Category>
                        </div>
                    </div>
                    <div className="mainBlock">
                        <Todo></Todo>
                    </div>
                </div>
                <button onClick={() => { navigate('/create') }} className="add-button">
                    <svg className="add-button__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                <footer>
                    {/* <button onClick={() => { navigate('/create') }}>add new todo</button> */}
                </footer>
            </div >
        </>
    )
}

export default Dashboard