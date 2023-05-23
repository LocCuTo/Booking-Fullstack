import React, { useEffect, useState } from 'react';
import './VerifEmail.scss';
import { connect } from 'react-redux';
import { postVerifyBookAppointmentAPI } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

const VerifyEmail = ({ location }) => {
    let token = '';
    let doctorId = '';

    const [statusVerify, setStatusVerify] = useState(false);
    const [errCode, setErrCode] = useState(0);

    if (location && location.search) {
        let urlParams = new URLSearchParams(location.search);
        token = urlParams.get('token');
        doctorId = urlParams.get('doctorId');
    }

    const verifyEmail = async () => {
        let res = await postVerifyBookAppointmentAPI({
            token,
            doctorId,
        });
        if (res && res.errCode === 0) {
            setStatusVerify(true);
            setErrCode(res.errCode);
        } else {
            setStatusVerify(true);
            setErrCode(res && res.errCode ? res.errCode : -1);
        }
    };

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <>
            <HomeHeader />
            <div className="verify-email-container">
                {statusVerify === false ? (
                    <div>Loading data....</div>
                ) : (
                    <div className="info-booking">
                        {errCode === 0 ? (
                            <div>Xác nhận lịch hẹn thành công!</div>
                        ) : (
                            <div>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
