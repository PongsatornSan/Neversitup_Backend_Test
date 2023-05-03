const sql = require('mssql');

const addOrder = async(config, ProductID, UserID, Status) => {
   
    const pool = await sql.connect(config);
    const insertQuery = `INSERT INTO orders (ProductID, UserID, Status)
    VALUES ('${ProductID}', '${UserID}', '${Status}')SELECT * FROM product`;

    const { rowsAffected } = await pool.request().query(insertQuery);

    await pool.close();

    if (rowsAffected.length > 0) {
        return [true, null];
    } else {
        throw new ErrorHandler(404, 'ไม่สามารถบันทึกข้อมูลได้')
    }
}

const get = async(config) => {
   
    const pool = await sql.connect(config);
    const query = `SELECT orders.ID, product.ProductName, product.Price, orders.Status FROM orders
    LEFT JOIN product on product.ID = orders.ProductID
    WHERE orders.UserID = '${config.ID}'`;
    
    const { recordset } = await pool.request().query(query);

    const re = recordset.map(item => {
        return {
            ID: item.ID,
            ProductName: item.ProductName,
            Price: item.Price,
            Status: item.Status
        }
    })

    return [re, null]
}

const del = async(config, ID) => {
   
    const pool = await sql.connect(config);
    const query = `Delete From orders WHERE ID = '${ID}'`;
    const { recordset } = await pool.request().query(query);

    return [recordset, null]
}

module.exports = {
    addOrder,
    get,
    del
}