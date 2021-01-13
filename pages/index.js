import Head from 'next/head'
import Navbar from './components/Navbar'
import Airtable from 'airtable';
import { useEffect, useState, useContext } from 'react';
import { table, minifyRecords } from "./api/utils/Airtable";
import Todos from "../components/Todos"
import { TodosContext } from "../context/TodosContext";
import auth0 from "./api/utils/auth0";
import TodosForm from '../components/TodosForm';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);

  // console.log(user)

  useEffect(() => {
    setTodos(initialTodos)
  }, []);

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar user={user} />
      <main>
        {user ?
          <>
            <h1 className='text-2xl text-center mb-4'>My Todo's</h1>
            <TodosForm />
            <ul>
              {todos &&
                todos.map((todo) => (
                  <Todos key={todo.id} todo={todo} />
                ))
              }
            </ul>
          </>
          :
          <h1 className='text-xl text-center mb-4'>Login to see your to do's</h1>
        }


      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  // console.log(session)
  let todos = [];

  try {
    if (session?.user) {
      todos = await table.select({
        filterByFormula: `userId = '${session.user.sub}'`
      })
        .firstPage();
    }

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