
const validators = require('./validators');
const eventGenerator = require('./eventGenerator');

const fncPeople = require('../src/integration/getPeople');
const fncPlanet = require('../src/integration/getPlanet');
const fncBuscar = require('../src/models/empleado/buscar');
const fncCrear = require('../src/models/empleado/crear');
const fncEditar = require('../src/models/empleado/editar');
const fncEliminar = require('../src/models/empleado/eliminar');
const fncListar = require('../src/models/empleado/listar');

describe('Prueba la existencia de lambdas', () => {
    test('All functions', () => {
        expect(typeof fncPeople.getPeople).toBe('function');
        expect(typeof fncPlanet.getPlanet).toBe('function');
        expect(typeof fncBuscar.buscarEmpleado).toBe('function');
        expect(typeof fncCrear.crearEmpleado).toBe('function');
        expect(typeof fncEditar.editarEmpleado).toBe('function');
        expect(typeof fncEliminar.eliminarEmpleado).toBe('function');
        expect(typeof fncListar.listarEmpleado).toBe('function');
    });
});

describe('Prueba el lambda integPeopleSwapi', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({ pathParametersObject: { id: 1 } });
        const res = await fncPeople.getPeople(event);
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toEqual(true);
    });
});

describe('Prueba el lambda integPlanetSwapi', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({ pathParametersObject: { id: 1 } });
        const res = await fncPlanet.getPlanet(event);
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toEqual(true);
    });
});

describe('Prueba el lambda listarEmpleado', () => {
    test('Debe responder con { statusCode, body }', async () => {
        const event = eventGenerator({});
        const res = await fncListar.listarEmpleado(event);
        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toEqual(true);
    });
});