const axios = require('axios');
const getFilms = require('./getFilms');
const getPlanets = require('./getPlanets');
const getSpecies = require('./getSpecies');
const getVehicles = require('./getVehicles');
const getStarships = require('./getStarships');

/**
 * @description Busca el planeta de una persona en SWAPI
 * @param urlPlanet URL del planeta
 * @returns String con nombre del planeta
 */
const getPeopleHomeworld = async (urlPlanet = "") => {
    // Consulta el api planets de SWAPI
    let id = parseInt(urlPlanet.replace('https://swapi.py4e.com/api/planets/', '').replace('/', ''));
    let planet = await getPlanets.getPlanetsSwapi(id); // Buscar planeta en SWAPI
    return planet.nombre; // Devuelve el nombre del planeta
}

/**
 * @description Busca las películas de una persona en SWAPI
 * @param listFilms Lista de URL de películas
 * @returns Lista con nombres de películas
 */
const getPeopleFilms = async (listFilms = []) => {
    let listResponse = [];
    // Consulta el api films de SWAPI
    let listIds = listFilms.map(e => parseInt(e.replace('https://swapi.py4e.com/api/films/', '').replace('/', '')));
    for await (let id of listIds) {
        try {
            let film = await getFilms.getFilmsSwapi(id); // Buscar película en SWAPI
            listResponse.push(film.titulo);
        } catch (error) { console.log('error', error); }
    }
    return listResponse; // Devuelve lista con nombres de películas
}

/**
 * @description Busca las especies de una persona en SWAPI
 * @param listFilms Lista de URL de especies
 * @returns Lista con nombres de especies
 */
const getPeopleSpecies = async (listSpecies = []) => {
    let listResponse = [];
    // Consulta el api films de SWAPI
    let listIds = listSpecies.map(e => parseInt(e.replace('https://swapi.py4e.com/api/species/', '').replace('/', '')));
    for await (let id of listIds) {
        try {
            let specie = await getSpecies.getSpeciesSwapi(id); // Buscar especie en SWAPI
            listResponse.push(specie.nombre);
        } catch (error) { console.log('error', error); }
    }
    return listResponse; // Devuelve lista con nombres de especies
}

/**
 * @description Busca los vehículos de una persona en SWAPI
 * @param listFilms Lista de URL de vehículos
 * @returns Lista con nombres de vehículos
 */
const getPeopleVehicles = async (listVehicles = []) => {
    let listResponse = [];
    // Consulta el api vehicles de SWAPI
    let listIds = listVehicles.map(e => parseInt(e.replace('https://swapi.py4e.com/api/vehicles/', '').replace('/', '')));
    for await (let id of listIds) {
        try {
            let vehicle = await getVehicles.getVehiclesSwapi(id); // Buscar vehículo en SWAPI
            listResponse.push(vehicle.nombre);
        } catch (error) { console.log('error', error); }
    }
    return listResponse; // Devuelve lista con nombres de vehículos
}

/**
 * @description Busca las naves de una persona en SWAPI
 * @param listFilms Lista de URL de naves
 * @returns Lista con nombres de naves
 */
const getPeopleStarships = async (listStarships = []) => {
    let listResponse = [];
    // Consulta el api starships de SWAPI
    let listIds = listStarships.map(e => parseInt(e.replace('https://swapi.py4e.com/api/starships/', '').replace('/', '')));
    for await (let id of listIds) {
        try {
            let starship = await getStarships.getStarshipsSwapi(id); // Buscar nave en SWAPI
            listResponse.push(starship.nombre);
        } catch (error) { console.log('error', error); }
    }
    return listResponse; // Devuelve lista con nombres de naves
}

/**
 * @description Busca una persona en SWAPI
 * @param id identificador de persona
 * @returns Objecto persona
 */
const getPeopleSwapi = async (id) => {
    try {
        // Consulta el api people de SWAPI
        let { data } = await axios.get(`https://swapi.py4e.com/api/people/${id}`, { headers: { 'Accept-Encoding': 'application/json' } });
        let persona = {
            nombre: data.name,
            altura: data.height,
            peso: data.mass,
            color_cabello: data.hair_color,
            color_piel: data.skin_color,
            color_ojos: data.eye_color,
            fecha_nacimiento: data.birth_year,
            genero: data.gender,
            planeta_natal: await getPeopleHomeworld(data.homeworld), // Obtiene el planeta natal de SWAPI
            peliculas: await getPeopleFilms(data.films), // Obtiene las películas de SWAPI
            especies: await getPeopleSpecies(data.species), // Obtiene las especies de SWAPI
            vehiculos: await getPeopleVehicles(data.vehicles), // Obtiene los vehiculos de SWAPI
            naves: await getPeopleStarships(data.starships), // Obtiene las naves de SWAPI
            creado: data.created,
            editado: data.edited,
            url: data.url
        }
        return persona; // Devuelve persona traducida e integrada de SWAPI
    } catch (error) { throw error; }
}

/**
 * @description Funcion Lambda para personas
 * @returns Callback con respuesta
 */
const getPeopleLambda = async (event, context, callback) => {
    let response = { statusCode: 404, body: JSON.stringify({ mensaje: 'ERROR INTERNO: No se pudo conectar con SWAPI' }) };
    try {
        //let { id } = event.pathParameters; 
        let id = 1;
        let persona = await getPeopleSwapi(id);  // Buscar persona en SWAPI
        response = { statusCode: 200, body: JSON.stringify(persona) };
    } catch (error) { console.log(error) }
    callback(null, response); // Devuelve la persona en el callback
}

module.exports = { getPeopleLambda, getPeopleSwapi };