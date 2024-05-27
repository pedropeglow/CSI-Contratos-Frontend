import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5196/',
	timeout: 5000,
});
  

export const api = instance;
