import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
};

let getAllUsers = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter',
            users: [],
        });
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users,
    });
};

module.exports = { handleLogin, getAllUsers };
