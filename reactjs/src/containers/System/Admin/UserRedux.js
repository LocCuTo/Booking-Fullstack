import React, { useEffect, useState } from 'react';
import './UserRedux.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const UserRedux = ({
    language,
    getGenderStart,
    getPositionStart,
    getRoleStart,
    genderRedux,
    isLoadingGender,
    positionRedux,
    roleRedux,
}) => {
    const [genderArr, setGenderArr] = useState([]);
    const [positionArr, setPositionArr] = useState([]);
    const [roleArr, setRoleArr] = useState([]);
    const [previewURL, setPreviewURL] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleOnChangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectURL = URL.createObjectURL(file);
            setPreviewURL(objectURL);
        }
    };

    const openPreviewImage = () => {
        if (!previewURL) return;
        setIsOpen(true);
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
                            <input type="email" class="form-control" name="email" placeholder="Email" />
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="inputPassword4">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input type="password" class="form-control" name="password" placeholder="Password" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.firstName" />
                            </label>
                            <input type="text" class="form-control" name="firstName" placeholder="First name" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.lastName" />
                            </label>
                            <input type="text" class="form-control" name="lastName" placeholder="Last name" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" for="inputAddress">
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input type="text" class="form-control" name="address" placeholder="1234 Main St" />
                        </div>
                        <div class="col-md-6">
                            <label class="form-label" for="inputCity">
                                <FormattedMessage id="manage-user.phonenumber" />
                            </label>
                            <input type="text" class="form-control" name="phonenumber" />
                        </div>
                        <div class="col-md-3">
                            <label class="form-label" for="inputState">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select name="gender" class="form-select">
                                {genderArr &&
                                    genderArr.length > 0 &&
                                    genderArr.map((item, i) => {
                                        return (
                                            <option key={i}>
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
                            <select name="position" class="form-select">
                                {positionArr &&
                                    positionArr.length > 0 &&
                                    positionArr.map((item, i) => {
                                        return (
                                            <option key={i}>
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
                            <select name="roleId" class="form-select">
                                {roleArr &&
                                    roleArr.length > 0 &&
                                    roleArr.map((item, i) => {
                                        return (
                                            <option key={i}>
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
                            <button className="btn btn-primary">
                                <FormattedMessage id="manage-user.save" />
                            </button>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
