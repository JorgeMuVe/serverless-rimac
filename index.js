
const swapi = require('swapi-node');

const main = async () => {
    console.log("RUN");
    await swapi.planets({ id: 5 }).then(res => {
        console.log(res);
    });
}

main();