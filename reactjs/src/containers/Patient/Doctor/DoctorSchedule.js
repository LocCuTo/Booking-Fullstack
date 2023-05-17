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

    const handleOnChangeSelect = async (e) => {
        let date = e.target.value;
        let doctorId = params.id;
        let res = await getScheduleDoctorByDateAPI(doctorId, date);
        console.log(res);
    };

    const getSchedule = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
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

    useEffect(() => {
        handleOnChangeSelect();
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
            <div className="all-available-time"></div>
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
