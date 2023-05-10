import React from 'react';
import { connect } from 'react-redux';

const UserRedux = () => {
    return (
        <div className="user-redux-container">
            <div className="title">User redux</div>
            <div className="user-redux-body">
                <div>Thêm mới người dùng</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
