import { BASE_URL, setToken, setUserId } from './utils.js';


async function register() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password })
  });

  const data = await res.json();
  alert(data.message || 'Registered!');

  if (res.ok) {
    window.location.href = 'login.html';
  }
}


async function login(event) {
  event.preventDefault();
  console.log("Login function called");

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    console.log("sedang masuk ke fetch");
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    console.log("berhasil masuk ke fetch");

    const data = await res.json();
    console.log("berhasil menginisiasi data", data);

    if (data.data && data.data.token) {
      alert("Login Successfully");
      console.log("Token diterima:", data.data.token);
      setToken(data.data.token);
      // Tidak menyimpan userId karena tidak ada di respons
      console.log("Redirecting to todos.html");
      setTimeout(() => {
        window.location.href = "todos.html";
      }, 100);
    } else {
      alert(data.message || 'Login gagal! Tidak ada token ditemukan.');
      console.log("Respons tidak berisi token:", data);
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Terjadi kesalahan saat login!");
  }
}

async function logout() {
  const token = localStorage.getItem('token');

  // Karena userId tidak tersedia dari login, kita perlu menyesuaikan logika logout
  // // Misalnya, coba tanpa userId atau ambil dari token jika diperlukan
  // await fetch(`${BASE_URL}/auth/logout`, {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${token}` }
  // });

  localStorage.clear();
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      register();
    });
  }
});

window.register = register;
window.logout = logout;
window.goto = goto; 
