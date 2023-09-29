import React, {useState} from 'react';
import './App.css';
import Todo from "./components/Todo";


function App() {
    const [task, setTask] = useState([
        {id: 1, title: 'Learn HTML', isChecked: true},
        {id: 2, title: 'Learn TS', isChecked: false},
        {id: 3, title: 'Learn ReactJS', isChecked: true},
        {id: 4, title: 'Learn MobX', isChecked: false},
        {id: 5, title: 'Learn CSS', isChecked: true},
        {id: 6, title: 'Learn MaterialUI', isChecked: false},
        {id: 7, title: 'Learn JS', isChecked: true},
    ])
    const [filtered, setFiltered] = useState('all')
    const [taskTitle, setTaskTitle] = useState('')

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value)
    }

    const onAddTask = () => {
        let newTasks = [...task, taskTitle]
        console.log(newTasks)
    }

    let tasksForTodo = task;

    if (filtered === 'completed') {
        tasksForTodo = task.filter(item=> item.isChecked === true)
    }
    if (filtered === 'active') {
        tasksForTodo = task.filter(item=> item.isChecked === false)
    }
    if (filtered === 'all') {
        tasksForTodo = task.filter(item=> (item.isChecked === true) || (item.isChecked === false))
    }
    const onComplete = () => {
        setFiltered('completed')
        console.log(tasksForTodo)
    }
    const onActive = () => {
        setFiltered('active')
        console.log(tasksForTodo)
    }
    const onAll = () => {
        setFiltered('all')
        console.log(tasksForTodo)
    }
    const onDeleteTask = (id: number) => {
        setTask(task.filter( item=> item.id !== id))
    }
    return (
        <div className="App">
            <Todo title={'Learn TS + ReactJS'} taskTitle={taskTitle} all={onAll} complete={onComplete} active={onActive} task={tasksForTodo} onChange={onChangeInputValue} onAdd={onAddTask} onDelete={onDeleteTask}/>
        </div>
    );
}

export default App;
