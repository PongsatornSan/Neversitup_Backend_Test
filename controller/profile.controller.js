const { ErrorHandler } = require("../helper/error");
const profile = require("../service/profile.service");

async function get(req, res, next) {
    try {
        let { config } = req.body;
        const [re, err] = await profile.get(config)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send(re)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    get
}