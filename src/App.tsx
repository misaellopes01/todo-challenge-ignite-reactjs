import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import styles from './App.module.css'

import Clipboard from './assets/Clipboard.svg'
import { Todo } from './components/Todo'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface ToDoProps {
  id: number
  title: string
}

function App() {

  const [todos, setTodos] = useState<ToDoProps[]>([])
  const [singleTodo, setSingleTodo] = useState({ id: 0, title: '' })
  const [todoCompleted, setTodoCompleted] = useState(0)
  const [todosCopy, setTodosCopy] = useState([0])

  function handleSetSingleTodo(event: FormEvent) {
    event.preventDefault()
    setTodos([...todos, singleTodo])
    setSingleTodo({ id: 0, title: '' })
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setSingleTodo({ id: Math.random(), title: event.target.value })
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo Obrigatório!')
  }


  function countCompleted(idForCount: number) {
    const totalCount = todos.filter(todo => {
      return todo.id !== idForCount
    })
    const singleToUseOnDeleteFunction = todos.find(todo => {
      return todo.id === idForCount
    })
    setTodoCompleted(state => state + (todos.length - totalCount.length))
    setTodosCopy([...todosCopy, Number(singleToUseOnDeleteFunction?.id)])
  }

  function deleteToDo(IdTodoToDelete: number) {
    const todosWithoutDeletedOne = todos.filter(todo => {
      return todo.id !== IdTodoToDelete
    })

    todosCopy.some(elem => elem === IdTodoToDelete) && setTodoCompleted(state => state - 1)
    setTodosCopy(todosCopy.filter(elem => elem !== IdTodoToDelete))
    setTodos(todosWithoutDeletedOne)

    todosWithoutDeletedOne.length === 0 && setTodoCompleted(0)
  }

  const emptyTodoArray = todos.length === 0


  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.inputContent} onSubmit={handleSetSingleTodo}>
          <input
            type="text"
            value={singleTodo.title}
            onChange={handleNewCommentChange}
            placeholder='Adicione uma nova tarefa'
            onInvalid={handleNewCommentInvalid}
            required
          />
          <button>
            Criar
            <PlusCircle size={21} />
          </button>
        </form>
        <div className={styles.contentBox}>
          <header className={styles.contentBoxHeader}>
            <h1>Tarefas criadas <span>{todos.length}</span></h1>
            <h2>Concluídas {emptyTodoArray ?
              <span>{todos.length}</span> :
              <>
                <span>{todoCompleted} de {todos.length}
                </span>
              </>}
            </h2>
          </header>
          {emptyTodoArray ?
            <div className={styles.content}>
              <img src={Clipboard} alt="Icon de Clipboard" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div> :
            todos.map((todo) => <Todo
              key={todo.id}
              title={todo.title}
              id={todo.id}
              onCountCompleted={countCompleted}
              onDeleteTodo={deleteToDo}
            />)
          }


        </div>

      </main>
    </div>
  )
}

export default App
