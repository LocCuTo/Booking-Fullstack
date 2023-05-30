import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

const HandBook = ({ settings }) => {
    return (
        <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Cẩm nang</span>
                    <button className="btn-section">Xem thêm</button>
                </div>
                <div className="section-body">
                    <Slider {...settings}>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 1</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 2</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 3</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 4</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 5</div>
                        </div>
                        <div className="section-customize">
                            <div className="bg-image section-handbook"></div>
                            <div>Cẩm nang 6</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
