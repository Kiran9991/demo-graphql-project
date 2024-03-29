import React from 'react';
import { ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import client from './apollo';
import TodoForm from './TodoForm';
import './app.css';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      completed
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggleTodo = (id) => {
    toggleTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }]
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo({
      variables: { id },
      refetchQueries: [{ query: GET_TODOS }]
    });
  };

  return (
    <div style={{ "width": "40rem"}}>
      <h1>Todo List</h1>
      <TodoForm/>
      <ul>
        {data.todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppWithApollo() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default AppWithApollo;
