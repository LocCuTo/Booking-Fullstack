import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';

const LikeAndShare = ({ dataRef }) => {
    const initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true, // enable cookies to allow the server to access
                // the session
                xfbml: true, // parse social plugins on this page
                version: 'v2.5', // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    };

    useEffect(() => {
        initFacebookSDK();
    }, []);

    return (
        <>
            <div
                class="fb-like"
                data-href={dataRef}
                data-width=""
                data-layout="standard"
                data-action="like"
                data-size="small"
                data-share="true"
            ></div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
