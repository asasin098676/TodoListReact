import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../database/firebase";
import './Todo.scss'
import TextField from '@mui/material/TextField';

interface Todo {
    id: string;
    todo: string;
}
interface TodoProps {
    refreshTrigger: boolean;
}

const Todo = ({ refreshTrigger }: TodoProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

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
    }, [refreshTrigger])

    return (
        <div className="todos">
            {todos.map((todo, i) => (
                <div className="todo" key={i}>

                    <div className="todoItem">
                        <p className="todoTitle">{todo.todo}</p>
                        <div className="todoAction">
                           
                        </div>
                    </div>


                </div>
            )
            )}
        </div>
    )
}

export default Todo