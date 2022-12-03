const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const crearPersona = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { nombre } = JSON.parse(event.body);
    const nuevaPersona = { id: v4(), nombre, creado: new Date() };
    await dynamodb.put({ TableName: 'Persona', Item: nuevaPersona }).promise();
    return { statusCode: 200, body: JSON.stringify(nuevaPersona) };
}

module.exports = { crearPersona };