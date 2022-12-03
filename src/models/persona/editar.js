const AWS = require('aws-sdk');

const editarPersona = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { nombre } = JSON.parse(event.body);
    await dynamodb.update({
        TableName: 'Persona', Key: { id },
        UpdateExpression: 'set nombre = :nombre',
        ExpressionAttributeValues: { ':nombre': nombre },
        ReturnValues: 'ALL_NEW'
    }).promise();
    return { statusCode: 200, body: JSON.stringify({ mensaje: `Persona ${id} se actaulizo` }) };
}

module.exports = { editarPersona };