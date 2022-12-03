const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const crearEmpleado = async (event) => {
    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const { nombres, profesion, experiencia, dni } = JSON.parse(event.body);
        const nuevoEmpleado = { id: v4(), nombres, profesion, experiencia, dni, creado: new Date() };
        await dynamodb.put({ TableName: 'Empleado', Item: nuevoEmpleado }).promise();

        return { statusCode: 200, body: JSON.stringify(nuevoEmpleado) };

    } catch (error) {
        console.log(error);
        return { statusCode: 400, body: JSON.stringify({ mensaje: 'ERROR crearEmpleado: Bad Request' }) };
    }
}

module.exports = {
    crearEmpleado
};