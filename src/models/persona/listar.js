const AWS = require('aws-sdk');

const listarPersona = async (event) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let result = await dynamodb.scan({ TableName: 'Persona' }).promise();
    let lista = result.Items || [];
    return { statusCode: 200, body: JSON.stringify(lista) };
}

module.exports = { listarPersona };