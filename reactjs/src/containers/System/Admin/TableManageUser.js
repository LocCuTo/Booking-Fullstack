import { connect } from 'react-redux';
import './TableManageUser.scss';
import { useEffect, useState } from 'react';
import * as actions from '../../../store/actions';

const TableManageUser = ({ fetchUserRedux, listUsers, deleteUserRedux }) => {
    const [arrUsers, setArrUsers] = useState();

    const handleDeleteUser = (user) => {
        deleteUserRedux(user.id);
    };

    useEffect(() => {
        fetchUserRedux();
    }, [fetchUserRedux]);

    useEffect(() => {
        setArrUsers(listUsers);
    }, [listUsers, arrUsers]);

    return (
        <table id="TableManageUser">
            <tbody>
                <tr>
                    <th>Email</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                {arrUsers &&
                    arrUsers.length > 0 &&
                    arrUsers.map((item, i) => {
                        return (
                            <tr>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className="btn btn-primary mx-2" style={{ width: '60px' }}>
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ width: '60px' }}
                                        onClick={() => handleDeleteUser(item)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
