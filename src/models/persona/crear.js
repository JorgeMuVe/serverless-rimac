const { v4 } = require('uuid');
const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para crear Persona
 * @returns Callback con respuesta
 */
const crearPersonaLambda = async (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { nombre } = JSON.parse(event.body);
    let nuevaPersona = { id: v4(), nombre, creado: new Date() };
    await dynamodb.put({ TableName: 'Persona', Item: nuevaPersona }).promise();
    let response = { statusCode: 200, body: JSON.stringify(nuevaPersona) };
    callback(null, response);
}

module.exports = { crearPersonaLambda };