import React from 'react';
import { connect } from 'react-redux';

const HomeFooter = () => {
    return (
        <div className="home-footer">
            <p>
                &copy; 2023 LocPhanDev. More info,please visit my github{' '}
                <a href="https://github.com/LocPhanFullstack" target="_blank" rel="noreferrer">
                    &#8594; Click here
                </a>
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
