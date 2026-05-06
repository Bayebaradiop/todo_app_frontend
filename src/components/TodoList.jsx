import React from 'react';

export function TodoList({ todos, isLoading, onDelete, onToggle }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-950">Tâches</h2>
        <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {todos.length}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {isLoading ? (
          <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-500">
            Chargement...
          </li>
        ) : todos.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
            Aucune tâche pour le moment.
          </li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <label className="flex min-w-0 items-start gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo)}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-blue-600"
                />

                <span className="min-w-0">
                  <span
                    className={`block font-semibold ${
                      todo.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                    }`}
                  >
                    {todo.title}
                  </span>
                  {todo.description && (
                    <span className="mt-1 block text-sm text-slate-500">
                      {todo.description}
                    </span>
                  )}
                </span>
              </label>

              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                Supprimer
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
