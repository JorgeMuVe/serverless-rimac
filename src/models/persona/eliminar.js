const AWS = require('aws-sdk');

const eliminarPersona = async (event) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { id } = event.pathParameters;
    await dynamodb.delete({ TableName: 'Persona', Key: { id } }).promise();
    return { statusCode: 200, body: JSON.stringify({ mensaje: `Persona ${id} se elimino` }) };
}

module.exports = { eliminarPersona };