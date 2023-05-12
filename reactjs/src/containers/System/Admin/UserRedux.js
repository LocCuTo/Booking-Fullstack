import React, { useEffect, useState } from 'react';
import './UserRedux.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

const UserRedux = ({
    language,
    getGenderStart,
    getPositionStart,
    getRoleStart,
    genderRedux,
    isLoadingGender,
    positionRedux,
    roleRedux,
    createNewUser,
    listUsers,
}) => {
    const [genderArr, setGenderArr] = useState([]);
    const [positionArr, setPositionArr] = useState([]);
    const [roleArr, setRoleArr] = useState([]);
    const [previewURL, setPreviewURL] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phonenumber: '',
        address: '',
        gender: 'M',
        position: 'P0',
        role: 'R1',
        avatar: '',
    });

    const handleOnChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectURL = URL.createObjectURL(file);
            setPreviewURL(objectURL);
            setUser({ ...user, avatar: file });
        }
    };

    const openPreviewImage = () => {
        if (!previewURL) return;
        setIsOpen(true);
    };

    const checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phonenumber',
            'address',
            'gender',
            'position',
            'role',
            'avatar',
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!user[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    };

    const saveUser = () => {
        let isValid = checkValidateInput();
        if (isValid === false) return;

        // fire redux action
        createNewUser({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            gender: user.gender,
            roleId: user.role,
            positionId: user.position,
        });
    };

    const onChangeInput = (e, id) => {
        let copyState = { ...user };
        copyState[id] = e.target.value;

        setUser({ ...copyState });
    };

    useEffect(() => {
        getGenderStart();
        getPositionStart();
        getRoleStart();
    }, [getGenderStart, getPositionStart, getRoleStart]);

    useEffect(() => {
        setGenderArr(genderRedux);
        setPositionArr(positionRedux);
        setRoleArr(roleRedux);
    }, [genderRedux, positionRedux, roleRedux]);

    useEffect(() => {
        setUser({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: 'M',
            position: 'P0',
            role: 'R1',
            avatar: '',
        });
    }, [listUsers]);

    return (
        <div className="user-redux-container">
            <div className="title">User redux</div>

            <div className="user-redux-body">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-12">
                            <FormattedMessage id="manage-user.add" />
                        </div>
                        <div className="col-12">{isLoadingGender === true ? 'Loading genders' : ''}</div>
                        <div class="col-6">
                            <label class="form-label" for="inputEmail4">
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input
                                type="email"
                                class="form-control"
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => onChangeInput(e, 'email')}
                            />
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="inputPassword4">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="password"
                                class="form-control"
                                name="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => onChangeInput(e, 'password')}
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.firstName" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                name="firstName"
                                placeholder="First name"
                                value={user.firstName}
                                onChange={(e) => onChangeInput(e, 'firstName')}
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.lastName" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                name="lastName"
                                placeholder="Last name"
                                value={user.lastName}
                                onChange={(e) => onChangeInput(e, 'lastName')}
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" for="inputAddress">
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                name="address"
                                placeholder="1234 Main St"
                                value={user.address}
                                onChange={(e) => onChangeInput(e, 'address')}
                            />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" for="inputCity">
                                <FormattedMessage id="manage-user.phonenumber" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                name="phonenumber"
                                value={user.phonenumber}
                                onChange={(e) => onChangeInput(e, 'phonenumber')}
                            />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label" for="inputState">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select name="gender" class="form-select" onChange={(e) => onChangeInput(e, 'gender')}>
                                {genderArr &&
                                    genderArr.length > 0 &&
                                    genderArr.map((item, i) => {
                                        return (
                                            <option key={i} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label" for="inputState">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select name="position" class="form-select" onChange={(e) => onChangeInput(e, 'position')}>
                                {positionArr &&
                                    positionArr.length > 0 &&
                                    positionArr.map((item, i) => {
                                        return (
                                            <option key={i} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label" for="inputZip">
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select name="role" class="form-select" onChange={(e) => onChangeInput(e, 'role')}>
                                {roleArr &&
                                    roleArr.length > 0 &&
                                    roleArr.map((item, i) => {
                                        return (
                                            <option key={i} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className="preview-img-container">
                                <input type="file" className="form-control" onChange={(e) => handleOnChangeImage(e)} />
                                <div
                                    className="preview-image"
                                    onClick={() => openPreviewImage()}
                                    style={{ backgroundImage: `url(${previewURL})` }}
                                ></div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" onClick={() => saveUser()}>
                                <FormattedMessage id="manage-user.save" />
                            </button>
                        </div>
                        <div className="col-12">
                            <TableManageUser />
                        </div>
                    </div>
                </div>
            </div>

            {isOpen === true && <Lightbox mainSrc={previewURL} onCloseRequest={() => setIsOpen(false)} />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
