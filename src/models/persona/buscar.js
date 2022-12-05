const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para buscar Persona
 * @returns Callback con respuesta
 */
const buscarPersonaLambda = async (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { id } = event.pathParameters;
    let result = await dynamodb.get({ TableName: 'Persona', Key: { id } }).promise();
    let persona = result.Item || {};
    let response = { statusCode: 200, body: JSON.stringify(persona) };
    callback(null, response);
}

module.exports = { buscarPersonaLambda };