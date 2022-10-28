import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export default function login(email, password) {
  return api.post('/login', { email, password });
}
