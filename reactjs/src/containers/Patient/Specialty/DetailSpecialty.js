import React from 'react';
import './DetailSpecialty.scss';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';

const DetailSpecialty = () => {
    return (
        <>
            <HomeHeader />
        </>
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
