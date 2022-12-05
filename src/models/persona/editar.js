const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para editar Persona
 * @returns Callback con respuesta
 */
const editarPersonaLambda = async (event, context, callback) => {
    let dynamodb = new AWS.DynamoDB.DocumentClient();
    let { id } = event.pathParameters;
    let { nombre } = JSON.parse(event.body);
    await dynamodb.update({
        TableName: 'Persona', Key: { id },
        UpdateExpression: 'set nombre = :nombre',
        ExpressionAttributeValues: { ':nombre': nombre },
        ReturnValues: 'ALL_NEW'
    }).promise();
    let response = { statusCode: 200, body: JSON.stringify({ mensaje: `Persona ${id} se actaulizo` }) };
    callback(null, response);
}

module.exports = { editarPersonaLambda };