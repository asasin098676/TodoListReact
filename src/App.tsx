import { useState } from 'react';
import './App.scss';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './database/firebase';
import Todo from './todo/todo';


function App() {
  const [todo, setTodo] = useState("");
  const [refreshTodos, setRefreshTodos] = useState(false);

  const addTodo = async (e: any) => {
    e.preventDefault();

    if (!todo.trim()) {
      console.error("Todo cannot be empty.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
      setTodo("");
      setRefreshTodos(!refreshTodos);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className='createTodo' >
        <input
          type="text"
          value={todo}
          placeholder="newTodo"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>Create</button>
      </div>

      <div className='todos'>
        <Todo  refreshTrigger={refreshTodos}/>
      </div>

    </>
  );
}

export default App;
