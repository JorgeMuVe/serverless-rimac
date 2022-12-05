const axios = require('axios');

/**
 * @description Busca un vehículo en SWAPI
 * @param id Identificador de vehículo
 * @returns Objecto vehículo
 */
const getVehiclesSwapi = async (id) => {
    try {
        // Consulta el api vehicles de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/vehicles/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let vehiculo = {
            nombre: data.name,
            modelo: data.model,
            fabricante: data.manufacturer,
            costo_en_creditos: data.cost_in_credits,
            longitud: data.length,
            velocidad_maxima_admosfera: data.max_atmosphering_speed,
            tripulacion: data.crew,
            pasajeros: data.passengers,
            capacidad_carga: data.cargo_capacity,
            consumibles: data.consumables,
            clase_vehiculo: data.vehicle_class,
            pilotos: data.pilots,
            peliculas: data.films,
            creado: data.created,
            editado: data.edited,
            url: data.url
        }
        return vehiculo; // Devuelve vehículo traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para vehículos
 * @returns Callback con respuesta
 */
const getVehiclesLambda = async (event, context, callback) => {    
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        let { id } = event.pathParameters; // let id = 4
        let vehiculo = await getVehiclesSwapi(id); // Buscar vehículo en SWAPI
        response = { statusCode: 200, body: JSON.stringify(vehiculo) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve el vehículo en el callback
}

module.exports = { getVehiclesLambda, getVehiclesSwapi };