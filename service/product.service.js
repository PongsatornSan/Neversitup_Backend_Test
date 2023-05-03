const sql = require('mssql');

const get = async(config) => {
   
    const pool = await sql.connect(config);
    const query = `SELECT * FROM product`;
    const { recordset } = await pool.request().query(query);

    return [recordset, null]
}

const search = async(config, ProductName) => {
   
    const pool = await sql.connect(config);
    const query = `SELECT * FROM product WHERE ProductName = '${ProductName}'`;
    const { recordset } = await pool.request().query(query);

    return [recordset, null]
}

module.exports = {
    get,
    search
}