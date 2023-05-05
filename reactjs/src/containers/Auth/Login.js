import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import './Login.scss';
import * as actions from '../../store/actions';

const Login = () => {
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row g-3">
                    <div className="col-12 text-login">Login</div>
                    <div className="col-12 form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" placeholder="Enter your username" />
                    </div>
                    <div className="col-12 form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <div className="col-12">
                        <button className="btn-login">Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password ?</span>
                    </div>
                    <div className="col-12 text-center">
                        <span className="text-other-login">Or login with: </span>
                    </div>
                    <div className="col-12 social-login">
                        <i className="fab fa-google-plus-g gg social-icon"></i>
                        <i className="fab fa-facebook-f fb social-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        lang: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
