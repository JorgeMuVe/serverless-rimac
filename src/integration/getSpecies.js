const axios = require('axios');

/**
 * @description Busca un especie en SWAPI
 * @param id Identificador de especie
 * @returns Objecto especie
 */
const getSpeciesSwapi = async (id) => {
    try {
        // Consulta el api species de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/species/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let especie = {
            nombre: data.name,
            clasificacion: data.classification,
            designacion: data.designation,
            altura_media: data.average_height,
            color_piel: data.skin_colors,
            color_cabello: data.hair_colors,
            color_ojos: data.eye_colors,
            promedio_vida: data.average_lifespan,
            planeta: data.homeworld,
            idioma: data.language,
            personas: data.people,
            peliculas: data.films,
            creado: data.created,
            editado: data.edited,
            url: data.url
        }
        return especie; // Devuelve especie traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para especies
 * @returns Callback con respuesta
 */
const getSpeciesLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        let { id } = event.pathParameters; // let id = 1
        let especie = await getSpeciesSwapi(id); // Buscar especie en SWAPI
        response = { statusCode: 200, body: JSON.stringify(especie) };
    } catch (error) { console.log(error); } 
    callback(null, response); // Devuelve la especie en el callback
}

module.exports = { getSpeciesLambda, getSpeciesSwapi };