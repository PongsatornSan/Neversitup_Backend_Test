const { ErrorHandler } = require("../helper/error");
const TokenManager = require("./token_manager");

async function auth(req, res, next) {
    let jwtStatus = TokenManager.checkAuthentication(req);
    try {
        if (jwtStatus != false) {

            let config = {
                ID: jwtStatus.reMap[0].ID,
                Firstname: jwtStatus.reMap[0].Firstname,
                server: jwtStatus.reMap[0].server,
                database: jwtStatus.reMap[0].database,
                user: jwtStatus.reMap[0].user,
                password: jwtStatus.reMap[0].password,
                options: {
                    "encrypt": false,
                    "enableArithAbort": true
                }
            };
            req.body.config = config

            return next()
        } else {
            throw new ErrorHandler(401, "unauthorized")
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    auth
}