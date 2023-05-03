const sql = require('mssql');

const get = async(config) => {

    const pool = await sql.connect(config);
    const query = `SELECT ID, Firstname, Lastname FROM users WHERE ID = '${config.ID}'`;
    const { recordset } = await pool.request().query(query);

    return [recordset, null]
}

module.exports = {
    get
}