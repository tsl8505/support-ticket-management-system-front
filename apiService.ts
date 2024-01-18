// apiService.ts
import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your actual backend base URL

const api = axios.create({
  baseURL,
});

export const signUpUser = async (email: string, username: string, password: string) => {
  try {
    
    console.log('signUpUser password: ', password);
    const response = await api.post('/signup', { email, username, password });
    console.log(response.data)
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

export const submitRequest = async (email: string|null, title: string, descriptioin: string, imageUri: string|null) => {
  try {
    const response = await api.post('/tickets', {email, title, descriptioin, imageUri});
    return response.data;
  } catch (error) {
    console.error('Error submitting request:', error);
    throw error;
  }
};

// Add more API functions as needed
