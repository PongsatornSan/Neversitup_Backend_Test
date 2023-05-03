const { ErrorHandler } = require("../helper/error");
const product = require("../service/product.service");

async function get(req, res, next) {
    try {
        let { config } = req.body;
        const [re, err] = await product.get(config)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send(re)
    } catch (error) {
        return next(error)
    }
}

async function search(req, res, next) {
    try {
        let { config, ProductName } = req.body;
        const [re, err] = await product.search(config, ProductName)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send(re)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    get,
    search
}