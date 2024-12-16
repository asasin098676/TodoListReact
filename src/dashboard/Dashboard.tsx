import Todo from './todo/Todo'
import './Dashboard.scss'
import BasicDateCalendar from './calendar/BasicDateCalendar'
import Category from './category/Category'
import Header from './header/Header'

const Dashboard = () => {

    return (
        <div className='dashboard'>
            <header className='header'>
                <Header></Header>
            </header>
            <body>
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
            </body>
            <footer>
                <button>add new todo</button>
            </footer>
        </div>
    )
}

export default Dashboard