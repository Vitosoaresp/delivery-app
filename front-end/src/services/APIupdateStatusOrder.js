import axios from 'axios';

export default async function updateStatusOrder(id, status) {
  try {
    const { data } = await axios.put(`http://localhost:3001/sales/${id}`, { status });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
