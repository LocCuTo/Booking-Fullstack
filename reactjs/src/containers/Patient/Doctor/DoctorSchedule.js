import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDateAPI } from '../../../services/userService';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { FormattedMessage } from 'react-intl';

const DoctorSchedule = ({ language }) => {
    const params = useParams();
    const [allDays, setAllDays] = useState([]);
    const [allAvailableTime, setAllAvailableTime] = useState([]);

    const handleOnChangeSelect = async (e) => {
        let date = e.target.value;
        let doctorId = params.id;
        let res = await getScheduleDoctorByDateAPI(doctorId, date);
        if (res && res.errCode === 0) {
            setAllAvailableTime(res.data ? res.data : []);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const getSchedule = () => {
        let arrDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').format('DD/MM/YYYY');

            arrDays.push(object);
        }
        return arrDays;
    };

    const displayTodaySchedule = async () => {
        let arrDays = getSchedule();
        if (arrDays && arrDays.length > 0) {
            let doctorId = params.id;
            let res = await getScheduleDoctorByDateAPI(doctorId, arrDays[0].value);
            setAllAvailableTime(res.data ? res.data : []);
        }
    };

    useEffect(() => {
        let arrDays = getSchedule();
        setAllDays(arrDays);
    }, [language]);

    useEffect(() => {
        displayTodaySchedule();
    }, []);

    return (
        <div className="doctor-schedule-container">
            <div className="all-schedule">
                <select onChange={(e) => handleOnChangeSelect(e)}>
                    {allDays &&
                        allDays.length > 0 &&
                        allDays.map((item, i) => {
                            return (
                                <option value={item.value} key={i}>
                                    {item.label}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="all-available-time">
                <div className="text-calendar">
                    <i className="fas fa-calendar-alt">
                        <span>
                            <FormattedMessage id="patient.detail-doctor.schedule" />
                        </span>
                    </i>
                </div>
                <div className="time-content">
                    {allAvailableTime && allAvailableTime.length > 0 ? (
                        <>
                            <div className="time-content-btns">
                                {allAvailableTime.map((item, i) => {
                                    return (
                                        <button key={i} className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}>
                                            {language === LANGUAGES.VI
                                                ? item.timeTypeData.valueVi
                                                : item.timeTypeData.valueEn}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="book-free">
                                <span>
                                    <FormattedMessage id="patient.detail-doctor.choose" />{' '}
                                    <i className="far fa-hand-point-up" />{' '}
                                    <FormattedMessage id="patient.detail-doctor.book-free" />
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="no-schedule">
                            <FormattedMessage id="patient.detail-doctor.no-schedule" />
                        </div>
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
