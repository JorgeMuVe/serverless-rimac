const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para editar Empleado
 * @returns Callback con respuesta
 */
const editarEmpleadoLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con DYNAMODB' }) };
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient(); // Conecta con dynamoDB
        let { id } = event.pathParameters;
        const { nombres, profesion, experiencia, dni } = JSON.parse(event.body);
        await dynamodb.update({
            TableName: 'Empleado', Key: { id },
            UpdateExpression: 'set dni = :dni, nombres = :nombres, profesion =:profesion, experiencia = :experiencia, editado = :editado',
            ExpressionAttributeValues: {
                ':dni': dni,
                ':nombres': nombres,
                ':profesion': profesion,
                ':experiencia': experiencia,
                ':editado': JSON.stringify(new Date())
            },
            ReturnValues: 'ALL_NEW'
        }).promise();  // Edita Empleado
        response = { statusCode: 200, body: JSON.stringify({ mensaje: `Empleado ${id} se actualizo` }) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve al empleado en el callback
}

module.exports = { editarEmpleadoLambda };