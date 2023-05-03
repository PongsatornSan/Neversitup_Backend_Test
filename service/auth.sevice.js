const TokenManager = require("../middleware/token_manager");
const { ErrorHandler } = require("../helper/error");
const bcrypt = require("bcryptjs");
const sql = require('mssql');

const register = async (db, Firstname, Lastname, Username, Password) => {
    const config = {
        server: db.dbconfig[0].server,
        database: db.dbconfig[0].database,
        user: db.dbconfig[0].user,
        password: db.dbconfig[0].password,
        options: {
            "encrypt": false,
            "enableArithAbort": true
        }
    };

    const pool = await sql.connect(config);
    const query = `SELECT * FROM users WHERE Username = '${Username}'`;
    const { recordset } = await pool.request().query(query);
    if (recordset.length > 0) {
        throw new ErrorHandler(401, 'Username already exists')
    }
    const PasswordHash = await bcrypt.hash(Password, 10);
    const insertQuery = `
        INSERT INTO users (Firstname, Lastname, Username, Password)
        VALUES ('${Firstname}', '${Lastname}', '${Username}', '${PasswordHash}')
    `;
    const { rowsAffected } = await pool.request().query(insertQuery);

    await pool.close();

    if (rowsAffected.length > 0) {
        return [true, null];
    } else {
        throw new ErrorHandler(404, 'ไม่สามารถบันทึกข้อมูลได้')
    }
}

let login = async (db, Username, Password) => {
    const config = {
        server: db.dbconfig[0].server,
        database: db.dbconfig[0].database,
        user: db.dbconfig[0].user,
        password: db.dbconfig[0].password,
        options: {
            "encrypt": false,
            "enableArithAbort": true
        }
    };

    const pool = await sql.connect(config);
    const query = `SELECT * FROM users WHERE Username = '${Username}'`;
    const { recordset } = await pool.request().query(query);

    if (recordset.length <= 0) {
        throw new ErrorHandler(400, "Username OR Password ไม่ถูกต้อง")
    } else {
        const resultPass = bcrypt.compareSync(Password, recordset[0].Password);
        if (resultPass == false) { 
            throw new ErrorHandler(400, "Username หรือ Password ไม่ถูกต้อง")
        } else {

            const reMap = recordset.map(item => {
                return {
                    Firstname: item.Firstname,
                    ID: item.ID,
                    Role: item.role,
                    server: db.dbconfig[0].server,
                    database: db.dbconfig[0].database,
                    user: db.dbconfig[0].user,
                    password: db.dbconfig[0].password,
                }
            })

            let accessToken = TokenManager.getGeneraterAccessToken({ reMap });

            return [accessToken, null];
        }

    }
}

module.exports = {
    login,
    register
}