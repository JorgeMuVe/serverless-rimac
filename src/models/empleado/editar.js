const AWS = require('aws-sdk');

const editarEmpleado = async (event) => {
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient();
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
                ':editado': new Date()
            },
            ReturnValues: 'ALL_NEW'
        }).promise();
        return { statusCode: 200, body: JSON.stringify({ mensaje: `Empleado ${id} se actualizo` }) };
    } catch (error) {
        console.log(error);
        return { statusCode: 401, body: { error } };
    }
}

module.exports = {
    editarEmpleado
};