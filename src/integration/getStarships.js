const axios = require('axios');

/**
 * @description Busca una nave en SWAPI
 * @param id Identificador de nave
 * @returns Objecto nave
 */
const getStarshipsSwapi = async (id) => {
    try {
        // Consulta el api starships de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/starships/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let nave = {
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
            hiperimpulsor_calificacion: data.hyperdrive_rating,
            MGLT: data.MGLT, // MEGA LUZ POR HORA
            clase_nave: data.starship_class,
            pilotos: data.pilots,
            peliculas: data.films,
            creado: data.created,
            editado: data.edited,
            url: data.url,
        }
        return nave; // Devuelve nave traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para naves
 * @returns Callback con respuesta
 */
const getStarshipsLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        let { id } = event.pathParameters; // let id = 2
        let nave = await getStarshipsSwapi(id); // Buscar nave en SWAPI
        response = { statusCode: 200, body: JSON.stringify(nave) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve la nave en el callback
}

module.exports = { getStarshipsLambda, getStarshipsSwapi };