import { useState, createContext } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const response = await fetch("/api/getTodos");
      const latestTodos = await response.json();
      setTodos(latestTodos);
    } catch (error) {
      console.error(error)
    }
  }

  const addTodo = async (todo) => {
    try {
      const response = await fetch("/api/createTodo", {
        method: 'POST',
        body: JSON.stringify({ description: todo }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => {
        const updatedTodos = [newTodo, ...prevTodos];
        return updatedTodos;
      })
    } catch (error) {
      console.error(error)
    }
  }

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await fetch("/api/updateTodo", {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await response.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(todo => todo.id === updatedTodo.id);
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      refreshTodos,
      updateTodo,
      deleteTodo,
      addTodo,
    }}>
      {children}
    </TodosContext.Provider>
  )
};

export { TodosProvider, TodosContext };