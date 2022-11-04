import axios from 'axios';

export default function getSallers() {
  return axios.get('http://localhost:3001/users/sallers');
}
