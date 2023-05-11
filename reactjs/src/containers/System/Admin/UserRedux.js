import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeAPI } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';

const UserRedux = ({ language }) => {
    const [genderArr, setGenderArr] = useState([]);

    const getAllCode = async () => {
        try {
            let res = await getAllCodeAPI('gender');
            if (res && res.errCode === 0) {
                setGenderArr(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllCode();
    }, []);

    return (
        <div className="user-redux-container">
            <div className="title">User redux</div>
            <div className="user-redux-body">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-12">
                            <FormattedMessage id="manage-user.add" />
                        </div>
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
                                <option selected>Select position</option>
                                <option value="0">None</option>
                                <option value="1">Doctor</option>
                                <option value="2">Professor</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label" for="inputZip">
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select name="roleId" class="form-select">
                                <option selected>Select role</option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label class="form-label">
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary">
                                <FormattedMessage id="manage-user.save" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
