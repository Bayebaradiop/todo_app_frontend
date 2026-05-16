const API_URL = import.meta.env.VITE_API_URL || '/api/todos';

async function parseJsonResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export async function fetchTodos() {
  const response = await fetch(API_URL);
  return parseJsonResponse(response);
}

export async function createTodo(todo) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return parseJsonResponse(response);
}

export async function updateTodo(id, todo) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  return parseJsonResponse(response);
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return parseJsonResponse(response);
}
