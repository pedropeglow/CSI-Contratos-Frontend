import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://reqres.in/api/',
	timeout: 5000,
});

export const api = instance;
