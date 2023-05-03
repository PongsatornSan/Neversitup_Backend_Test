const { ErrorHandler } = require("../helper/error");
const dbconfig = require('../config/dbconfig');
const authService = require('../service/auth.sevice');

async function login(req, res, next) {
    try {
        let { Username, Password } = req.body;
        let db = dbconfig;

        const [re, err] = await authService.login(db, Username, Password);
        if (err) {
            throw new ErrorHandler(404, err);
        }

        const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRAR * 24 * 60 * 60 * 1000),
            httpOnly: false
        }

        res.cookie('jwt', re, cookiesOptions);
        res.status(200).send({ token: re })
    } catch (error) {
        return next(error)
    }
}

async function register(req, res, next) {
    try {
        let { Firstname, Lastname, Username, Password } = req.body;
        let db = dbconfig;

        const [re, err] = await authService.register(db, Firstname, Lastname, Username, Password);
        if (err) {
            throw new ErrorHandler(404, err);
        }

        res.status(200).send({ message: 'success' });
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    login,
    register
}