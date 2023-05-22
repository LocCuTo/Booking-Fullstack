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

const getScheduleDoctorByDateAPI = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorByIdAPI = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorByIdAPI = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
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
    getScheduleDoctorByDateAPI,
    getExtraInfoDoctorByIdAPI,
    getProfileDoctorByIdAPI,
};
