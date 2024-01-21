import {useEffect, MouseEvent, useState, MouseEventHandler} from "react";
import './Todo.scss'


type TaskType = {
    id: string;
    title: string,
    isChecked: boolean;
}

type PropsType = {
    title: string;
    task: Array<TaskType>;
    checkedTaskChange: (id: string) => void;
    onDelete: Function;
    onAdd: (event: MouseEvent<HTMLButtonElement>) => void;
    onChangeValue: Function;
    taskTitle: string;
    active: (event: MouseEvent<HTMLButtonElement>) => void;
    complete: (event: MouseEvent<HTMLButtonElement>) => void;
    all: (event: MouseEvent<HTMLButtonElement>) => void;
    setTask: Function;
    filtered: string;
    onClear: (event: MouseEvent<HTMLButtonElement>) => void;
}


function Todo(props: PropsType) {

    const [error , setError] = useState<string | null>(null)

    const onAddTaskHandle = (event: MouseEvent<HTMLButtonElement>) => {
        props.onAdd(event);
        if (props.taskTitle.trim() === '') {
            setError(`This field can't be empty`);
        } else {
            setError(null);
        }

    }

    useEffect(() => {
        console.log('gizmo')
    }, [])
    
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                {error && <p className={'error'}>{error}</p>}
                <input className={`${error ? 'error-input' : 'input'}`} value={props.taskTitle} onChange={(event) =>
                    props.onChangeValue(event)
                }/>
                <button onClick={onAddTaskHandle}>+</button>
                <button onClick={props.onClear}>CLEAR
                </button>
            </div>
            <ul>
                {props.task.length > 0 ? props.task.map((item, index) => {
                    return (
                        <li key={index}>
                            <input type={"checkbox"}
                                   checked={item.isChecked} onChange={() => props.checkedTaskChange(item.id)}/>
                            <span>{item.title}</span>
                            <button onClick={() => {
                                props.onDelete(item.id)
                            }}>x
                            </button>
                        </li>
                    )
                }) : <p>There are no tasks</p>}
            </ul>
            <div>
                <button className={`${props.filtered === 'all' ? 'button-active' : 'button'}`} onClick={props.all}>All
                </button>
                <button className={`${props.filtered === 'active' ? 'button-active' : 'button'}`} onClick={props.active}>Active
                </button>
                <button className={`${props.filtered === 'completed' ? 'button-active' : 'button'}`} onClick={props.complete}>Complete
                </button>
            </div>
        </div>

    )
}

export default Todo;