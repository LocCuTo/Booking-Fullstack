import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import _ from 'lodash';
import { postPatientAppointmentAPI } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';

const BookingModal = ({ isOpenModalBooking, toggle, dataScheduleTimeModal, fetchGender, genders, language }) => {
    const [info, setInfo] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        reason: '',
        birthday: '',
        gender: '',
        doctorId: '',
        selectedGender: '',
        timeType: '',
    });
    const [isShowLoading, setIsShowLoading] = useState(false);

    const handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = { ...info };
        copyState[id] = valueInput;

        setInfo(copyState);
    };

    const handleOnChangeDatePicker = (date) => {
        setInfo({ ...info, birthday: date[0] });
    };

    const buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            });
        }
        return result;
    };

    const handleChangeSelect = (selectedOption) => {
        setInfo({ ...info, selectedGender: selectedOption });
    };

    const buildTimeBooking = (data) => {
        if (data && !_.isEmpty(data)) {
            let time = language === LANGUAGES.VI ? data.timeTypeData.valueVi : data.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ? data.date : data.date.split('/').reverse().join('/');

            return `${time} - ${date}`;
        }
        return '';
    };

    const buildDoctorName = (data) => {
        if (data && !_.isEmpty(data)) {
            let name =
                language === LANGUAGES.VI
                    ? `${data.doctorData.lastName} ${data.doctorData.firstName}`
                    : `${data.doctorData.firstName} ${data.doctorData.lastName}`;

            return name;
        }
        return '';
    };

    const handleConfirmBooking = async () => {
        setIsShowLoading(true);
        let date = new Date(info.birthday).getTime();
        let timeSting = buildTimeBooking(dataScheduleTimeModal);
        let doctorName = buildDoctorName(dataScheduleTimeModal);
        let res = await postPatientAppointmentAPI({
            fullName: info.fullName,
            phoneNumber: info.phoneNumber,
            email: info.email,
            address: info.address,
            reason: info.reason,
            selectedGender: info.selectedGender.value,
            birthday: date,
            date: dataScheduleTimeModal.date,
            doctorName: doctorName,
            doctorId: info.doctorId,
            timeType: info.timeType,
            language: language,
            timeString: timeSting,
        });
        if (res && res.errCode === 0) {
            toast.success('Booking Created!!!', {
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
            toggle();
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
        fetchGender();
    }, [fetchGender]);

    useEffect(() => {
        setInfo({ ...info, gender: buildDataGender(genders) });
    }, [genders, language]);

    useEffect(() => {
        setInfo({ ...info, doctorId: dataScheduleTimeModal.doctorId, timeType: dataScheduleTimeModal.timeType });
    }, [dataScheduleTimeModal]);

    return (
        <LoadingOverlay active={isShowLoading} spinner text="Loading...">
            <Modal isOpen={isOpenModalBooking} toggle={toggle} size="lg" centered>
                <ModalHeader toggle={toggle}>
                    <b>
                        <FormattedMessage id="patient.booking-modal.title" />
                    </b>
                </ModalHeader>
                <ModalBody>
                    <ProfileDoctor
                        isShowDescription={false}
                        doctorId={dataScheduleTimeModal.doctorId}
                        dataScheduleTimeModal={dataScheduleTimeModal}
                        isShowLinkDetail={false}
                        isShowPrice={true}
                    />
                    <div className="row g-3">
                        <div className="col-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.fullname" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                value={info.fullName}
                                onChange={(e) => handleOnChangeInput(e, 'fullName')}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.phoneNumber" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={info.phoneNumber}
                                onChange={(e) => handleOnChangeInput(e, 'phoneNumber')}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.email" />
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                value={info.email}
                                onChange={(e) => handleOnChangeInput(e, 'email')}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                placeholder="Address"
                                value={info.address}
                                onChange={(e) => handleOnChangeInput(e, 'address')}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.reason" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="reason"
                                placeholder="Reason"
                                value={info.reason}
                                onChange={(e) => handleOnChangeInput(e, 'reason')}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.birthday" />
                            </label>
                            <DatePicker
                                onChange={handleOnChangeDatePicker}
                                className="form-control"
                                value={info.birthday}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">
                                <FormattedMessage id="patient.booking-modal.gender" />
                            </label>
                            <Select value={info.selectedGender} options={info.gender} onChange={handleChangeSelect} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => handleConfirmBooking()}>
                        <FormattedMessage id="patient.booking-modal.confirm" />
                    </Button>
                    <Button color="danger" onClick={toggle} className="px-3">
                        <FormattedMessage id="patient.booking-modal.cancel" />
                    </Button>
                </ModalFooter>
            </Modal>
        </LoadingOverlay>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
