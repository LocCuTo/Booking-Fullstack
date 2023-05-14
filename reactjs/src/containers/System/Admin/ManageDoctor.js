import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { useState } from 'react';

const ManageDoctor = () => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [description, setDescription] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    };

    const handleSaveContentMarkdown = () => {};

    const handleChange = (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleOnChangeDesc = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
            <div className="more-info">
                <div className="content-left">
                    <label>Chọn bác sĩ</label>
                    <Select value={selectedDoctor} onChange={handleChange} options={options} />
                </div>
                <div className="content-right">
                    <label>Thông tin giới thiệu</label>
                    <textarea
                        className="form-control"
                        rows={4}
                        onChange={(e) => handleOnChangeDesc(e)}
                        value={description}
                    >
                        sàd
                    </textarea>
                </div>
            </div>
            <div className="manage-doctor-editor">
                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={() => handleSaveContentMarkdown()}>
                Lưu thông tin
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
