const pool = require('../config/db');
const { createResponse } = require('../utilities/utilities');
const { checkPassword } = require('../utilities/encrypt');
const jwt = require('jsonwebtoken');
const { authenticationQuery } = require('../utilities/queries');

const secretKey = process.env.JWT_SECRET || 'default_secret';

/**
 * Método utilzado para validar el login de un usuario y generar el Bearer Token
 * @param { {user: string, password: string} } user Usuario del cual se hará la verificación, contiene el usuario y la contraseña 
 * @returns Retorna el Bearer token en caso de login exitoso
 */
async function authenticate(user) {
    try {
        const connection = await pool();
        const results = await authenticationQuery(connection, user.user);
        console.log(results);
        if (results.length === 0) {
            return createResponse(false, null, 'WRONG USER');
        }

        if (user.password != results[0].password){
            await connection.release();
            return createResponse(false, null, 'WRONG PASSWORD');
        }
        const userToken = { id: results[0].id, username: user.user };
        const token = jwt.sign(userToken, secretKey, { expiresIn: '8h' });
        const response = {
            token: `Bearer ${token}`,
            name: `${results[0].name} ${results[0].lastName}`
        };
        await connection.release();
        return createResponse(true, response);
    } catch (error) {
        return createResponse(false, null, `${error}`);
    }
}

module.exports = authenticate;