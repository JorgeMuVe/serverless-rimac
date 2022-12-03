//const AWS = require('aws-sdk');
const swapi = require('swapi-node');

const getPeople = async (event) => {
    try {
        let { id } = event.pathParameters;
        let people = await swapi.people({ id });
        let persona = {
            nombre: people.name,
            altura: people.height,
            peso: people.mass,
            color_cabello: people.hair_color,
            color_piel: people.skin_color,
            color_ojos: people.eye_color,
            nacimiento: people.birth_year,
            genero: people.gender,
            nacionalidad: people.homeworld,
            peliculas: people.films,
            especies: people.species,
            vehiculos: people.vehicles,
            naves: people.starships,
            creado: people.created,
            editado: people.edited,
            url: people.url
        }
        return { statusCode: 200, body: JSON.stringify(persona) };
    } catch (error) {
        return { statusCode: 404, body: JSON.stringify({ mensaje: 'No se pudo encontrar la persona' }) };
    }
}

module.exports = {
    getPeople
};