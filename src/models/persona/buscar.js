const AWS = require('aws-sdk');

const buscarPersona = async (event) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { id } = event.pathParameters;
    let result = await dynamodb.get({ TableName: 'Persona', Key: { id } }).promise();
    let persona = result.Item || {};
    return { statusCode: 200, body: JSON.stringify(persona) };
}

module.exports = { buscarPersona };