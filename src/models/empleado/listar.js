const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para listar Empleados
 * @returns Callback con respuesta
 */
const listarEmpleadoLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con DYNAMODB' }) };
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient(); // Conecta con dynamoDB
        let result = await dynamodb.scan({ TableName: 'Empleado' }).promise(); // Obtiene empleados
        let lista = result.Items || [];
        response = { statusCode: 200, body: JSON.stringify(lista) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve lista de empleados en el callback
}

module.exports = { listarEmpleadoLambda };