const axios = require('axios');

/**
 * @description Busca una película en SWAPI
 * @param id Identificador de la película
 * @returns Objecto película
 */
const getFilmsSwapi = async (id) => {
    try {
        // Consulta el api films de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/films/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let pelicula = {
            titulo: data.title,
            id_episodio: data.episode_id,
            texto_apertura: data.opening_crawl,
            director: data.director,
            productor: data.producer,
            fecha_lanzamiento: data.release_date,
            personas: data.characters,
            planetas: data.planets,
            naves: data.starships,
            vehiculos: data.vehicles,
            especies: data.species,
            creado: data.created,
            editado: data.edited,
            url: data.url
        }
        return pelicula; // Devuelve película traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para películas
 * @returns Callback con respuesta
 */
const getFilmsLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        let { id } = event.pathParameters; // let id = 1
        let pelicula = await getFilmsSwapi(id); // Buscar película en SWAPI
        response = { statusCode: 200, body: JSON.stringify(pelicula) };
    } catch (error) { console.log(error); }
    callback(null, response); // Devuelve la película en el callback
}

module.exports = { getFilmsLambda, getFilmsSwapi };