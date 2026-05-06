import React, { useState } from 'react';

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          Ajouter une tâche
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-slate-700"
        >
          Titre
        </label>

        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex: Finir le projet React"
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-700"
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ajouter une description..."
          rows="4"
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        Ajouter la tâche
      </button>
      </div>
    </form>
  );
}
