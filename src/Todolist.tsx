import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (t: string) => {
        props.removeTask(t)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <Button callBack={addTaskHandler} nickName={'+'} />
            {/*<button onClick={addTaskHandler}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return(
                       <li key={t.id}>
                           <input type="checkbox" checked={t.isDone}/>
                           <span>{t.title}</span>
                           <Button callBack={()=>removeTaskHandler(t.id)} nickName={'x'} />
                           {/*<button onClick={()=>removeTaskHandler(t.id)}>x</button>*/}
                       </li>
                    )
                })
            }
        </ul>
        <div>
            <Button callBack={()=>changeFilterHandler('all')} nickName={'All'} />
            <Button callBack={()=>changeFilterHandler('active')} nickName={'Active'} />
            <Button callBack={()=>changeFilterHandler('completed')} nickName={'Completed'} />
            {/*<button onClick={()=>changeFilterHandler('all')}>All</button>*/}
            {/*<button onClick={()=>changeFilterHandler('active')}>Active</button>*/}
            {/*<button onClick={()=>changeFilterHandler('completed')}>Completed</button>*/}
        </div>
    </div>
}
