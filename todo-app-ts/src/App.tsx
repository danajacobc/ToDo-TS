import { useState } from "react";
import { Todos } from "./components/todos/Todos";
import {  type FilterValue, type TodoTitle, type TodoId, type Todo as TodoType } from "./types";
import { TODO_FILTERS } from "./consts";
import { Footer } from "./components/footer/Footer";
import { Header } from "./components/header/Header";


const mockTodos = [
  {
    id: '1',
    title: 'Ir a entrenar.',
    completed: false,
  },
  {
    id: '2',
    title: 'Hacer las compras.',
    completed: false,
  },
  {
    id: '3',
    title: 'Terminar temporada de la serie.',
    completed: false,
  },
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        return { ...todo, completed }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue) : void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filterTodos = todos.filter(todo => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  return (
   
      <div className="todoapp">
        
        <Header onAddTodo={handleAddTodo}/>
        <Todos 
        onToggleCompleted={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filterTodos}
        />
        <Footer
        activeCount={activeCount}
        filterSelected={filterSelected}
        completedCount={completedCount}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
        />
      </div>
     
    
  )
}

export default App
