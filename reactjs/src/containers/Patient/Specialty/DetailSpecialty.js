import React, { useEffect, useState } from 'react';
import './DetailSpecialty.scss';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { useParams } from 'react-router-dom';
import { getAllCodeAPI, getDetailSpecialtyByIdAPI } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

const DetailSpecialty = ({ language }) => {
    const params = useParams();

    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});

    const getDetailSpecialty = async () => {
        let res = await getDetailSpecialtyByIdAPI({
            id: params.id,
            location: 'ALL',
        });
        if (res && res.errCode === 0) {
            let data = res.data;
            let doctorIdArr = [];
            if (data && !_.isEmpty(data)) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        doctorIdArr.push(item.doctorId);
                    });
                }
            }
            setArrDoctorId(doctorIdArr);
            setDataDetailSpecialty(res.data);
        }
    };

    const getProvince = async () => {
        let res = await getAllCodeAPI('PROVINCE');
        if (res && res.errCode === 0) {
            setListProvince(res.data);
        }
    };

    const handleOnChangeSelect = (e) => {};

    useEffect(() => {
        getDetailSpecialty();
    }, [params]);

    useEffect(() => {
        getProvince();
    }, []);

    return (
        <div className="detail-specialty-container">
            <HomeHeader />
            <div className="detail-specialty-body">
                <div className="description-specialty">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    )}
                </div>
                <div className="search-sp-doctor">
                    <select onChange={(e) => handleOnChangeSelect(e)}>
                        {listProvince &&
                            listProvince.length > 0 &&
                            listProvince.map((item, i) => {
                                return (
                                    <option key={i} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                );
                            })}
                    </select>
                </div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
