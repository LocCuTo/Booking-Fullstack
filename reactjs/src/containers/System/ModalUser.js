import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalUser = ({ modal, toggle }) => {
    const [arrUsers, setArrUsers] = useState([]);
    return (
        <Modal isOpen={modal} toggle={toggle} size="lg" centered>
            <ModalHeader toggle={toggle}>Create a new user</ModalHeader>
            <ModalBody>
                <div class="row g-3">
                    <div class="col-6">
                        <label class="form-label" for="inputEmail4">
                            Email
                        </label>
                        <input type="email" class="form-control" name="email" placeholder="Email" />
                    </div>
                    <div class="col-6">
                        <label class="form-label" for="inputPassword4">
                            Password
                        </label>
                        <input type="password" class="form-control" name="password" placeholder="Password" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">First name</label>
                        <input type="text" class="form-control" name="firstName" placeholder="First name" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Last name</label>
                        <input type="text" class="form-control" name="lastName" placeholder="Last name" />
                    </div>
                    <div class="col-md-12">
                        <label class="form-label" for="inputAddress">
                            Address
                        </label>
                        <input type="text" class="form-control" name="address" placeholder="1234 Main St" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="inputCity">
                            Phone number
                        </label>
                        <input type="text" class="form-control" name="phonenumber" />
                    </div>
                    <div class="col-md-3">
                        <label class="form-label" for="inputState">
                            Sex
                        </label>
                        <select name="gender" class="form-select">
                            <option selected>Select gender</option>
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label class="form-label" for="inputZip">
                            Role
                        </label>
                        <select name="roleId" class="form-select">
                            <option selected>Select role</option>
                            <option value="1">Admin</option>
                            <option value="2">Doctor</option>
                            <option value="3">Patient</option>
                        </select>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle} className="px-3">
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
