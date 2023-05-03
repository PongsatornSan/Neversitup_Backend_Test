const { ErrorHandler } = require("../helper/error");
const order = require("../service/order.service");

async function addOrder(req, res, next) {
    try {
        let { config, ProductID, UserID, Status } = req.body;
        const [re, err] = await order.addOrder(config, ProductID, UserID, Status)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send({ message: 'success' })
    } catch (error) {
        return next(error)
    }
}

async function get(req, res, next) {
    try {
        let { config } = req.body;
        const [re, err] = await order.get(config)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send(re)
    } catch (error) {
        return next(error)
    }
}

async function del(req, res, next) {
    try {
        let { config, ID } = req.body;
        const [re, err] = await order.del(config, ID)
        if (err) {
            throw new ErrorHandler(err)
        }
        res.status(200).send({ message: 'ลบข้อมูลสำเร็จ'})
    } catch (error) {
        return next(error)
    }
}


module.exports = {
    addOrder,
    get,
    del
}