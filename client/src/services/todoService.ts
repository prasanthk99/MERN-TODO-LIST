// todoService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api/data';

export const getTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addTodo = async (todo: any) => {
  const response = await axios.post(API_BASE_URL, todo);
  return response.data;
};

export const updateTodo = async (id: string, todo: any) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const updateTodoOrder = async (updatedTodoOrder: string[]) => {
  try {
    // Call your API to update the todos order on the server
    // Example API call (replace with your actual API endpoint)
    await axios.put('http://localhost:3001/api/todos/order', { todoIds: updatedTodoOrder });

    console.log('Todos order updated on the server');
  } catch (error) {
    console.error('Error updating todos order on the server', error);
    throw error; // Propagate the error for further handling, if needed
  }
};
