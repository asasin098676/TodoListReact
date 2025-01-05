import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Edit2, AlertCircle, Calendar, Clock, Trash2 } from 'lucide-react';
import "./Todo-details.scss"
import { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../database/firebase";
import { AuthContext, AuthContextProps } from "../../../registration/Auth";


const TodoDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const todo = location.state;

    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState(todo.name)
    const [newDescrioption, setNewDescription] = useState(todo.description)
    const [todoDate, setTodoDate] = useState(todo.endDate)
    const [todoTime, setTodoTime] = useState(todo.endTime)
    const [allowEdit, setAllowEdit] = useState(todo.canEdit);
    const [todoPriority, setTodoriority] = useState(todo.priority);
    const [todoStatus, setTodoStatus] = useState(todo.status)
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const { user } = useContext(AuthContext) as AuthContextProps;

    console.log(todoStatus);

    useEffect(() => {
        if (user) {
            setUserEmail(user.email);
        } else {
            setUserEmail(null);
        }
    }, [user]);

    const saveNewChanges = async () => {

        try {
            const docRef = doc(db, userEmail!, todo.id);
            await updateDoc(docRef, {
                canEdit: allowEdit,
                description: newDescrioption,
                endDate: todoDate,
                endTime: todoTime,
                name: newName,
                priority: todoPriority,
                status: todoStatus
            });
            console.log('Дані успішно збережено!');

        } catch (err) {
            console.error('Помилка збереження даних:', err);
        }



        navigate('/dashboard')
    }

    const deleteTodo = async () => {
        try {
            await deleteDoc(doc(db, userEmail!, todo.id));
            navigate('/dashboard')
        } catch (error) {
            console.warn(error)
        }
    }



    return (
        <>
            <div className="taskDetailsPage">
                <div className="taskDetailsPageHeader">
                    {edit ?
                        <>
                            <div className="taskDetailTitile">
                                <button onClick={() => { navigate('/dashboard') }}> <ChevronLeft className="returnIcon" /></button>
                                <span>Редагування завдання</span>
                            </div>
                            <div className="taskDetailEditButton">
                                <button onClick={() => { setEdit(false) }}>Скасувати</button>
                                <button className="saveChangeButton" onClick={saveNewChanges}>
                                    Зберегти зміни</button>
                            </div>
                        </>
                        :
                        <>
                            <div className="taskDetailTitile">
                                <button onClick={() => { navigate('/dashboard') }}> <ChevronLeft className="returnIcon" /></button>
                                <div className={todo.priority} ></div>
                                <span>{todo.name}</span>
                            </div>
                            {todo.canEdit ? <div className="taskDetailEditButton">
                                <button disabled={!todo.canEdit} onClick={() => { setEdit(true) }}>
                                    <Edit2 className="taskDetailEditButtonIcon" />
                                    Редагувати</button>
                            </div>
                                : <></>}
                            {/* <div className="taskDetailEditButton">
                                <button disabled={!todo.canEdit} onClick={() => { setEdit(true) }}>
                                    <Edit2 className="taskDetailEditButtonIcon" />
                                    Редагувати</button>
                            </div> */}
                        </>

                    }
                </div>
                <div className="taskDetailsPageMainBlock">
                    <div className="taskDetailsPageMainLeftBlock">
                        {edit ?
                            <>
                                <div className="taskDescription">
                                    <span className="taskDescriptionTitle">Назва завдання</span>
                                    <div className="taskNameValue">
                                        <input className="editNameInput" onChange={(e) => { setNewName(e.target.value) }} value={newName}></input>
                                    </div>
                                    <span className="taskDescriptionTitle">Опис завдання</span>
                                    <div className="taskDescriptionValue">
                                        <textarea wrap="hard" className="editDescriptionInput" onChange={(e) => { setNewDescription(e.target.value) }} value={newDescrioption}>
                                        </textarea>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="taskDescription">
                                    <span className="taskDescriptionTitle">Опис завдання</span>
                                    <div className="taskDescriptionValue">
                                        <span>{todo.description}</span>
                                    </div>
                                </div>
                                <div className="taskFiles"></div>
                                <div className="taskComments"></div>
                            </>

                        }

                    </div>
                    <div className="taskDetailsPageMainRightBlock">
                        <div className="taskDetailData">
                            {edit ?
                                <>
                                    <div className="statusEdit">
                                        <label>Статус</label>
                                        <select onChange={(e) => { setTodoStatus(e.target.value) }} className="statusSelect">
                                            <option value='new'>Новий</option>
                                            <option value='in progres'>В процесі</option>
                                            <option value='checking'>На перевірці</option>
                                            <option value='done'>Завершено</option>
                                        </select>
                                    </div>
                                    <div className="editPriority">
                                        <label>Приорітет</label>
                                        <div className="editPriorityButtons">
                                            <button onClick={() => { setTodoriority('hight') }}
                                                className={`priority hight ${todoPriority === 'hight' ? 'active' : ''}`}><p>високий</p></button>
                                            <button onClick={() => { setTodoriority('medium') }}
                                                className={`priority medium ${todoPriority === 'medium' ? 'active' : ''}`}><p>середній</p></button>
                                            <button onClick={() => { setTodoriority('low') }}
                                                className={`priority low ${todoPriority === 'low' ? 'active' : ''}`}><p>низький</p></button>
                                        </div>
                                    </div>

                                    <div className='editDateAndTime'>
                                        <div className="dateSelect">
                                            <label className="dateSelectLabel">Дата виконання</label>
                                            <div className="dateSelectInputBlock">
                                                <input
                                                    value={todoDate}
                                                    onChange={(e) => { setTodoDate(e.target.value) }}
                                                    type="date"
                                                    className="dateSelectInput"
                                                    min={new Date().toISOString().split("T")[0]}
                                                />
                                                <Calendar className="dateSelectIcon" />
                                            </div>
                                        </div>

                                        <div className="timeSelect">
                                            <label className="timeSelectLabel">Час</label>
                                            <div className="timeSelectInputBlock">
                                                <input
                                                    value={todoTime}
                                                    onChange={(e) => { setTodoTime(e.target.value) }}
                                                    className='timeSelectInput'
                                                    type="time"
                                                />
                                                <Clock className="timeSelectIcon" />
                                            </div>
                                        </div>

                                        <div className='additionalSettingBlock'>
                                            <div className='additionalSettingBlockTitle'>
                                                <h3>Дозволити редагування</h3>
                                                <p>Ви зможете редагувати це завдання</p>
                                            </div>

                                            {allowEdit ? <button onClick={() => { setAllowEdit(false) }} className='buttonAllowdEdit'>
                                                <div className="innerCircleAlowd"></div>
                                            </button> : <button onClick={() => { setAllowEdit(true) }} className='buttonNotAllowdEdit'>
                                                <div className="innerCircleNotAlowd"></div>
                                            </button>}

                                        </div>


                                    </div>
                                    <button onClick={deleteTodo} className="deleteButton">
                                        <Trash2 className="deleteIcon" />  Видалити завдання
                                    </button>
                                </>
                                :
                                <>
                                    <div className="taskDetailDataStatus">
                                        <span>Статус</span>
                                        <div className="taskStatus">
                                            <span>{todo.status}</span>
                                        </div>
                                    </div>
                                    <div className="taskDetailDataPriority">
                                        <span>Приорітет</span>
                                        <div className="priorityData">
                                            <AlertCircle className={`priorytyIcon ${todo.priority}`} />
                                            <span className={todo.priority}>{todo.priority}</span>
                                        </div>

                                    </div>
                                    <div className="taskDetailDataDeadTime">
                                        <span>Дедлайн</span>
                                        <div>
                                            <Calendar className="icon"></Calendar>
                                            <span>{todo.endDate}</span>
                                        </div>
                                        <div>
                                            <Clock className="icon"></Clock>
                                            <span>{todo.endTime}</span>
                                        </div>

                                    </div>
                                    <div className="taskDetailDataUsers">
                                        <span>Учасники</span>

                                    </div>

                                </>

                            }




                        </div>
                        <div className="taskHistory">

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default TodoDetails