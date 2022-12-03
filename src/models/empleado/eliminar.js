const AWS = require('aws-sdk');

const eliminarEmpleado = async (event) => {
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient();
        let { id } = event.pathParameters;

        await dynamodb.delete({ TableName: 'Empleado', Key: { id } }).promise();

        return { statusCode: 200, body: JSON.stringify({ mensaje: `Empleado ${id} se elimino` }) };
    } catch (error) {
        return { statusCode: 401, body: { error } };
    }
}

module.exports = {
    eliminarEmpleado
};