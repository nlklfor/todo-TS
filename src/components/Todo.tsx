import {useState} from "react";

type TaskType = {
    id: number;
    title: string,
    isChecked: boolean;
}

type PropsType = {
    title: string;
    task: Array<TaskType>
    onDelete: Function
    onAdd: Function
    onChange: Function
    taskTitle: string
    active: Function
    complete: Function
    all: Function
}

function Todo(props: PropsType){
    return(
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={() => {props.onChange()}} value={props.taskTitle}/>
                <button onClick={() => {props.onAdd()}}>+</button>
            </div>
            <ul>
                {props.task.map((item, index) => {
                    return(
                        <li>
                            <input defaultChecked={item.isChecked} key={index} type={"checkbox"} checked={item.isChecked}/>
                            <span>{item.title}</span>
                            <button onClick={() => {props.onDelete(item.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.all()}}>All</button>
                <button onClick={() => {props.active()}}>Active</button>
                <button onClick={() => {props.complete()}}>Complete</button>
            </div>
        </div>

    )
}

export default Todo;