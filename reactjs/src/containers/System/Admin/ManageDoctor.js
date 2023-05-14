import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../../utils/constant';

const ManageDoctor = ({ fetchAllDoctors, allDoctors, language, saveDetailDoctor }) => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    };

    const handleSaveContentMarkdown = () => {
        saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
        });
    };

    const handleChange = (selectedOption) => {
        setSelectedDoctor(selectedOption);
    };

    const handleOnChangeDesc = (e) => {
        setDescription(e.target.value);
    };

    const buildDataInputSelect = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, i) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    useEffect(() => {
        fetchAllDoctors();
    }, [fetchAllDoctors]);

    useEffect(() => {
        setListDoctors(buildDataInputSelect(allDoctors));
    }, [allDoctors, language]);

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">Tạo thêm thông tin bác sĩ</div>
            <div className="more-info">
                <div className="content-left">
                    <label>Chọn bác sĩ</label>
                    <Select value={selectedDoctor} onChange={handleChange} options={listDoctors} />
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
        allDoctors: state.admin.doctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
