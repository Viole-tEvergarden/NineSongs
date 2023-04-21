const db = require('./index');
const util = require('util');


exports.implementSql = async (sql, params) =>{
  let connection;
  try {
    connection = await db.getConnection();
    connection.query = util.promisify(connection.query);
    const result = await connection.query(sql, params);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};