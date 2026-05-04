import React, { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  const handleAdd = async (todo) => {
    const created = await createTodo(todo);
    setTodos((prev) => [...prev, created]);
  };

  const handleToggle = async (todo) => {
    const updated = await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    setTodos((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="app-container">
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </main>
  );
}

export default App;
