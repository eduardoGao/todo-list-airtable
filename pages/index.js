import Head from 'next/head'
import Navbar from './components/Navbar'
import Airtable from 'airtable';
import { useEffect, useState, useContext } from 'react';
import { table, minifyRecords } from "./api/utils/Airtable";
import Todos from "../components/Todos"
import { TodosContext } from "../context/TodosContext";
import auth0 from "./api/utils/auth0";

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);

  // console.log(user)

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar user={user} />
        <h1>To Do App</h1>
        {/* <div>
          {list.map((item) => (
            <div key={item.id}>
              <h2>{item.fields.description}</h2>
              <input type="checkbox" defaultChecked={item.fields.completed} />
            </div>
          ))}
        </div> */}
        <ul>
          {todos &&
            todos.map((todo) => (
              <Todos key={todo.id} todo={todo} />
            ))
          }

        </ul>

      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  // console.log(session)

  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: "Something went wrong"
      }
    }
  }
}