const AWS = require('aws-sdk');

const listarEmpleado = async (event) => {
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient();
        let result = await dynamodb.scan({ TableName: 'Empleado' }).promise();
        let lista = result.Items || [];
        return { statusCode: 200, body: JSON.stringify(lista) };
    } catch (error) {
        return { statusCode: 401, body: JSON.stringify({ error }) };
    }
}

module.exports = {
    listarEmpleado
};