import React, { useState } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';

const DoctorExtraInfo = () => {
    const [isShowDetailInfo, setIsShowDetailInfo] = useState(false);

    const showHideDetailInfo = (status) => {
        setIsShowDetailInfo(status);
    };

    return (
        <div className="doctor-extra-info-container">
            <div className="content-up">
                <div className="text-address">ĐỊA CHỈ KHÁM</div>
                <div className="name-clinic">Phòng khám da liễu</div>
                <div className="detail-address">207 phố Huế</div>
            </div>
            <div className="content-down">
                {isShowDetailInfo === false ? (
                    <div className="short-info">
                        GIÁ KHÁM: 250.000đ. <span onClick={() => showHideDetailInfo(true)}>Xem chi tiết</span>
                    </div>
                ) : (
                    <>
                        <div className="title-price">GIÁ KHÁM: .</div>
                        <div className="detail-info">
                            <div className="price">
                                <span className="left">Giá khám</span>
                                <span className="right"> 250.000đ</span>
                            </div>
                            <div className="note">
                                Được ưu tiên khám trước khi đặt khám qua Bookingcare. Gía khám cho người nước ngoài là
                                20$
                            </div>
                        </div>
                        <div className="payment">
                            Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                        </div>
                        <div className="hide-price">
                            <span onClick={() => showHideDetailInfo(false)}>Ẩn bảng giá</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
