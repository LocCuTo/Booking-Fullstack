import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctorAPI } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';

const DetailDoctor = ({ language }) => {
    let nameVi = '';
    let nameEn = '';
    const params = useParams();

    const [detailDoctor, setDetailDoctor] = useState({});

    const getDetail = async (id) => {
        let res = await getDetailInfoDoctorAPI(id);
        if (res && res.errCode === 0) {
            setDetailDoctor(res.data);
        }
    };

    if (detailDoctor && detailDoctor.positionData) {
        nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    useEffect(() => {
        getDetail(params.id);
    }, [params.id]);

    // let currentURL =
    //     process.env.REACT_APP_IS_LOCALHOST === 1 ? 'https://siuuuu-restaurant.herokuapp.com/' : window.location.href;

    return (
        <>
            <HomeHeader isShowBanner={false} />
            <div className="doctor-detail-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div className="down">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                <span>{detailDoctor.Markdown.description}</span>
                            )}
                            {/* <div className="like-share-plugin">
                                <LikeAndShare dataRef={currentURL} />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="schedule-doctor">
                    <div className="content-left">
                        <DoctorSchedule doctorIdFromParent={detailDoctor.id} />
                    </div>
                    <div className="content-right">
                        <DoctorExtraInfo doctorIdFromParent={detailDoctor.id} />
                    </div>
                </div>
                <div className="detail-info-doctor">
                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                    )}
                </div>
                {/* <div className="comment-doctor">
                    <Comment dataRef={currentURL} width={'100%'} />
                </div> */}
                <div className="comment-doctor"></div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
