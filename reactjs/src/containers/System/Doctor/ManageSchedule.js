import React from 'react';
import { connect } from 'react-redux';

const ManageSchedule = () => {
    return <div>ManageSchedule</div>;
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
