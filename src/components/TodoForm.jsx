import React, { useEffect, useState } from 'react';

export function TodoForm({ editingTodo, onCancelEdit, onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(editingTodo);

  useEffect(() => {
    setTitle(editingTodo?.title ?? '');
    setDescription(editingTodo?.description ?? '');
  }, [editingTodo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    setIsSubmitting(true);
    const saved = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    setIsSubmitting(false);

    if (saved && !isEditing) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-950">
          {isEditing ? 'Modifier la tâche' : 'Ajouter une tâche'}
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
        disabled={isSubmitting || !title.trim()}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isSubmitting
          ? 'Enregistrement...'
          : isEditing
            ? 'Enregistrer les modifications'
            : 'Ajouter la tâche'}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
        >
          Annuler
        </button>
      )}
      </div>
    </form>
  );
}
