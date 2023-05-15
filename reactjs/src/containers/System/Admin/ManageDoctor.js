import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDetailInfoDoctorAPI } from '../../../services/userService';

const ManageDoctor = ({ fetchAllDoctors, allDoctors, language, saveDetailDoctor }) => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);
    const [hasOldData, setHasOldData] = useState(false);

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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);

        let res = await getDetailInfoDoctorAPI(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            setContentMarkdown(markdown.contentMarkdown);
            setContentHTML(markdown.contentHTML);
            setDescription(markdown.description);
            setHasOldData(true);
        } else {
            setContentMarkdown('');
            setContentHTML('');
            setDescription('');
            setHasOldData(false);
        }
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
                    <Select value={selectedDoctor} onChange={handleChangeSelect} options={listDoctors} />
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
                    value={contentMarkdown}
                />
            </div>
            <button
                className={hasOldData === true ? 'btn btn-warning mt-3' : 'btn btn-primary mt-3'}
                onClick={() => handleSaveContentMarkdown()}
            >
                {hasOldData === true ? 'Sửa thông tin' : 'Lưu thông tin'}
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
