
const swapi = require('swapi-node');
const axios = require('axios');

const main = async () => {
    try {
        console.log("TEST PARA VALIDAR AXIOS VS SWAPI-NODE");
        let result = await swapi.get('https://swapi.py4e.com/api/people/2');
        console.log(result);
        let { data } = await axios.get(`https://swapi.py4e.com/api/planets`, { headers: { 'Accept-Encoding': 'application/json' } });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

main();