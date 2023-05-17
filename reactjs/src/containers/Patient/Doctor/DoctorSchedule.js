import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDateAPI } from '../../../services/userService';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

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
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = capitalizeFirstLetter(labelVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').format('DD/MM/YYYY');

            arrDate.push(object);
        }

        setAllDays(arrDate);
    };

    useEffect(() => {
        getSchedule();
    }, [language]);

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
                        <span>Lịch khám</span>
                    </i>
                </div>
                <div className="time-content">
                    {allAvailableTime && allAvailableTime.length > 0 ? (
                        allAvailableTime.map((item, i) => {
                            return (
                                <button key={i}>
                                    {language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                </button>
                            );
                        })
                    ) : (
                        <div>Không có lịch hẹn trong thời gian này, vui lòng chọn khoảng thời gian khác</div>
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
