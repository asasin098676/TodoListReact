import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { app, db } from "../../database/firebase";
import './Todo.scss'
import { getAuth, signOut } from "firebase/auth";
import { Calendar, Clock, List, Grid, Filter } from 'lucide-react';
import { AuthContext, AuthContextProps } from "../../registration/Auth";

interface Todo {
    id: string;
    name: string;
    description: string;
    priority: string;
    endDate: string;
    endTime: string;
    category: string;
    creationDate: string;
    creationTime: string;
    overdue: boolean;
    canEdit: boolean;
    //check tis place
    file: any;
}


const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const auth = getAuth(app);
    const { user } = useContext(AuthContext) as AuthContextProps;

    // Оновлюємо userEmail, якщо user змінюється
    useEffect(() => {
        if (user?.email) {
            setUserEmail(user.email);
        }
    }, [user]);

    // Викликаємо fetchPost тільки якщо userEmail доступний
    useEffect(() => {
        if (userEmail) {
            fetchPost();
        }
    }, [userEmail]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Не вдалося виконати вихід. Спробуйте ще раз.");
        }
    };

    const fetchPost = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, userEmail!)); // userEmail гарантовано доступний
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as Todo[];
            console.log(newData);
            setTodos(newData);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    return (
        <div className="todos">
            <div className="filters">
                <div className="filterButtons">
                    <button>
                        <List className="w-5 h-5" />
                        Список
                    </button>
                    <button>
                        <Grid className="w-5 h-5" />
                        Сітка
                    </button>
                </div>

                <div className="filter">
                    <button>
                        <Filter className="w-5 h-5" />
                        Фільтри
                    </button>
                </div>

            </div>
            {todos.map((todo, i) => (
                <div className="todo" key={i}>

                    <div className="todoItem">
                        <div className={todo.priority} ></div>
                        <div className="todoValue">
                            <h2 className="todoTitle">{todo.name}</h2>
                            <div className="category">
                                <span>private</span>
                            </div>
                        </div>

                    </div>

                    <div className="info">
                        <Clock className="clockIcon" />
                        <span>{todo.endDate}</span>
                        <span>{todo.creationTime}</span>
                        <div className="status">
                            <span>виконано</span>
                        </div>
                    </div>


                </div>
            )
            )}

            <button onClick={handleLogout} className="logout-btn">
                Вийти
            </button>
        </div>
    )
}

export default Todo