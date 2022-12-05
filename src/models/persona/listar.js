const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para listar Personas
 * @returns Callback con respuesta
 */
const listarPersonaLambda = async (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let result = await dynamodb.scan({ TableName: 'Persona' }).promise();
    let lista = result.Items || [];
    let response = { statusCode: 200, body: JSON.stringify(lista) };
    callback(null, response);
}

module.exports = { listarPersonaLambda };