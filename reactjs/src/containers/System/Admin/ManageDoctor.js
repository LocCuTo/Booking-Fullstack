import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDetailInfoDoctorAPI } from '../../../services/userService';

const ManageDoctor = ({
    fetchAllDoctors,
    allDoctors,
    language,
    saveDetailDoctor,
    getRequiredDoctorInfo,
    allRequiredDoctorInfo,
}) => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // save to markdown table
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [description, setDescription] = useState('');
    const [listDoctors, setListDoctors] = useState([]);
    const [hasOldData, setHasOldData] = useState(false);
    // save to doctor_info table
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [nameClinic, setNameClinic] = useState('');
    const [addressClinic, setAddressClinic] = useState('');
    const [note, setNote] = useState('');

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

    const buildDataInputSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, i) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    useEffect(() => {
        fetchAllDoctors();
        getRequiredDoctorInfo();
    }, [fetchAllDoctors, getRequiredDoctorInfo]);

    useEffect(() => {
        let { resPrice, resPayment, resProvince } = allRequiredDoctorInfo;
        setListDoctors(buildDataInputSelect(allDoctors, 'USERS'));
        setListPrice(buildDataInputSelect(resPrice));
        setListPayment(buildDataInputSelect(resPayment));
        setListProvince(buildDataInputSelect(resProvince));
    }, [allDoctors, language, allRequiredDoctorInfo]);

    return (
        <div className="manage-doctor-container">
            <div className="manage-doctor-title">
                <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className="more-info">
                <div className="content-left">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.select" />
                    </label>
                    <Select
                        placeholder="Chọn bác sĩ"
                        value={selectedDoctor}
                        onChange={handleChangeSelect}
                        options={listDoctors}
                    />
                </div>
                <div className="content-right">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.intro" />
                    </label>
                    <textarea
                        className="form-control"
                        rows={4}
                        onChange={(e) => handleOnChangeDesc(e)}
                        value={description}
                    ></textarea>
                </div>
            </div>

            <div className="more-extra-info row g-3">
                <div className="col-4 form-group">
                    <label className="form-label">Chọn giá</label>
                    <Select
                        placeholder="Chọn giá"
                        // value={selectedPrice}
                        // onChange={handleChangeSelect}
                        options={listPrice}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">Phương thức thanh toán</label>
                    <Select
                        placeholder="Chọn phương thức thanh toán"
                        // value={selectedPayment}
                        // onChange={handleChangeSelect}
                        options={listPayment}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">Chọn tỉnh thành</label>
                    <Select
                        placeholder="Chọn tỉnh thành"
                        // value={selectedProvince}
                        // onChange={handleChangeSelect}
                        options={listProvince}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">Tên phòng khám</label>
                    <input className="form-control" />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">Địa chỉ phòng khám</label>
                    <input className="form-control" />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">Note</label>
                    <input className="form-control" />
                </div>
            </div>

            <div className="manage-doctor-editor">
                <MdEditor
                    style={{ height: '500px', marginTop: '16px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />
            </div>
            <button
                className={hasOldData === true ? 'btn btn-warning mt-3' : 'btn btn-primary mt-3'}
                onClick={() => handleSaveContentMarkdown()}
            >
                {hasOldData === true ? (
                    <FormattedMessage id="admin.manage-doctor.add" />
                ) : (
                    <FormattedMessage id="admin.manage-doctor.save" />
                )}
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.doctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
