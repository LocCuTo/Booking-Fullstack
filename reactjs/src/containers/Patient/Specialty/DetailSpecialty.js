import React, { useState } from 'react';
import './DetailSpecialty.scss';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';

const DetailSpecialty = () => {
    const [arrDoctorId, setArrDoctorId] = useState([9, 10]);
    return (
        <div className="detail-specialty-container">
            <HomeHeader />
            <div className="detail-specialty-body">
                <div className="description-specialty"></div>
                {arrDoctorId &&
                    arrDoctorId.length > 0 &&
                    arrDoctorId.map((item, i) => {
                        return (
                            <div className="each-doctor" key={i}>
                                <div className="dt-content-left">
                                    <div className="profile-doctor">
                                        <ProfileDoctor
                                            isShowDescription={true}
                                            // dataScheduleTimeModal={dataScheduleTimeModal}
                                            doctorId={item}
                                        />
                                    </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule doctorIdFromParent={item} />
                                    </div>
                                    <div className="doctor-info">
                                        <DoctorExtraInfo doctorIdFromParent={item} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.doctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
