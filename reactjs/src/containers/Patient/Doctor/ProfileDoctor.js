import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { useParams } from 'react-router-dom';
import { getProfileDoctorByIdAPI } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import moment from 'moment';

const ProfileDoctor = ({ language, isShowDescription, dataScheduleTimeModal }) => {
    let nameVi,
        nameEn = '';
    const params = useParams();

    const [dataProfile, setDataProfile] = useState({});

    const getProfileDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdAPI(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        setDataProfile(result);
    };

    const convertDigitIn = (str) => {
        return str.split('/').reverse().join('/');
    };

    const renderTimeBooking = () => {
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let date =
                language === LANGUAGES.VI ? dataScheduleTimeModal.date : convertDigitIn(dataScheduleTimeModal.date);
            let time =
                language === LANGUAGES.VI
                    ? dataScheduleTimeModal.timeTypeData.valueVi
                    : convertDigitIn(dataScheduleTimeModal.timeTypeData.valueEn);
            return (
                <>
                    <div>
                        {date} {time}
                    </div>
                    <div>Miễn phí đặt lịch</div>
                </>
            );
        }
        return;
    };

    console.log(dataScheduleTimeModal);
    if (dataProfile && dataProfile.positionData) {
        nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    useEffect(() => {
        getProfileDoctor(params.id);
    }, [params.id]);

    return (
        <div className="profile-doctor-container">
            <div className="intro-doctor">
                <div
                    className="content-left"
                    style={{
                        backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                    }}
                ></div>
                <div className="content-right">
                    <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                    <div className="down">
                        {isShowDescription === true ? (
                            <>
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                    <span>{dataProfile.Markdown.description}</span>
                                )}
                            </>
                        ) : (
                            <>{renderTimeBooking()}</>
                        )}
                    </div>
                </div>
            </div>
            <div>
                Giá khám:{' '}
                {language === LANGUAGES.VI && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceTypeData ? (
                    <span>{dataProfile.Doctor_Info.priceTypeData.valueVi} VND</span>
                ) : (
                    ''
                )}
                {language === LANGUAGES.EN && dataProfile.Doctor_Info && dataProfile.Doctor_Info.priceTypeData ? (
                    <span>${dataProfile.Doctor_Info.priceTypeData.valueEn}</span>
                ) : (
                    ''
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
