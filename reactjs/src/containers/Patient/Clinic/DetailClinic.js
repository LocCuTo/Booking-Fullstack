import React, { useEffect, useState } from 'react';
import './DetailClinic.scss';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { useParams } from 'react-router-dom';
import { getDetailClinicByIdAPI } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

const DetailClinic = ({ language }) => {
    const params = useParams();

    const [arrDoctorId, setArrDoctorId] = useState([]);
    const [dataDetailClinic, setDataDetailClinic] = useState({});

    const getDetailClinic = async () => {
        let res = await getDetailClinicByIdAPI({
            id: params.id,
        });
        if (res && res.errCode === 0) {
            let data = res.data;
            let doctorIdArr = [];
            if (data && !_.isEmpty(data)) {
                let arr = data.doctorClinic;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        doctorIdArr.push(item.doctorId);
                    });
                }
            }
            setArrDoctorId(doctorIdArr);
            setDataDetailClinic(res.data);
        }
    };

    useEffect(() => {
        getDetailClinic();
    }, [params]);

    return (
        <div className="detail-specialty-container">
            <HomeHeader />
            <div className="detail-specialty-body">
                <div className="description-specialty">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                        <>
                            <div>{dataDetailClinic.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                        </>
                    )}
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
                                            isShowLinkDetail={true}
                                            isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
