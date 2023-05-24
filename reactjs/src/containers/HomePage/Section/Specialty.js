import React, { useEffect, useState } from 'react';
import './Specialty.scss';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllSpecialtyAPI } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

const Specialty = ({ settings, history }) => {
    const [arrSpecialty, setArrSpecialty] = useState([]);

    const getAllSpecialty = async () => {
        let res = await getAllSpecialtyAPI();
        if (res && res.errCode === 0) {
            setArrSpecialty(res.data);
        }
    };

    const handleViewDetailSpecialty = (specialty) => {
        // props history của withRouter
        history.push(`/detail-specialty/${specialty.id}`);
    };

    useEffect(() => {
        getAllSpecialty();
    }, []);

    return (
        <div className="section-share section-specialty">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">
                        <FormattedMessage id="homepage.popular-specialty" />
                    </span>
                    <button className="btn-section">
                        <FormattedMessage id="homepage.more-info" />
                    </button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {arrSpecialty &&
                            arrSpecialty.length > 0 &&
                            arrSpecialty.map((item, i) => {
                                return (
                                    <div
                                        className="section-customize specialty-child"
                                        onClick={() => handleViewDetailSpecialty(item)}
                                        key={i}
                                    >
                                        <div
                                            className="bg-image section-specialty"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="specialty-name">{item.name}</div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
