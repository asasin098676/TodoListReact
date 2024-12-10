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
    const [editingTodoId, setEditingTodoId] = useState('');
    const [newTodo, setNewTodo] = useState('')

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

    const deleteTodo = async (id: string) => {
        const reference = doc(db, 'todos', id)
        await deleteDoc(reference)
        fetchPost();
    }

    const editTodo = async (id: string, todo: string) => {
        setEditingTodoId(id);
        setNewTodo(todo)
    }

    const saveNewTodo = async (id: string) => {
        const docRef = doc(db, "todos", id);

        const data = {
            todo: newTodo,
            id: id
        };

        updateDoc(docRef, data)
            .then(docRef => {
                setEditingTodoId('');
                fetchPost();
                console.log("A New Document Field has been added to an existing document");
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchPost();
    }, [refreshTrigger])

    return (
        <div>
            {todos.map((todo, i) => (
                <div className="todo" key={i}>
                    {editingTodoId === todo.id ? (
                        <div className="editTodo">
                            <TextField onChange={(e) => setNewTodo(e.target.value)} value={newTodo} id="filled-basic" label="Filled" variant="filled" sx={{
                                width: '80%',
                                margin: '0.5rem',
                                background: "rgb(59 59 59)",
                                borderRadius: '4px',
                                '& .MuiInputBase-root': {
                                    fontSize: '16px',
                                    color: 'black',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: '14px',
                                    color: '#666',
                                },
                            }} />
                            {/* <input onChange={(e) => setNewTodo(e.target.value)} type="text" value={newTodo}></input> */}
                            <button onClick={() => saveNewTodo(todo.id)}>save</button>
                        </div>
                    ) : (
                        <div className="todoItem">
                            <h1 className="todoTitle">{todo.todo}</h1>
                            <div className="todoAction">
                                <button onClick={() => { editTodo(todo.id, todo.todo) }}>edit</button>
                                <button onClick={() => { deleteTodo(todo.id) }}>delete</button>
                            </div>
                        </div>

                    )}
                </div>
            )
            )}
        </div>
    )
}

export default Todo