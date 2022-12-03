const AWS = require('aws-sdk');

const buscarEmpleado = async (event) => {
    try {
        let dynamodb = new AWS.DynamoDB.DocumentClient();
        let { id } = event.pathParameters;
        let result = await dynamodb.get({ TableName: 'Empleado', Key: { id } }).promise();
        let empleado = result.Item || {};
        return { statusCode: 200, body: JSON.stringify(empleado) };
    } catch (error) {
        console.log(error);
        return { statusCode: 400, body: JSON.stringify({ mensaje: 'ERROR buscarEmpleado: Bad Request' }) };
    }
}

module.exports = {
    buscarEmpleado
};

/*module.exports.hello = async (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: 'Test Serverless RIMAC challenge!' }),
    };
    return callback(null, response);
};*/
