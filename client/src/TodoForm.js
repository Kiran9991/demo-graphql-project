import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './TodoForm.css';

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

function TodoForm() {
  const [title, setTitle] = useState('');
  const [addTodo] = useMutation(ADD_TODO);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        variables: { title },
        refetchQueries: ['GetTodos']
      });
      setTitle('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="add-button" type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
