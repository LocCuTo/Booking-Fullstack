import React, { useState } from 'react';
import './ManagePatient.scss';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';

const ManagePatient = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleOnChangeDatePicker = (date) => {
        setCurrentDate(date[0]);
    };

    return (
        <div className="manage-patient-container">
            <div className="m-p-title">
                <FormattedMessage id="menu.doctor.manage-patient" />
            </div>
            <div className="m-p-body row g-3">
                <div className="col-4">
                    <label className="form-label">Chọn ngày khám</label>
                    <DatePicker onChange={handleOnChangeDatePicker} className="form-control" value={currentDate} />
                </div>
                <div className="col-12 table-manage-patient">
                    <table style={{ width: '100%' }}>
                        <tr>
                            <th>Name</th>
                        </tr>
                        <tr>
                            <td>Bill Gate</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
