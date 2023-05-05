const db = require('../models');
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    return res.send('Hahahaah');
};

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        data,
    });
};

let getEditCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userData = await CRUDService.getUserInfoById(id);
        // Check user data not found
        return res.render('editCRUD.ejs', { userData });
    } else {
        return res.send('User not found');
    }
};

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        data: allUsers,
    });
};

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete user successfully!!');
    } else {
        return res.send('User not found!!');
    }
};

module.exports = { getHomePage, getCRUD, postCRUD, displayCRUD, getEditCRUD, putCRUD, deleteCRUD };
