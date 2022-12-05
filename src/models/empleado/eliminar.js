const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para eliminar Empleado
 * @returns Callback con respuesta
 */
const eliminarEmpleadoLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con DYNAMODB' }) };
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient(); // Conecta con dynamoDB
        let { id } = event.pathParameters;
        await dynamodb.delete({ TableName: 'Empleado', Key: { id } }).promise(); // Elimina empleado
        response = { statusCode: 200, body: JSON.stringify({ mensaje: `Empleado ${id} se elimino` }) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve la respuesta en el callback
}

module.exports = { eliminarEmpleadoLambda };