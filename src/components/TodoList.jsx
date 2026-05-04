import React from 'react';

export function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.length === 0 ? (
          <li>Aucune tâche pour le moment.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              </label>
              <button type="button" onClick={() => onDelete(todo.id)}>
                Supprimer
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
