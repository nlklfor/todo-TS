import React, {useState} from 'react';
import './App.scss';
import Todo from "./components/Todo";
import {v1} from "uuid";


function App() {
    const [task, setTask] = useState([
        {id: v1(), title: 'Learn HTML', isChecked: true},
        {id: v1(), title: 'Learn TS', isChecked: false},
        {id: v1(), title: 'Learn ReactJS', isChecked: true},
        {id: v1(), title: 'Learn MobX', isChecked: false},
        {id: v1(), title: 'Learn CSS', isChecked: true},
        {id: v1(), title: 'Learn MaterialUI', isChecked: false},
        {id: v1(), title: 'Learn JS', isChecked: true},
    ])
    const [filtered, setFiltered] = useState('all')
    const [taskTitle, setTaskTitle] = useState('')



    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.target.value)
        console.log(event.target.value);
    }

    const checkedTaskChange = (taskId: string) => {
        setTask((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    };

    const onClear = () => {
        setTaskTitle('');
    }

    const onAddTask = () => {
        let tmpAdd = [...task];
        tmpAdd.push({id: v1(), title: taskTitle, isChecked: false})
        if (taskTitle.trim() !== '') {
            setTask(tmpAdd);
        }
        onClear();
    }

    let tasksForTodo = task;

    if (filtered === 'completed') {
        tasksForTodo = task.filter(item=> item.isChecked)
    }
    if (filtered === 'active') {
        tasksForTodo = task.filter(item=> !item.isChecked)
    }
    if (filtered === 'all') {
        tasksForTodo = task.filter(item=> item.isChecked || !item.isChecked)
    }
    const onComplete = () => {
        setFiltered('completed')

    }
    const onActive = () => {
        setFiltered('active')

    }
    const onAll = () => {
        setFiltered('all')

    }
    const onDeleteTask = (id: string) => {
        setTask(task.filter( item=> item.id !== id))
    }
    return (
        <div className="App">
            <Todo title={'Learn TS + ReactJS'} filtered={filtered} checkedTaskChange={checkedTaskChange} onClear={onClear} setTask={setTask} taskTitle={taskTitle} all={onAll} complete={onComplete} active={onActive} task={tasksForTodo} onChangeValue={onChangeInputValue} onAdd={onAddTask} onDelete={onDeleteTask}/>
        </div>
    );
}

export default App;
