import { useState, createContext } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  return (
    <TodosContext.Provider>{children}</TodosContext.Provider>
  )
}