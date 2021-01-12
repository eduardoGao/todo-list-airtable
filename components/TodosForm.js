import React, { useState, useContext } from 'react'
import { TodosContext } from "../context/TodosContext";

function TodosForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);

  return (
    <div>

    </div>
  )
}

export default TodosForm
