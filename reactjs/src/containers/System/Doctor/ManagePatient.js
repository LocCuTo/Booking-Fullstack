import React, { useEffect, useState } from 'react';
import './ManagePatient.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientDoctorAPI, sendRemedyAPI } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

const ManagePatient = ({ user, language }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dataPatient, setDataPatient] = useState([]);
    const [isOpenRemedyModal, setIsOpemRemedyOpen] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [isShowLoading, setIsShowLoading] = useState(false);

    const closeRemedyToggle = () => {
        setIsOpemRemedyOpen(false);
        setDataModal({});
    };

    const getPatientData = async (e) => {
        let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let doctorId = user.id;
        let res = await getListPatientDoctorAPI(doctorId, formattedDate);
        if (res && res.errCode === 0) {
            setDataPatient(res.data);
        }
    };

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    const handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        setIsOpemRemedyOpen(true);
        setDataModal(data);
    };

    const sendRemedy = async (dataFromModal) => {
        // console.log(dataFromModal);
        setIsShowLoading(true);
        let res = await sendRemedyAPI({
            ...dataFromModal,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            toast.success('Remedy sent!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            setIsShowLoading(false);
            setIsOpemRemedyOpen(false);
            await getPatientData();
        } else {
            toast.error('Something went wrong!!!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            setIsShowLoading(false);
        }
    };

    useEffect(() => {
        getPatientData();
    }, [user.id, currentDate]);

    return (
        <>
            <div className="manage-patient-container">
                <div className="m-p-title">
                    <FormattedMessage id="menu.doctor.manage-patient" />
                </div>
                <div className="m-p-body row g-3">
                    <div className="col-4">
                        <label className="form-label mx-1">Chọn ngày khám</label>
                        <DatePicker
                            onChange={handleOnChangeDatePicker}
                            className="form-control"
                            value={currentDate}
                            minDate={new Date()}
                        />
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
                                        let time =
                                            language === LANGUAGES.VI
                                                ? item.timeTypeDataPatient.valueVi
                                                : item.timeTypeDataPatient.valueEn;
                                        let gender =
                                            language === LANGUAGES.VI
                                                ? item.patientData.genderData.valueVi
                                                : item.patientData.genderData.valueEn;
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{time}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleBtnConfirm(item)}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={6}>Không có bệnh nhân vào ngày này</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <RemedyModal
                isOpenModal={isOpenRemedyModal}
                dataModal={dataModal}
                closeRemedyToggle={closeRemedyToggle}
                sendRemedy={sendRemedy}
            />
            <LoadingOverlay active={isShowLoading} spinner text="Loading your content...">
                <p>Loading...</p>
            </LoadingOverlay>
        </>
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
