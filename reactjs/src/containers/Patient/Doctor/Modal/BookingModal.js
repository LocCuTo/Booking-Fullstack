import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';

const BookingModal = ({ isOpenModalBooking, toggle, dataScheduleTimeModal }) => {
    return (
        <Modal isOpen={isOpenModalBooking} toggle={toggle} size="lg" centered>
            <ModalHeader toggle={toggle}>
                <b>Thông tin đặt lệnh khám bệnh</b>
            </ModalHeader>
            <ModalBody>
                <ProfileDoctor isShowDescription={false} dataScheduleTimeModal={dataScheduleTimeModal} />
                <div className="row g-3">
                    <div className="col-6">
                        <label className="form-label">Họ tên</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" className="form-control" name="phoneNumber" placeholder="Phone number" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Địa chỉ email</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Địa chỉ liên hệ</label>
                        <input type="text" className="form-control" name="address" placeholder="Address" />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Lí do khám</label>
                        <input type="text" className="form-control" name="reason" placeholder="Reason" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Đặt cho ai</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Giới tính</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="px-3">
                    Xác nhận
                </Button>
                <Button color="danger" onClick={toggle} className="px-3">
                    Hủy
                </Button>
            </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
