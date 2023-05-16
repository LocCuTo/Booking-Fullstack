import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { LANGUAGES, dateFormat } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';

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

    const handleClickButtonTime = (time) => {
        if (rangeTime && rangeTime.length > 0) {
            setRangeTime((prev) =>
                prev.map((item) => {
                    if (item.id === time.id) {
                        return { ...item, isSelected: !item.isSelected };
                    }
                    return item;
                }),
            );
        }
    };

    const handleSaveSchedule = () => {
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }
        let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.time = schedule.keyMap;

                    result.push(object);
                });
                console.log(result);
                return result;
            } else {
                toast.error('Invalid selected time!!!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
                return;
            }
        }
    };

    useEffect(() => {
        fetchAllDoctors();
        fetchAllScheduleTime();
    }, [fetchAllDoctors, fetchAllScheduleTime]);

    useEffect(() => {
        setListDoctors(buildDataInputSelect(allDoctors));
        setRangeTime(allScheduleTime && allScheduleTime.map((item) => ({ ...item, isSelected: false })));
    }, [allDoctors, language, allScheduleTime]);

    useEffect(() => {}, [rangeTime]);

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
                                    <button
                                        key={i}
                                        className={item.isSelected === true ? 'btn btn-time active' : 'btn btn-time'}
                                        onClick={() => handleClickButtonTime(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={() => handleSaveSchedule()}>
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
