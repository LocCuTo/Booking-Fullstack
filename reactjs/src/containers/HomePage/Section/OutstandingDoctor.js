import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';

const OutstandingDoctor = ({ settings, loadTopDoctor, topDoctorsRedux, language }) => {
    const [arrDoctors, setArrDoctors] = useState([]);

    useEffect(() => {
        loadTopDoctor();
    }, [loadTopDoctor]);

    useEffect(() => {
        setArrDoctors(topDoctorsRedux);
    }, [topDoctorsRedux]);

    return (
        <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">
                        <FormattedMessage id="homepage.outstanding-doctor" />
                    </span>
                    <button className="btn-section">
                        <FormattedMessage id="homepage.more-info" />
                    </button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {arrDoctors &&
                            arrDoctors.length > 0 &&
                            arrDoctors.map((item, i) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className="section-customize" key={i}>
                                        <div className="customize-border">
                                            <div className="outer-bg">
                                                <div
                                                    className="bg-image section-outstanding-doctor"
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                            </div>
                                            <div className="position text-center">
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Cơ xương khớp</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
