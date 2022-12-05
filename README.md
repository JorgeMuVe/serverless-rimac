# RIMAC CHALLENGE

Esta solución permite integrar una base de datos DYNAMODB en AWS,
para administrar la información de Empleados.

Permite también integrar información del API de prueba SWAPI,
traduciendo al español las características de cada modelo consultado.

La integración SWAPI con mayor complejidad es la de Personas(People).

## Instalación

- Necesitas tener instalado serverless globalmente.
    ```bash
    npm install -g serverless

- Puedes instalar las dependencias con npm
    ```bash
    npm install

## Cómo se usa

Puede clonar el repositorio y probarlo localmente, para esto debería seguir:
- Para listar los empleados creados en dynamoDB
    ```bash
    npm run invokeEmployed

- Para buscar persona en SWAPI
    ```bash
    npm run invokePeople

## APIS

Los endpoints se documento con Open Api 3.0.3 - Swagger.

Puedes abrir el [archivo](swagger.yml) en [https://editor.swagger.io/](https://editor.swagger.io/)

### Integración con SWAPI

Obtiene la persona con identificador 1
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/personas/1`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/personas/1)

Obtiene la película con identificador 1
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/peliculas/1`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/peliculas/1)

Obtiene el planeta con identificador 1
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/planetas/1`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/planetas/1)

Obtiene la especie con identificador 1
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/especies/1`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/especies/1)

Obtiene la nave con identificador 2
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/naves/2`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/naves/2)

Obtiene el vehículo con identificador 4
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/vehiculos/4`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/vehiculos/4)


### Integración con DYNAMODB

Obtiene todos los empleados
- [`GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados`](https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados)

Registra información de un empleado con data del body
- `POST - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados`
el body debería ser 
    `{ "nombres": "Nombres Completos", "profesion": "Profesión Empleado", "experiencia": "5 Años", "dni": 88888888 }`

Obtiene un empleado con identificador id (ID GENERADO AL CREAR EL EMPLEADO)
- `GET - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados/{id}`

Actualiza información de empleado con identificador id (ID GENERADO AL CREAR EL EMPLEADO)
- `PUT - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados/{id}`
el body debería ser 
    `{ "nombres": "Nombres Completos", "profesion": "Profesión Empleado", "experiencia": "5 Años", "dni": 88888888 }`

Elimina información de empleado con identificador id (ID GENERADO AL CREAR EL EMPLEADO)
- `DELETE - https://m4abt665f1.execute-api.us-east-1.amazonaws.com/dev/empleados/{id}`

## Contribución

Las solicitudes de pull para mejorar la integración con SWAPI son bienvenidas.
