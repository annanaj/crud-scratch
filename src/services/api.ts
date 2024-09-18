import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const fetchUsers = () => {
	return axios.get(`${API_URL}/users`);
};

export const createUser = (user: { name: string; email: string }) => {
	return axios.post(`${API_URL}/users`, user);
};

export const updateUser = (
	id: number,
	user: { name: string; email: string }
) => {
	return axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = (id: number) => {
	return axios.delete(`${API_URL}/users/${id}`);
};
