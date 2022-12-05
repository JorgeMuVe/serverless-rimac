const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para eliminar Persona
 * @returns Callback con respuesta
 */
const eliminarPersonaLambda = async (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { id } = event.pathParameters;
    await dynamodb.delete({ TableName: 'Persona', Key: { id } }).promise();
    let response = { statusCode: 200, body: JSON.stringify({ mensaje: `Persona ${id} se elimino` }) };
    callback(null, response);
}

module.exports = { eliminarPersonaLambda };