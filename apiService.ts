// apiService.ts
import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your actual backend base URL

const api = axios.create({
  baseURL,
});

export const signUpUser = async (email: string, username: string, password: string) => {
  try {
    
    const response = await api.post('/signup', { email, username, password });
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const submitRequest = async (email: string|null, title: string, description: string, imageUri: string|null) => {
  try {
    const response = await api.post('/tickets', {email, title, description, imageUri});
    return response.data;
  } catch (error) {
    console.error('Error submitting request:', error);
    throw error;
  }
};

export const getRequests = async (email: string|null) => {
  try {
    let response;
    if (email===null){
      response = await api.get('/tickets');
    } else {
      response = await api.get('/tickets', { params: { email } });
    }
    return response.data;
  } catch (error) {
    console.error('Error getting requests:', error);
    throw error;
  }
};

export const updateRequest = async (ticketId: string, newStatus: string|undefined, comment: string|undefined,) => {
  try {

    const response = await api.put(`/tickets/${ticketId}/status`, { newStatus, comment});
    return response.data;
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
};

// Add more API functions as needed
