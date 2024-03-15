const todos = [];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_ ,{ title }) => {
      const todo = {
        id: String(todos.length + 1),
        title,
        completed: false,
      };
      todos.push(todo);
      return todo;
    },
    toggleTodo: (_ ,{ id }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      todos[todoIndex].completed = !todos[todoIndex].completed;
      return todos[todoIndex];
    },
    deleteTodo: (_ ,{ id }) => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      const deletedTodo = todos.splice(todoIndex, 1);
      return deletedTodo[0];
    },
  },
};

module.exports = resolvers;
