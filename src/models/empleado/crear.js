const { v4 } = require('uuid');
const AWS = require('aws-sdk');

/**
 * @description Funcion Lambda para crear Empleado
 * @returns Callback con respuesta
 */
const crearEmpleadoLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con DYNAMODB' }) };
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient(); // Conecta con dynamoDB
        const { nombres, profesion, experiencia, dni } = JSON.parse(event.body);
        const nuevoEmpleado = { id: v4(), nombres, profesion, experiencia, dni, creado: JSON.stringify(new Date()) };
        await dynamodb.put({ TableName: 'Empleado', Item: nuevoEmpleado }).promise(); // Crea Empleado
        response = { statusCode: 200, body: JSON.stringify(nuevoEmpleado) };
    } catch (error) {
        console.log(error);
        response = { statusCode: 400, body: JSON.stringify({ mensaje: 'ERROR crearEmpleado: Bad Request' }) };
    }
    callback(null, response); // Devuelve al empleado en el callback
}

module.exports = { crearEmpleadoLambda };