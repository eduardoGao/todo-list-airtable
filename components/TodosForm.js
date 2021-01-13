import React, { useState, useContext } from 'react'
import { TodosContext } from "../context/TodosContext";

function TodosForm() {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  }

  return (
    <form className='form my-6' onSubmit={handleSubmit}>
      <div className='flex flex-col mb-2 text-sm'>
        <label className='font-bold mb-2 text-gray-800' htmlFor='todo'>New To do</label>
        <input
          type='text'
          name='todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className='border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500'
        />
      </div>
      <button type='submit' className='w-full bg-green-500 p-2 text-white rounded-lg hover:bg-green-600'>Add</button>
    </form>
  )
}

export default TodosForm
