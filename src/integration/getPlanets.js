const axios = require('axios');

/**
 * @description Busca un planeta en SWAPI
 * @param id Identificador del planeta
 * @returns Objecto planeta
 */
const getPlanetsSwapi = async (id) => {
    try {
        // Consulta el api planets de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/planets/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let planeta = {
            nombre: data.name,
            clima: data.climate,
            gravedad: data.gravity,
            diametro: data.diameter,
            periodo_orbital: data.orbital_period,
            periodo_rotacion: data.rotation_period,
            poblacion: data.population,
            residentes: data.residents,
            peliculas: data.films,
            superficie_agua: data.surface_water,
            terreno: data.terrain,
            url: data.url,
            creado: data.created,
            editado: data.edited
        }
        return planeta; // Devuelve planeta traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para planetas
 * @returns Callback con respuesta
 */
const getPlanetsLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        let { id } = event.pathParameters; // let id = 1;
        let planeta = await getPlanetsSwapi(id); // Buscar planeta en SWAPI
        response = { statusCode: 200, body: JSON.stringify(planeta) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve el planeta en el callback
}

module.exports = { getPlanetsLambda, getPlanetsSwapi };