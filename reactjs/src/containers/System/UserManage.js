import { useEffect, useState } from 'react';
import './UserManage.scss';
import { connect } from 'react-redux';
import { createNewUserAPI, deleteUserAPI, editUserServiceAPI, getAllUsersAPI } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

const UserManage = () => {
    const [arrUsers, setArrUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [userEdit, setUserEdit] = useState({});

    const getUser = async () => {
        let response = await getAllUsersAPI('ALL');
        if (response && response.errCode === 0) {
            setArrUsers(response.users);
        }
    };

    const handleAddNewUser = () => {
        setModal(true);
    };

    const toggleUserModal = () => {
        setModal(!modal);
    };

    const createNewUser = async (data) => {
        try {
            let res = await createNewUserAPI(data);
            if (res && res.errCode !== 0) {
                alert(res.errMessage);
            } else {
                await getAllUsersAPI();
                setModal(false);
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteUser = async (user) => {
        try {
            let res = await deleteUserAPI(user.id);
            if (res && res.errCode === 0) {
                await getAllUsersAPI();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const editUser = (user) => {
        setModalEdit(true);
        setUserEdit(user);
    };

    const toggleUserEditModal = () => {
        setModalEdit(!modalEdit);
    };

    const doEditUser = async (user) => {
        let res = await editUserServiceAPI(user);
        try {
            if (res && res.errCode === 0) {
                setModalEdit(false);
                await getAllUsersAPI();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, [arrUsers]);

    return (
        <div className="users-container">
            <ModalUser modal={modal} toggle={toggleUserModal} createNewUser={createNewUser} />
            <ModalEditUser
                modal={modalEdit}
                toggle={toggleUserEditModal}
                currentUser={userEdit}
                editUser={doEditUser}
            />
            <div className="title text-center">Manage users</div>
            <div className="mx-1">
                <button className="btn btn-primary px-3" onClick={() => handleAddNewUser()}>
                    <i className="fas fa-plus"></i> Add new user
                </button>
            </div>
            <div className="users-table mt-3 mx-1">
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUsers &&
                            arrUsers.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary mx-2"
                                                style={{ width: '60px' }}
                                                onClick={() => editUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ width: '60px' }}
                                                onClick={() => deleteUser(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
