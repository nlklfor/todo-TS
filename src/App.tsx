import React, {useState} from 'react';
import './App.scss';
import Todo from "./components/Todo";
import {v1} from "uuid";

export type FilteredTypes = 'all' | 'completed' | 'active';

type TaskListType = {
    id: string,
    title: string,
    isChecked: boolean,
}

type TodoListType = {
    id: string;
    title: string;
    filtered: FilteredTypes;
}


function App() {


    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todos, setTodos] = useState<Array<TodoListType>>([
        {
            id: todoListId1, title: 'What to do', filtered: 'active'
        },
        {
            id: todoListId2, title: 'What to buy', filtered: 'all'
        },
    ]);

    const [tasksObj, setTasksObj] = useState({

        [todoListId1]:
            [
                {id: v1(), title: 'Learn HTML', isChecked: true},
                {id: v1(), title: 'Learn TS', isChecked: false},
                {id: v1(), title: 'Learn ReactJS', isChecked: true},
                {id: v1(), title: 'Learn MobX', isChecked: false},
                {id: v1(), title: 'Learn CSS', isChecked: true},
                {id: v1(), title: 'Learn MaterialUI', isChecked: false},
                {id: v1(), title: 'Learn JS', isChecked: true},
            ],
        [todoListId2]:
            [
                {id: v1(), title: 'Book', isChecked: true},
                {id: v1(), title: 'MacBook', isChecked: false},
                {id: v1(), title: 'Milk', isChecked: true},
            ],
    })


    const checkedTaskChange = (taskId: string, todoListId: string, isChecked: boolean) => {
        let tasks = tasksObj[todoListId];
        let findTasks = tasks.find(t => t.id === taskId);
        if (findTasks) {
            findTasks.isChecked = isChecked;
            setTasksObj({...tasksObj})
        }

    };

    const onAddTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isChecked: false}
        let tasks = tasksObj[todoListId];
        let tmpAdd = [task, ...tasks];
        tasksObj[todoListId] = tmpAdd
        if (title.trim() !== '')
            setTasksObj({...tasksObj});
    }

    const onChangeFilter = (value: FilteredTypes, todoId: string) => {
        let todoList = todos.find(t => t.id === todoId)
        if (todoList) {
            todoList.filtered = value;
            let tmpTodo = [...todos];
            setTodos(tmpTodo)
        }
    }

    const onDeleteTask = (id: string, todoListId: string) => {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj})
    }

    return (
        <div className="App">
            {todos.map((todo) => {
                let tasksForTodo = tasksObj[todo.id];
                if (todo.filtered === 'completed') {
                    tasksForTodo = tasksForTodo.filter(item => item.isChecked)
                }
                if (todo.filtered === 'active') {
                    tasksForTodo = tasksForTodo.filter(item => !item.isChecked)
                }
                if (todo.filtered === 'all') {
                    tasksForTodo = tasksForTodo.filter(item => item.isChecked || !item.isChecked)
                }

                return (
                    <Todo key={todo.id} title={todo.title} changeFilter={onChangeFilter} filtered={todo.filtered}
                          checkedTaskChange={checkedTaskChange} setTask={setTasksObj}
                          tasks={tasksForTodo} id={todo.id} onAdd={onAddTask}
                          onDelete={onDeleteTask}/>
                )
            })}
        </div>
    );
}

export default App;
