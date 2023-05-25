const db = require('../models');

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                });
            }
            resolve({
                errCode: 0,
                message: 'OK',
                data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                let data = {};
                if (location === 'ALL') {
                    data = await db.Specialty.findOne({
                        where: { id },
                        attributes: ['descriptionHTML', 'descriptionMarkdown'],
                        include: [
                            { model: db.Doctor_Info, as: 'doctorSpecialty', attributes: ['doctorId', 'provinceId'] },
                        ],
                        raw: false,
                        nest: true,
                    });
                } else {
                    // find doctor by location
                    let doctorSpecialty = [];
                    data = await db.Specialty.findOne({
                        where: { id },
                        attributes: ['descriptionHTML', 'descriptionMarkdown'],
                    });
                    if (data) {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location,
                            },
                            attributes: ['doctorId', 'provinceId'],
                        });
                    } else {
                        doctorSpecialty = {};
                    }
                    data.doctorSpecialty = doctorSpecialty;
                }
                if (!data) {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    message: 'OK',
                    data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                });

                resolve({
                    errCode: 0,
                    message: 'OK',
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { createSpecialty, getAllSpecialty, getDetailSpecialtyById };
