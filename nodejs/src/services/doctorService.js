const db = require('../models');
require('dotenv').config();
import _ from 'lodash';
import moment from 'moment';

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password'],
                },
                where: {
                    roleId: 'R2',
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'] },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image'],
                },
            });

            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let saveInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.doctorId ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.action ||
                !data.selectedPrice ||
                !data.selectedProvince ||
                !data.selectedPayment ||
                !data.nameClinic ||
                !data.addressClinic ||
                !data.note
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                // upsert to Markdown table
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    });
                } else if (data.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false,
                    });

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = data.contentHTML;
                        doctorMarkdown.contentMarkdown = data.contentMarkdown;
                        doctorMarkdown.description = data.description;

                        await doctorMarkdown.save();
                    }
                }

                // upsert to Doctor_Info table
                let doctorInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: data.doctorId,
                    },
                    raw: false,
                });

                if (doctorInfo) {
                    // update
                    doctorInfo.doctorId = data.doctorId;
                    doctorInfo.priceId = data.selectedPrice;
                    doctorInfo.provinceId = data.selectedProvince;
                    doctorInfo.paymentId = data.selectedPayment;
                    doctorInfo.note = data.note;
                    doctorInfo.addressClinic = data.addressClinic;
                    doctorInfo.nameClinic = data.nameClinic;

                    await doctorInfo.save();
                } else {
                    // create
                    await db.Doctor_Info.create({
                        doctorId: data.doctorId,
                        priceId: data.selectedPrice,
                        provinceId: data.selectedProvince,
                        paymentId: data.selectedPayment,
                        note: data.note,
                        addressClinic: data.addressClinic,
                        nameClinic: data.nameClinic,
                    });
                }
            }
            resolve({
                errCode: 0,
                message: "Doctor's info Saved",
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter',
                });
            } else {
                let data = await db.User.findOne({
                    where: { id },
                    include: [
                        { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                        {
                            model: db.Doctor_Info,
                            attributes: { exclude: ['id', 'doctorId'] },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true,
                    attributes: {
                        exclude: ['password'],
                    },
                });

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) {
                    data = {};
                }

                resolve({
                    errCode: 0,
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                // Check if doctor has already had a schedule at that time or not
                // if not, create new appoitment. If yes, do nothing

                // get all existing data
                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.date },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true,
                });
                // compare difference
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.date === b.date && a.timeType === b.timeType;
                });
                // create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }

                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }

            resolve('');
        } catch (e) {
            reject(e);
        }
    });
};

let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!date || !doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId,
                        date,
                    },
                    include: [{ model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] }],
                    raw: false,
                    nest: true,
                });

                if (!data) data = [];

                resolve({
                    errCode: 0,
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getExtraInfoDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: { doctorId },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueVi', 'valueEn'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueVi', 'valueEn'] },
                    ],
                    attributes: {
                        exclude: ['id', 'doctorId'],
                    },
                    raw: false,
                    nest: true,
                });

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctor,
    getAllDoctors,
    saveInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInfoDoctorById,
};
