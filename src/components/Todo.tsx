import { Trash } from 'phosphor-react'
import { useState } from 'react'
import styles from './Todo.module.css'

interface ToDoProps {
    id: number
    title: string
    onCountCompleted: (idForCount: number) => void
    onDeleteTodo: (idToDelete: number) => void
}

export function Todo({ title, id, onCountCompleted, onDeleteTodo }: ToDoProps) {

    const [check, setCheck] = useState(false)

    function handleCheckToDo() {
        !check ? setCheck(true) : setCheck(false)
    }

    function updateCount() {
        onCountCompleted(id)
    }

    function setCompletedToDo() {
        updateCount()
    }

    function handleDeleteTodo() {
        onDeleteTodo(id)
    }

    return (
        <div className={styles.todoBox}>
            <label className={styles.container} >
                <input
                    type="checkbox"
                    value={id}
                    onChange={handleCheckToDo}
                    onClick={setCompletedToDo}
                    disabled={check}
                />
                <span className={styles.checkmark}></span>
            </label>
            <p className={check ? styles.textDashed : ''} >{title}</p>
            <button onClick={handleDeleteTodo}>
                <Trash size={16} />
            </button>
        </div>
    )
}