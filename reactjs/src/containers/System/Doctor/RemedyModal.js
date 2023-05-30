import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';

const RemedyModal = ({ isOpenModal, dataModal, closeRemedyToggle, sendRemedy }) => {
    const [info, setInfo] = useState({
        email: '',
        imgBase64: '',
    });

    const handleOnChangeEmail = (e) => {
        setInfo({ ...info, email: e.target.value });
    };

    const handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setInfo({ ...info, imgBase64: base64 });
        }
    };

    const handleSendRemedy = () => {
        sendRemedy(info);
    };

    useEffect(() => {
        setInfo({ ...info, email: dataModal.email });
    }, [dataModal]);

    return (
        <Modal isOpen={isOpenModal} toggle={closeRemedyToggle} size="md" centered>
            <ModalHeader toggle={closeRemedyToggle}>
                <b>Gửi hóa đơn khám bệnh</b>
            </ModalHeader>
            <ModalBody>
                <div className="row g-3">
                    <div className="col-6">
                        <label className="form-label">Email bệnh nhân</label>
                        <input
                            type="email"
                            className="form-control"
                            value={info.email}
                            // disabled
                            onChange={(e) => handleOnChangeEmail(e)}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Chọn file đơn thuốc</label>
                        <input type="file" className="form-control" onChange={(e) => handleOnChangeImage(e)} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="px-3" onClick={() => handleSendRemedy()}>
                    <FormattedMessage id="patient.booking-modal.confirm" />
                </Button>
                <Button color="danger" className="px-3" onClick={closeRemedyToggle}>
                    <FormattedMessage id="patient.booking-modal.cancel" />
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
