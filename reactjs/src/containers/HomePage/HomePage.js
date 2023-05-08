import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

const HomePage = () => {
    return (
        <div>
            <HomeHeader />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
