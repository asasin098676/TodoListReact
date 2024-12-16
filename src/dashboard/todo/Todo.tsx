import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, db } from "../../database/firebase";
import './Todo.scss'
import { getAuth, signOut } from "firebase/auth";
import { Calendar, Clock, List, Grid, Filter } from 'lucide-react';

interface Todo {
    id: string;
    todo: string;
}
// interface TodoProps {
//     refreshTrigger: boolean;
// }

const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const auth = getAuth(app);


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
        await getDocs(collection(db, "todos"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    })) as Todo[];

                setTodos(newData)
            })
    }

    useEffect(() => {
        fetchPost();
    }, [])

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
                        <div className="priority"></div>
                        <div className="todoValue">
                            <h2 className="todoTitle">{todo.todo}</h2>
                            <div className="category">
                                <span>private</span>
                            </div>
                        </div>

                    </div>

                    <div className="info">
                        <Clock className="clockIcon" />
                        <span>12 december</span>
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