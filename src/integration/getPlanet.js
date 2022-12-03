//const AWS = require('aws-sdk');
const swapi = require('swapi-node');

const getPlanet = async (event) => {
    try {
        let { id } = event.pathParameters;
        let planet = await swapi.planets({ id });
        console.log(planet);
        let planeta = {
            nombre: planet.name,
            clima: planet.climate,
            gravedad: planet.gravity,
            diametro: planet.diameter,            
            periodo_orbital: planet.orbital_period,
            periodo_rotacion: planet.rotation_period,
            poblacion: planet.population,
            residentes: planet.residents,
            peliculas: planet.films,                                                            
            superficie_agua: planet.surface_water,
            terreno : planet.terrain,
            url: planet.url,
            creado: planet.created,
            editado: planet.edited
        }
        return { statusCode: 200, body: JSON.stringify(planeta) };
    } catch (error) {
        console.log(error);
        return { statusCode: 401, body: JSON.stringify({ mensaje: 'No se pudo encontrar el planeta' }) };
    }
}

module.exports = {
    getPlanet
};