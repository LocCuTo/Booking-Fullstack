import {
    createNewUserAPI,
    deleteUserAPI,
    editUserServiceAPI,
    getAllClinicAPI,
    getAllCodeAPI,
    getAllDoctorsAPI,
    getAllSpecialtyAPI,
    getAllUsersAPI,
    getTopDoctorAPI,
    saveDetailDoctorAPI,
} from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeAPI('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('Fetch gender error: ', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('Fetch position error: ', e);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('Fetch role error: ', e);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserAPI(data);
            if (res && res.errCode === 0) {
                toast.success('User Created!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Something went wrong!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(saveUserFailed());
            }
        } catch (e) {
            toast.error('Something went wrong!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(saveUserFailed());
            console.log('fetch create user error: ', e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsersAPI('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailed());
            console.log('Fetch role error: ', e);
        }
    };
};

export const fetchAllUsersSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users,
});

export const fetchAllUsersFailed = (users) => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserAPI(id);
            if (res && res.errCode === 0) {
                toast.success('User Deleted!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Something went wrong!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Something went wrong!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(deleteUserFailed());
            console.log('fetch create user error: ', e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserServiceAPI(data);
            if (res && res.errCode === 0) {
                toast.success('User Updated!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('Something went wrong!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Something went wrong!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(editUserFailed());
            console.log('fetch create user error: ', e);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorAPI('');
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_FAILED });
        }
    };
};

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsAPI();
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorAPI(data);
            if (res && res.errCode === 0) {
                toast.success('Saved!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS });
            } else {
                toast.error('Something went wrong!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeAPI('TIME');
            if (res && res.errCode === 0) {
                dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS, data: res.data });
            } else {
                dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
            }
        } catch (e) {
            console.log(e);
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED });
        }
    };
};

export const getRequiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeAPI('PRICE');
            let resProvince = await getAllCodeAPI('PROVINCE');
            let resPayment = await getAllCodeAPI('PAYMENT');
            let resSpecialty = await getAllSpecialtyAPI();
            let resClinic = await getAllClinicAPI();
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS, data });
            } else {
                dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED });
            }
        } catch (e) {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED });
            console.log('Fetch required info error: ', e);
        }
    };
};
