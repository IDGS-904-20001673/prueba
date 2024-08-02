const ResponseCreator = require('./ResponseCreator');

/**
 * Función que retorna las columnas y los valores a insertar en una inserción en la base de datos
 * @param {any} obj 
 * @returns {{rows: string, values: string, placeholders: string}}
 */
function convertInsertValues(obj){
    let response = {
        rows: null,
        values: null,
        placeholders: null
    }
    let rows = [];
    let values = [];
    let placeholders = [];

    for (const key in obj) {
        const formatedVal = convertValueToString(obj[key]);

        rows.push(key);
        values.push(formatedVal);
        placeholders.push('?');
    }


    response.rows = `(${rows.join(', ')})`;
    response.values = values;
    response.placeholders = `(${placeholders.join(', ')})`;
    return response;
}

/**
 * Función que retorna la un string en formato '{key1} = {value1}, .... {keyn} = {valuen}
 * @param {any} obj Objeto que contiene los valores a convertir
 * @returns {{placeholders: string, values: Array<any>}}
 */
function convertObjectToString(obj) {
    const props = [];
    const values = [];
    for (const key in obj) {
        // if (obj.hasOwnProperty(key)) {
        const val = obj[key];
        const formatedVal = convertValueToString(val);
        props.push(`${key} = ?`);
        values.push(formatedVal);
        // }
    }
    let response = {
        placeholders: props.join(', '),
        values: values
    };
    return response;
}

/**
 * Función que retorna la un string en formato '{key1} = {value1}, AND {keyn} = {valuen}. En caso de que el value sea un array lo hace {key} IN ({value}, {value})
 * @param {any} obj Objeto que contiene los valores a convertir
 * @returns {props: string}
 */
function convertObjectToWhere(obj) {
    const props = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            const formatedVal = convertValueToString(val);
            if(!isNaN(formatedVal)){
                props.push(`${key} = ${formatedVal}`);
            }
            else if(formatedVal.includes('\(')){
                props.push(`${key} IN ${formatedVal}`);
            }else {
                props.push(`${key} = ${formatedVal}`);
            }
        }
    }
    return `WHERE ${props.join(' AND ')}`;
}

/**
 * Función que hace una conversión de valores string para insertarlos en una query de base de datos
 * @param {any} val Cualquier objeto
 * @returns En caso de que sea un arreglo de números, los regresa en formato (n, n, n), en caso de que sea un string lo retorna entrecomillado 'value', sino, retorna el valor
 */
function convertValueToString(val) {
    if (Array.isArray(val)) {
        return `(${val.join(', ')})`;
    // } else if (typeof val === 'string') {
    //     return `'${val}'`;
    } else {
        return val;
    }
}

/**
 * Función que hace la construcción de un objeto ResponseCreator y lo retorna
 * @param {boolean} success true en caso de que la operación se haya realizado con éxito
 * @param {any} data los resultados de la petición
 * @param {err} err el mensaje de error en caso de haber ocurrido alguno
 * @returns Un objeto de tipo ResponseCreator
 */
function createResponse (success, data, err){
    const response = new ResponseCreator(success, data, err);
    return response;
}

/**
 * Función que hace la conversión de fechas en formato UTC a formato local.
 * @param {*} val Valor de fecha a ser convertido
 * @returns Fecha en formato local dd/MM/yyyy hh:mm:ss
 */
function convertUTCToLocalDate(val, long, adminDate){
    if(long){
        if (adminDate){
            const response = new Date(val).toLocaleString("es-MX"); 
            return response;
        }
        const response = new Date(val).toLocaleString("es-MX", {weekday: 'long', day:'2-digit', month:'long', year:'numeric' }); 
        return response.toUpperCase();
    }
    const response = new Date(val).toLocaleString("es-MX", { day:'2-digit', month:'short', year:'numeric' }); 
    return response.toUpperCase();
}


/**
 * Función que hace la conversión de las fechas C_A y U_A de una consulta en la base de datos.
 * @param {*} rows 
 */
function parseSelectDates (rows = [], long, adminDate){
    rows.forEach((element) => {
        if(element.C_A){
            element.C_A = convertUTCToLocalDate(element.C_A, long, adminDate);
        }
        if(element.U_A){
            element.U_A = convertUTCToLocalDate(element.U_A, long, adminDate);
        }
        if(element.createdAt){
            element.createdAt = convertUTCToLocalDate(element.createdAt, long, adminDate);
        }
        if(element.updatedAt){
            element.updatedAt = convertUTCToLocalDate(element.updatedAt, long, adminDate);
        }
    })
}

/**
 * Función que crea el llamado a un procedimiento almacenado para hacer su posterior ejecución
 * @param {string} storedProcedure nombre del procedimiento almacenado
 * @param {any} obj nombres de los parámetro del procedimiento almacenado contenido en la llaves del objeto, y los valores de estos
 * @returns {{sp: string, values: [any]}}
 */
function createCallableStatement(storedProcedure, obj) {
    let placeholders = '';
    let values = [];
    for(const key in obj){
        placeholders = placeholders.concat('?, ');
        values.push(obj[key]);
    }
    const sp = `CALL ${storedProcedure} (${placeholders.replace(/,([^,]*)$/, '$1')});`;
    return {
        sp: sp,
        values: values
    };
}

/**
 * Función que genera la información necesaria para un paginador
 * @param {{registers: number, page: number}} pagination Petición de paginación 
 * @param {number} totalRegisters Total de registros
 * @param {Array<any>} rows Registros obtenidos 
 * @returns {{totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, currentPage: number, rows: number,totalRegisters:number}}
 */
function createPagination(pagination, totalRegisters, rows, adminDate){
    const totalPages = Math.ceil(totalRegisters / pagination.registers);
    const hasNextPage = totalRegisters > (pagination.registers * pagination.page);
    const hasPreviousPage = pagination.page > 1;
    preparePaginationData(rows, adminDate);
    const response = {
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
        currentPage: pagination.page,
        rows: rows,
        totalRegisters: totalRegisters
    }
    return response;
}

/**
 * Función que convierte las fechas a un formato de acuerdo a si es vista de admin o al público y elimina el total de registros en cada registro
 * @param {[any]} rows Registros a los que se les hará el cambio
 * @param {boolean} adminDate Flag que indica si se convertirá a fecha corta o larga
 */
function preparePaginationData(rows = [], adminDate){
    if (adminDate){
        parseSelectDates(rows, true, true);
    }else {
        parseSelectDates(rows);
    }
    rows.forEach((element) => {
        delete element.totalRows
    });
}

module.exports = {
    convertObjectToString,
    convertInsertValues,
    createResponse,
    convertObjectToWhere,
    convertUTCToLocalDate,
    parseSelectDates,
    createCallableStatement,
    createPagination,
}