import React, { useEffect, useState } from 'react';
import './ManagePatient.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientDoctorAPI } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';

const ManagePatient = ({ user, language }) => {
    const [allDays, setAllDays] = useState([]);
    const [dataPatient, setDataPatient] = useState([]);

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
            object.date = moment(new Date()).add(i, 'days').startOf('day').format('DD/MM/YYYY');

            arrDays.push(object);
        }
        return arrDays;
    };

    const getPatientData = async (e) => {
        let arrDays = getSchedule();
        if (arrDays && arrDays.length > 0) {
            let doctorId = user.id;
            let res = await getListPatientDoctorAPI(doctorId, arrDays[0].date);
            if (res && res.errCode === 0) {
                setDataPatient(res.data);
            }
        }
    };

    const handleOnChangeSelect = async (e) => {
        let date = e.target.value;
        let doctorId = user.id;
        let res = await getListPatientDoctorAPI(doctorId, date);
        if (res && res.errCode === 0) {
            setDataPatient(res.data);
        }
    };

    const handleBtnConfirm = () => {};

    const handleBtnSend = () => {};

    useEffect(() => {
        let arrDays = getSchedule();
        setAllDays(arrDays);
    }, [language]);

    useEffect(() => {
        getPatientData();
    }, [user.id]);

    return (
        <div className="manage-patient-container">
            <div className="m-p-title">
                <FormattedMessage id="menu.doctor.manage-patient" />
            </div>
            <div className="m-p-body row g-3">
                <div className="col-4">
                    <label className="form-label mx-1">Chọn ngày khám</label>
                    <div className="all-schedule">
                        <select onChange={(e) => handleOnChangeSelect(e)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, i) => {
                                    return (
                                        <option value={item.date} key={i}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <div className="col-12 table-manage-patient">
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPatient && dataPatient.length > 0 ? (
                                dataPatient.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.timeTypeDataPatient.valueVi}</td>
                                            <td>{item.patientData.firstName}</td>
                                            <td>{item.patientData.address}</td>
                                            <td>{item.patientData.genderData.valueVi}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary mx-2"
                                                    onClick={() => handleBtnConfirm()}
                                                >
                                                    Xác nhận
                                                </button>
                                                <button className="btn btn-warning" onClick={() => handleBtnSend()}>
                                                    Gửi hóa đơn
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <b>Không có bệnh nhân vào ngày này</b>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
