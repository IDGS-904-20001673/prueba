const mysql = require('promise-mysql');
const { convertInsertValues, convertObjectToString, convertObjectToWhere } = require('./utilities');

async function selectQuery(con, table, fields = '*', where = null) {
    let whereText = where ? convertObjectToWhere(where) : '';
    const select = `SELECT ${fields} FROM ${table} ${whereText};`;
    try {
        const results = await con.query(select);
        console.log('Select Query Results:', results);
        return results;
    } catch (error) {
        console.error('Select Query Error:', error.message);
        throw error;
    } finally {
        await con.release();
    }
}

async function insertQuery(con, table, values){
    const rowsValues = convertInsertValues(values);
    const insertQuery = `insert into ${table} ${rowsValues.rows} values ${rowsValues.placeholders}`;
    try {
        const results = await con.query(insertQuery, rowsValues.values);
        return results;
    } catch (error) {
        await con.release()
        throw error;
    }
}

async function updateQuery(con, table, values, where) {
    let val = convertObjectToString(values);
    val.placeholders = `${val.placeholders}, updatedAt = ?`;
    val.values.push(new Date());
    const whereText = convertObjectToWhere(where);
    const updateQuery = `UPDATE ${table} SET ${val.placeholders} ${whereText}`;
    try {
        const results = await con.query(updateQuery, val.values);
        console.log('Update Query:', updateQuery);
        console.log('Update Query Results:', results);
        return results;
    } catch (error) {
        console.error('Update Query Error:', error.message);
        throw error;
    } finally {
        await con.release();
    }
}

async function deleteQuery(con, table, where) {
    const whereText = convertObjectToWhere(where);
    const deleteQuery = `DELETE FROM ${table} ${whereText}`;
    try {
        const results = await con.query(deleteQuery);
        console.log('Delete Query:', deleteQuery);
        console.log('Delete Query Results:', results);
        return results;
    } catch (error) {
        console.error('Delete Query Error:', error.message);
        throw error;
    } finally {
        await con.release();
    }
}

async function authenticationQuery(con, user) {
    const select = `select id, name, lastName, password from users where ? = email;`;
    try {
        const results = await con.query(select, [user]);
        return results;
    } catch (error) {
        await con.release();
        throw error;
    }
}

module.exports = {
    selectQuery,
    insertQuery,
    updateQuery,
    deleteQuery,
    authenticationQuery
};
