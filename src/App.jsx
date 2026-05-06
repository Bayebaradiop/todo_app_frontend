import React, { useEffect, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError("Impossible de charger les tâches. Vérifie que le backend est lancé.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      setError('');
      const created = await createTodo(todo);
      setTodos((prev) => [...prev, created]);
    } catch (err) {
      setError("La tâche n'a pas pu être ajoutée.");
    }
  };

  const handleToggle = async (todo) => {
    try {
      setError('');
      const updated = await updateTodo(todo.id, { ...todo, completed: !todo.completed });
      setTodos((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError("La tâche n'a pas pu être mise à jour.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await deleteTodo(id);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("La tâche n'a pas pu être supprimée.");
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">DevOps Todo</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">Todo App</h1>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Total</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{todos.length}</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-blue-600">Terminées</p>
              <p className="mt-1 text-2xl font-bold text-blue-700">{completedCount}</p>
            </div>
          </div>
        </header>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
          <TodoForm onAdd={handleAdd} />
          <TodoList
            todos={todos}
            isLoading={isLoading}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
