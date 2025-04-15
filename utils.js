export const BASE_URL = 'https://api-todo-list-pbw.vercel.app';

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setUserId(userId) {
  localStorage.setItem('userId', userId);
}