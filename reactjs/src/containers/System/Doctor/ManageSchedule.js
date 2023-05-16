import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';

const ManageSchedule = ({ fetchAllDoctors, language, allDoctors, fetchAllScheduleTime, allScheduleTime }) => {
    const [listDoctors, setListDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);

    const buildDataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, i) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    useEffect(() => {
        fetchAllDoctors();
        fetchAllScheduleTime();
    }, [fetchAllDoctors, fetchAllScheduleTime]);

    useEffect(() => {
        setListDoctors(buildDataInputSelect(allDoctors));
        setRangeTime(allScheduleTime);
    }, [allDoctors, language, allScheduleTime]);

    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">
                <FormattedMessage id="manage-schedule.title" />
            </div>
            <div className="container">
                <div className="row g-3">
                    <div className="col-6 form-group">
                        <label className="form-label">
                            <FormattedMessage id="manage-schedule.choose-doctor" />
                        </label>
                        <Select value={selectedDoctor} onChange={handleChangeSelect} options={listDoctors} />
                    </div>
                    <div className="col-6 form-group">
                        <label className="form-label">
                            <FormattedMessage id="manage-schedule.choose-date" />
                        </label>
                        <DatePicker
                            onChange={handleOnChangeDatePicker}
                            className="form-control"
                            value={currentDate}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item, i) => {
                                return (
                                    <button key={i} className="btn btn-success">
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary">
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.doctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
