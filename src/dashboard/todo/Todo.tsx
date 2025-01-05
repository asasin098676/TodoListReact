import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { db } from "../../database/firebase";
import './Todo.scss'
import { Clock, List, Grid, Filter } from 'lucide-react';
import { AuthContext, AuthContextProps } from "../../registration/Auth";
import { useNavigate } from "react-router-dom";

export interface Todo {
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
    status: string;
    canEdit: boolean;
    //check tis place
    file: any;
}


const Todo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useContext(AuthContext) as AuthContextProps;

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            setUserEmail(user.email);
        }
    }, [user]);

    useEffect(() => {
        if (userEmail) {
            fetchPost();
        }
    }, [userEmail]);


    const fetchPost = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, userEmail!));
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
                <div onClick={() => { navigate('/task-details', { state: todo }) }} className="todo" key={i}>

                    <div className="todoItem">
                        <div className={todo.priority} ></div>
                        <div className="todoValue">
                            <h2 className="todoTitle">{todo.name}</h2>
                            <div className="category">
                                <span>{todo.category}</span>
                            </div>
                        </div>

                    </div>

                    <div className="info">
                        <Clock className="clockIcon" />
                        <span>{todo.endDate}</span>
                        <span>{todo.endTime}</span>
                        <div className="status">
                            <span>{todo.status}</span>
                        </div>
                    </div>


                </div>
            )
            )}


        </div>
    )
}

export default Todo