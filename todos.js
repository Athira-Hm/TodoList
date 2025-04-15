import { BASE_URL, getToken } from './utils.js';

document.addEventListener('DOMContentLoaded', loadTodos);

window.createTodo = async function () {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;

  await fetch(`${BASE_URL}/todo/createTodo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ text })
  });

  input.value = '';
  loadTodos();
};

window.updateTodo = async function (id, checked) {
  await fetch(`${BASE_URL}/todo/updateTodo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ onCheckList: checked })
  });

  loadTodos();
};

window.deleteTodo = async function (id) {
  await fetch(`${BASE_URL}/todo/deleteTodo/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  loadTodos();
};

window.logout = async function () {
  const userId = localStorage.getItem('userId');
  await fetch(`${BASE_URL}/auth/logout/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  localStorage.clear();
  window.location.href = 'login.html';
};

async function loadTodos() {
  const res = await fetch(`${BASE_URL}/todo/getAllTodos`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const { data: todos } = await res.json(); // ✅ AMAN
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-50 p-2 rounded border';

    li.innerHTML = `
      <div class="flex items-center gap-2">
        <input type="checkbox" ${todo.onCheckList ? 'checked' : ''} onchange="updateTodo('${todo._id}', this.checked)" />
        <span class="${todo.onCheckList ? 'line-through text-gray-400' : ''}">${todo.text}</span>
      </div>
      <button onclick="deleteTodo('${todo._id}')" class="text-red-500 hover:text-red-700">Hapus</button>
    `;

    list.appendChild(li);
  });
}
