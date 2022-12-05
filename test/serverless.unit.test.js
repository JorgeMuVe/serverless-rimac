
const validators = require('./utils/validators');
const eventGenerator = require('./utils/eventGenerator');

const fncPeople = require('../src/integration/getPeople');
const fncPlanet = require('../src/integration/getPlanets');
const fncBuscar = require('../src/models/empleado/buscar');
const fncCrear = require('../src/models/empleado/crear');
const fncEditar = require('../src/models/empleado/editar');
const fncEliminar = require('../src/models/empleado/eliminar');
const fncListar = require('../src/models/empleado/listar');

describe('Prueba la existencia de lambdas', () => {
    test('All functions', () => {
        expect(typeof fncPeople.getPeopleLambda).toBe('function');
        expect(typeof fncPlanet.getPlanetsLambda).toBe('function');
        expect(typeof fncBuscar.buscarEmpleadoLambda).toBe('function');
        expect(typeof fncCrear.crearEmpleadoLambda).toBe('function');
        expect(typeof fncEditar.editarEmpleadoLambda).toBe('function');
        expect(typeof fncEliminar.eliminarEmpleadoLambda).toBe('function');
        expect(typeof fncListar.listarEmpleadoLambda).toBe('function');
    });
});

/*describe('Prueba el lambda integPeopleSwapi', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({ pathParametersObject: { id: 1 } });
        await fncPeople.getPeopleLambda(event, null, (error, res) => {
            expect(res).toBeDefined();
            expect(validators.isApiGatewayResponse(res)).toEqual(true);
        });
    });
});*/

describe('Prueba el lambda integPlanetSwapi', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({ pathParametersObject: { id: 1 } });
        await fncPlanet.getPlanetsLambda(event, null, (error, res) => {
            expect(res).toBeDefined();
            expect(validators.isApiGatewayResponse(res)).toEqual(true);
        });
    });
});

describe('Prueba el lambda listarEmpleado', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({});
        await fncListar.listarEmpleadoLambda(event, null, (error, res) => {
            expect(res).toBeDefined();
            expect(validators.isApiGatewayResponse(res)).toEqual(true);
        });
    });
});