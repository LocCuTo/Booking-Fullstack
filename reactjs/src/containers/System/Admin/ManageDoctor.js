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
    const [listDoctors, setListDoctors] = useState([]);
    const [hasOldData, setHasOldData] = useState(false);
    // save to doctor_info table
    const [listPrice, setListPrice] = useState([]);
    const [listPayment, setListPayment] = useState([]);
    const [listProvince, setListProvince] = useState([]);
    const [selected, setSelected] = useState({
        selectedPrice: '',
        selectedProvince: '',
        selectedPayment: '',
    });
    const [info, setInfo] = useState({
        nameClinic: '',
        addressClinic: '',
        note: '',
        description: '',
    });

    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    };

    const handleSaveContentMarkdown = () => {
        saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: info.description,
            doctorId: selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: selected.selectedPrice.value,
            selectedProvince: selected.selectedProvince.value,
            selectedPayment: selected.selectedPayment.value,
            nameClinic: info.nameClinic,
            addressClinic: info.addressClinic,
            note: info.note,
        });
    };

    const handleChangeSelect = async (selectedOption) => {
        setSelectedDoctor(selectedOption);

        let res = await getDetailInfoDoctorAPI(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            setContentMarkdown(markdown.contentMarkdown);
            setContentHTML(markdown.contentHTML);
            setInfo({ ...info, description: markdown.description });
            setHasOldData(true);
        } else {
            setContentMarkdown('');
            setContentHTML('');
            setInfo({ ...info, description: '' });
            setHasOldData(false);
        }
    };

    const handleChageSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...selected };
        stateCopy[stateName] = selectedOption;

        setSelected({ ...stateCopy });
    };

    const handleOnChangeText = (e, id) => {
        let copyState = { ...info };
        copyState[id] = e.target.value;
        setInfo({ ...copyState });
    };

    const buildDataInputSelect = (data, type) => {
        let result = [];
        if (data && data.length > 0) {
            if (type === 'USERS') {
                data.map((item, i) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            if (type === 'PRICE') {
                data.map((item, i) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                data.map((item, i) => {
                    let object = {};
                    let labelVi = item.valueVi;
                    let labelEn = item.valueEn;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                });
            }
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
        setListPrice(buildDataInputSelect(resPrice, 'PRICE'));
        setListPayment(buildDataInputSelect(resPayment, 'PAYMENT'));
        setListProvince(buildDataInputSelect(resProvince, 'PROVINCE'));
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
                        onChange={(e) => handleOnChangeText(e, 'description')}
                        value={info.description}
                    ></textarea>
                </div>
            </div>

            <div className="more-extra-info row g-3">
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.price" />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                        value={selected.selectedPrice}
                        onChange={handleChageSelectDoctorInfo}
                        name="selectedPrice"
                        options={listPrice}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.payment" />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                        value={selected.selectedPayment}
                        name="selectedPayment"
                        onChange={handleChageSelectDoctorInfo}
                        options={listPayment}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.province" />
                    </label>
                    <Select
                        placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                        value={selected.selectedProvince}
                        name="selectedProvince"
                        onChange={handleChageSelectDoctorInfo}
                        options={listProvince}
                    />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.nameClinic" />
                    </label>
                    <input className="form-control" onChange={(e) => handleOnChangeText(e, 'nameClinic')} />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.addressClinic" />
                    </label>
                    <input className="form-control" onChange={(e) => handleOnChangeText(e, 'addressClinic')} />
                </div>
                <div className="col-4 form-group">
                    <label className="form-label">
                        <FormattedMessage id="admin.manage-doctor.note" />
                    </label>
                    <input className="form-control" onChange={(e) => handleOnChangeText(e, 'note')} />
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
