import { BASE_URL, getToken } from './utils.js';

if (!getToken()) {
  alert("Silakan login terlebih dahulu.");
  window.location.href = "login.html";
}

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

window.updateTodo = async function (id, checked, text = null) {
  const body = { onCheckList: checked };
  if (text !== null) body.text = text;

  await fetch(`${BASE_URL}/todo/updateTodo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(body)
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

window.editTodo = async function (id, oldText) {
  const newText = prompt("Edit todo:", oldText);
  if (newText && newText !== oldText) {
    await updateTodo(id, false, newText);
  }
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

  const { data: todos } = await res.json();
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-gray-50 p-2 rounded border';

    const createdDate = new Date(todo.createdAt || Date.now()).toLocaleString();

    li.innerHTML = `
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <input type="checkbox" ${todo.onCheckList ? 'checked' : ''} onchange="updateTodo('${todo._id}', this.checked)" />
          <span class="${todo.onCheckList ? 'line-through text-gray-400' : ''}">${todo.text}</span>
        </div>
        <span class="text-xs text-gray-400">${createdDate}</span>
      </div>
      <div class="flex gap-2">
        <button onclick="editTodo('${todo._id}', '${todo.text}')" class="text-blue-500 hover:text-blue-700">Edit</button>
        <button onclick="deleteTodo('${todo._id}')" class="text-red-500 hover:text-red-700">Hapus</button>
      </div>
    `;

    list.appendChild(li);
  });
}