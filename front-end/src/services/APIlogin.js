import axios from 'axios';

export default function login(email, password) {
  return axios.post('http://localhost:3001/login', { email, password });
}
