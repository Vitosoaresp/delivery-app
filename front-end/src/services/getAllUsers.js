import axios from 'axios';

export default function getAllUsers() {
  return axios.get('http://localhost:3001/users');
}
