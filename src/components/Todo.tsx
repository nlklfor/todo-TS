import React, {useEffect, useState, KeyboardEvent, ChangeEvent} from "react";
import './Todo.scss'
import {FilteredTypes} from "../App";


type TaskType = {
    id: string;
    title: string,
    isChecked: boolean;
}

type PropsType = {
    title: string;
    tasks: Array<TaskType>
    checkedTaskChange: (id: string, todoListId: string, isChecked: boolean) => void;
    onDelete: (id: string, todoId: string) => void;
    onDeleteTodo: (id: string) => void;
    onAdd: (taskTitle: string, todoListId: string) => void;
    changeFilter: (value: FilteredTypes, todoId: string) => void;
    setTask: Function;
    filtered: FilteredTypes;
    id: string;
}


function Todo(props: PropsType) {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onAllHandleChange = () => {
        props.changeFilter('all', props.id)
        console.log(props.filtered);
    }
    const onCompleteHandleChange = () => {
        props.changeFilter('completed', props.id);
        console.log(props.filtered);
    }
    const onActiveHandleChange = () => {
        props.changeFilter('active', props.id);
        console.log(props.filtered);
    }

    const onClear = () => {
        setTitle('')
    }

    const onAddTaskHandle = () => {
        if (title.trim() === '') {
            setError(`This field can't be empty`);
        } else {
            setError(null);
            props.onAdd(title, props.id);
            onClear();
        }

    }

    const onDeleteTodoHandle = () => {
        props.onDeleteTodo(props.id)
    }

    const onPressKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onAddTaskHandle()
        }
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (title.trim() !== null) {
            setError(null)
        }
        onChangeInput(event)
    }




    useEffect(() => {
        console.log('gizmo')
    }, [])

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onDeleteTodoHandle}>DELETE TODO</button>
            <div>
                {error && <p className={'error'}>{error}</p>}
                <input className={`${error ? 'error-input' : 'input'}`} onKeyDown={onPressKey} value={title}
                       onChange={onChangeInputValue}/>
                <button onClick={onAddTaskHandle}>+</button>
                <button onClick={onClear}>CLEAR
                </button>
            </div>
            <ul>
                {props.tasks.length > 0 ? props.tasks.map((item, index) => {
                    const changeTaskHandle = (e: ChangeEvent<HTMLInputElement>) => {
                        props.checkedTaskChange(item.id, props.id, e.currentTarget.checked)
                    }
                    const onDeleteTaskHandle = () => props.onDelete(item.id, props.id);
                    return (
                        <li key={index} className={`${item.isChecked ? 'is-done' : 'list-item'}`}>
                            <input type={"checkbox"}
                                   checked={item.isChecked} onChange={changeTaskHandle}/>
                            <span>{item.title}</span>
                            <button onClick={onDeleteTaskHandle}>x
                            </button>
                        </li>
                    )
                }) : <p>There are no tasks</p>}
            </ul>
            <div>
                <button className={`${props.filtered === 'all' ? 'button-active' : 'button'}`}
                        onClick={onAllHandleChange}>All
                </button>
                <button className={`${props.filtered === 'active' ? 'button-active' : 'button'}`}
                        onClick={onActiveHandleChange}>Active
                </button>
                <button className={`${props.filtered === 'completed' ? 'button-active' : 'button'}`}
                        onClick={onCompleteHandleChange}>Complete
                </button>
            </div>
            <button onClick={() => {
                console.log(props.id)
            }}>SHOW TODO ID
            </button>
        </div>

    )
}

export default Todo;