const pool = require('../config/db');
const { createResponse} = require('../utilities/utilities');

const { 
    insertQuery, 
} = require('../utilities/queries');

/**
 * Método que hace una inserción en la tabla category
 * @param {Category} values Valores a insertar
 * @returns {{success: boolean, message: string, data: Object}}
 */
async function signup(values){
    try {
        const connection = await pool();
        await connection.beginTransaction();
        const insertId = await insertQuery(connection, 'users', values);
        if (insertId.affectedRows !== 1){
            await connection.rollback();
            await connection.release();
            throw new Error('ERROR OCURRED DURING INSERT');
        }
        await connection.commit();
        await connection.release();
        return createResponse(true, insertId);
    } catch (error) {
        return createResponse(false, null, `${error}`)
    }
}




module.exports = {
    signup,
};