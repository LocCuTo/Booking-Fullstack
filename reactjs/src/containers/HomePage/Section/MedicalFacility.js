import React, { useEffect, useState } from 'react';
import './MedicalFacility.scss';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinicAPI } from '../../../services/userService';
import { withRouter } from 'react-router-dom';

const MedicalFacility = ({ settings, history }) => {
    const [dataClinic, setDataClinic] = useState([]);

    const getAllClinic = async () => {
        let res = await getAllClinicAPI();
        if (res && res.errCode === 0) {
            setDataClinic(res.data);
        }
    };

    const handleViewDetailClinic = (clinic) => {
        if (history) {
            history.push(`/detail-clinic/${clinic.id}`);
        }
    };

    useEffect(() => {
        getAllClinic();
    }, []);

    return (
        <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Cơ sở y tế nổi bật</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        {dataClinic &&
                            dataClinic.length > 0 &&
                            dataClinic.map((item, i) => {
                                return (
                                    <div
                                        className="section-customize clinic-child"
                                        key={i}
                                        onClick={() => handleViewDetailClinic(item)}
                                    >
                                        <div
                                            className="bg-image section-medical-facility"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div className="clinic-name">{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
