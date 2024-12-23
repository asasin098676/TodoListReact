import { useContext, useEffect, useState } from 'react';
import './CreateNewTodo.scss'
import { Calendar, Clock, ChevronLeft, Paperclip } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from '../../../database/firebase';
import { AuthContext, AuthContextProps } from '../../../registration/Auth';

const CreateNewTodo = () => {
    const navigate = useNavigate();
    const [allowEdit, setAllowEdit] = useState(false);
    const [todoName, setTodoName] = useState('')
    const [todoDescription, setTodoDescription] = useState('')
    const [todoPriority, setTodoriority] = useState('');
    const [todoDate, setTodoDate] = useState('')
    const [todoTime, setTodoTime] = useState('')
    const [todoCategory, setTodoCategory] = useState('')
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const { user } = useContext(AuthContext) as AuthContextProps;

    useEffect(() => {
        if (user) {
            setUserEmail(user.email);
        } else {
            setUserEmail(null);
        }
    }, [user]);

    const isFormValid = todoName.trim() && todoDescription.trim() && todoCategory && todoPriority && todoDate && todoTime;

    const today = new Date();
    const hour = String(today.getHours());
    const minutes = String(today.getMinutes())
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const createDate = dd + '/' + mm + '/' + yyyy;
    const createTime = hour + ':' + minutes


    const handleCreateTodo = async () => {
        if (!userEmail) {
            console.error("User email is not available. Cannot create a todo.");
            return;
        }

        try {
            const userCollection = collection(db, userEmail);

            await setDoc(doc(userCollection), {
                name: todoName,
                description: todoDescription,
                priority: todoPriority,
                endDate: todoDate,
                endTime: todoTime,
                creationDate: createDate,
                creationTime: createTime,
                category: todoCategory,
                canEdit: allowEdit,
                file: 'Some File'
            });

            console.log("Todo successfully added!");

            navigate('/dashboard');
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };



    return (
        <>
            <div className='createTodoWindow'>
                <div className='createTodoWindowHeader'>
                    <div>
                        <button onClick={() => { navigate('/dashboard') }}> <ChevronLeft className="returnIcon" /></button>
                        <h2>Нове завдання</h2>
                    </div>

                    <button disabled={!isFormValid} onClick={handleCreateTodo} className='addButton'>create</button>
                </div>

                <div className='createTodoWindowMainBlock'>
                    <div className='nameAndDescroptionInputs'>
                        <input onChange={(e) => { setTodoName(e.target.value) }} className='createTodoName' placeholder='Назва завдання'></input>
                        <input onChange={(e) => { setTodoDescription(e.target.value) }} className='createTodoDescription' placeholder='детальний опис завдання...'></input>
                    </div>
                    <div className='otherOptionToCreatoTodo'>
                        <p className='settingTitle'>приорітет</p>
                        <div className='priorityOption'>
                            <button onClick={() => { setTodoriority('hight') }}
                                className={`priority hight ${todoPriority === 'hight' ? 'active' : ''}`}><p>високий</p></button>
                            <button onClick={() => { setTodoriority('medium') }}
                                className={`priority medium ${todoPriority === 'medium' ? 'active' : ''}`}><p>середній</p></button>
                            <button onClick={() => { setTodoriority('low') }}
                                className={`priority low ${todoPriority === 'low' ? 'active' : ''}`}><p>низький</p></button>
                        </div>
                        <p className='settingTitle'>категорія</p>
                        <div className='priorityOption'>
                            <button onClick={() => { setTodoCategory('home') }} className={`category home ${todoCategory === 'home' ? 'active' : ''}`}><p>home</p></button>
                            <button onClick={() => { setTodoCategory('job') }} className={`category job ${todoCategory === 'job' ? 'active' : ''}`}><p>job</p></button>
                            <button onClick={() => { setTodoCategory('entertainment') }} className={`category entertainment ${todoCategory === 'entertainment' ? 'active' : ''}`}><p>entertainment</p></button>
                        </div>
                        <div className='creationDateAndTime'>
                            <div className="dateSelect">
                                <label className="dateSelectLabel">Дата виконання</label>
                                <div>
                                    <input
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
                                <div>
                                    <input
                                        disabled={!todoDate}
                                        onChange={(e) => { setTodoTime(e.target.value) }}
                                        className='timeSelectInput'
                                        type="time"
                                    />
                                    <Clock className="timeSelectIcon" />
                                </div>
                            </div>
                        </div>
                        <p className='settingTitle'>Прикріплені файли</p>
                        <div className="addFileToTodo">
                            <div>
                                <input type='file'></input>
                                <Paperclip className="addFileIcon" />
                                <p className="text-gray-600">Перетягніть файли сюди або клікніть для завантаження</p>
                                <p className="text-sm text-gray-400 mt-1">Максимальний розмір файлу: 10MB</p>
                            </div>
                        </div>
                        <div className='additionalSettings'>
                            <div className='settingTitleBlock'>
                                <p className='settingTitle p'>Додаткові налаштування</p>
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
                    </div>
                </div>


            </div>
        </>
    )
}

export default CreateNewTodo