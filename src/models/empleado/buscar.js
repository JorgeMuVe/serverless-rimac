const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para buscar Empleado
 * @returns Callback con respuesta
 */
const buscarEmpleadoLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con DYNAMODB' }) };
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient(); // Conecta con dynamoDB
        let { id } = event.pathParameters;
        let result = await dynamodb.get({ TableName: 'Empleado', Key: { id } }).promise(); // Busca Empleado
        let empleado = result.Item || {};
        response = { statusCode: 200, body: JSON.stringify(empleado) };
    } catch (error) {
        console.log(error);
        response = { statusCode: 400, body: JSON.stringify({ mensaje: 'ERROR buscarEmpleado: Bad Request' }) };
    }
    callback(null, response); // Devuelve al empleado en el callback
}

module.exports = { buscarEmpleadoLambda };