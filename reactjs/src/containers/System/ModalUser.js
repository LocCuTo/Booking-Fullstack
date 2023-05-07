import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

const ModalUser = ({ modal, toggle, createNewUser }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
    });

    const listentoEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            setUser({ email: '', password: '', firstName: '', lastName: '', address: '' });
        });
    };

    const handleOnChangeInput = (e, id) => {
        let copyState = user;
        copyState[id] = e.target.value;
        setUser(copyState);
    };

    const checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!user[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };

    const addNewUser = () => {
        let isValid = checkValidateInput();
        if (isValid === true) {
            // call api
            createNewUser(user);
            listentoEmitter();
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" centered>
            <ModalHeader toggle={toggle}>Create a new user</ModalHeader>
            <ModalBody>
                <div className="row g-3">
                    <div className="col-6">
                        <label className="form-label" for="inputEmail4">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => handleOnChangeInput(e, 'email')}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label" for="inputPassword4">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => handleOnChangeInput(e, 'password')}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder="First name"
                            onChange={(e) => handleOnChangeInput(e, 'firstName')}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder="Last name"
                            onChange={(e) => handleOnChangeInput(e, 'lastName')}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label" for="inputAddress">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            placeholder="1234 Main St"
                            onChange={(e) => handleOnChangeInput(e, 'address')}
                        />
                    </div>
                    {/* <div className="col-md-6">
                        <label className="form-label" for="inputCity">
                            Phone number
                        </label>
                        <input type="text" className="form-control" name="phonenumber" />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" for="inputState">
                            Sex
                        </label>
                        <select name="gender" className="form-select">
                            <option selected>Select gender</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label" for="inputZip">
                            Role
                        </label>
                        <select name="roleId" className="form-select">
                            <option selected>Select role</option>
                            <option value="1">Admin</option>
                            <option value="2">Doctor</option>
                            <option value="3">Patient</option>
                        </select>
                    </div> */}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => addNewUser()} className="px-3">
                    Create
                </Button>{' '}
                <Button color="secondary" onClick={toggle} className="px-3">
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
