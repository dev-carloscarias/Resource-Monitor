import axios from 'axios';
export async function getCpuServerA() {
  const result = await axios.get('http://34.122.252.196:5000/cpu');
  return await result.data; 
}

export async function getRamServerA() {
  const result = await axios.get('http://34.122.252.196:5000/ram');
  return await result.data; 
}
export async function getCpuServerB() {
  const result = await axios.get('http://35.239.57.113:5000/cpu');
  return await result.data; 
}
export async function getRamServerB() {
  const result = await axios.get('http://35.239.57.113:5000/ram');
  return await result.data; 
}

export async function getUsersServerA() {
  const result = await axios.get('http://35.239.57.113:5000/users');
  return await result.data; 
}

export async function getUsersServerB() {
  const result = await axios.get('http://34.122.252.196:5000/users');
  return await result.data; 
}