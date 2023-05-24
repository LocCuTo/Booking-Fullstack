import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { useParams } from 'react-router-dom';
import { getExtraInfoDoctorByIdAPI } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';

const DoctorExtraInfo = ({ language, doctorIdFromParent }) => {
    const [isShowDetailInfo, setIsShowDetailInfo] = useState(false);
    const [extraInfo, setExtraInfo] = useState({});

    const showExtraInfo = async (id) => {
        let res = await getExtraInfoDoctorByIdAPI(id);
        if (res && res.errCode === 0) {
            setExtraInfo(res.data);
        }
    };

    const showHideDetailInfo = (status) => {
        setIsShowDetailInfo(status);
    };

    useEffect(() => {
        showExtraInfo(doctorIdFromParent);
    }, [doctorIdFromParent]);

    return (
        <div className="doctor-extra-info-container">
            <div className="content-up">
                <div className="text-address">
                    <FormattedMessage id="patient.extra-info-doctor.text-address" />
                </div>
                <div className="name-clinic">{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
                <div className="detail-address">
                    {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                </div>
            </div>
            <div className="content-down">
                {isShowDetailInfo === false ? (
                    <div className="short-info">
                        <FormattedMessage id="patient.extra-info-doctor.price" />:{' '}
                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                            <span>{extraInfo.priceTypeData.valueVi} VND</span>
                        )}
                        {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                            <span>${extraInfo.priceTypeData.valueEn}</span>
                        )}{' '}
                        <span className="detail" onClick={() => showHideDetailInfo(true)}>
                            <FormattedMessage id="patient.extra-info-doctor.detail" />
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="detail-info">
                            <div className="price">
                                <span className="left">
                                    <FormattedMessage id="patient.extra-info-doctor.price" />
                                </span>
                                <span className="right">
                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                        <span>{extraInfo.priceTypeData.valueVi} VND</span>
                                    )}
                                    {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                        <span>${extraInfo.priceTypeData.valueEn}</span>
                                    )}{' '}
                                </span>
                            </div>
                            <div className="note">{extraInfo && extraInfo.note ? extraInfo.note : ''}</div>
                        </div>
                        <div className="payment">
                            <FormattedMessage id="patient.extra-info-doctor.payment" />{' '}
                            {extraInfo &&
                            extraInfo.paymentTypeData &&
                            language === LANGUAGES.VI &&
                            extraInfo.paymentTypeData.valueVi
                                ? extraInfo.paymentTypeData.valueVi
                                : ''}
                            {extraInfo &&
                            extraInfo.paymentTypeData &&
                            language === LANGUAGES.EN &&
                            extraInfo.paymentTypeData.valueEn
                                ? extraInfo.paymentTypeData.valueEn
                                : ''}
                        </div>
                        <div className="hide-price">
                            <span onClick={() => showHideDetailInfo(false)}>
                                <FormattedMessage id="patient.extra-info-doctor.hide" />
                            </span>
                        </div>
                    </>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
