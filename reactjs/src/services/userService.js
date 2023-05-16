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

const editUserServiceAPI = (data) => {
    return axios.put('/api/edit-user', data);
};

const getAllCodeAPI = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
};

const getTopDoctorAPI = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

const getAllDoctorsAPI = () => {
    return axios.get('/api/get-all-doctors');
};

const saveDetailDoctorAPI = (data) => {
    return axios.post('/api/save-info-doctor', data);
};

const getDetailInfoDoctorAPI = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctorAPI = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

export {
    handleLoginAPI,
    getAllUsersAPI,
    createNewUserAPI,
    deleteUserAPI,
    editUserServiceAPI,
    getAllCodeAPI,
    getTopDoctorAPI,
    getAllDoctorsAPI,
    saveDetailDoctorAPI,
    getDetailInfoDoctorAPI,
    saveBulkScheduleDoctorAPI,
};
