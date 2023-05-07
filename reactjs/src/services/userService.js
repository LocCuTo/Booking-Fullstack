import axios from '../axios';

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUsersAPI = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`);
};

const createNewUserAPI = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserAPI = (id) => {
    return axios.delete('/api/delete-user', { data: { id } });
};

export { handleLoginAPI, getAllUsersAPI, createNewUserAPI, deleteUserAPI };
