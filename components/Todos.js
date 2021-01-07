import React from 'react'

function Todos({ todo }) {
  return (
    <li className='bg-white flex items-center shadow-lg rounded-lg my-2 p-3'>
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={todo.fields.completed}
        className='mr-2 form-checkbox h-4 w-4'
      />
      <h2
        className={`text-lg font-bold text-gray-800 flex-1 ${todo.fields.completed ? 'line-through' : ''}`}
      >
        {todo.fields.description}
      </h2>
      <button
        type='button'
        className='text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded'
      >
        Delete
      </button>
    </li>
  )
}

export default Todos
