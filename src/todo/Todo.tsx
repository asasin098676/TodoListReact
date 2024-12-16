import { getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { app, db } from "../database/firebase";
import './Todo.scss'
import TextField from '@mui/material/TextField';
import { getAuth, signOut } from "firebase/auth";

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

            <button onClick={handleLogout} className="logout-btn">
                Вийти
            </button>
        </div>
    )
}

export default Todo