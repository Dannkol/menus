
# Menus para restautantes

Proyecto para campus, una plataforma donde los restautantes puedan crear sus menus y sus comensales, puedan realizar pedidos, todo atraves de la api de whatsapp

ejemplo para el mensaje

Hola, quiero una hamburguesa 🍔
📍Giron, Barrio el poblado #74-58
📱3194xxxxx
✋Luis Fernando
<link__>
por favor sin cebolla, salsa piña

#### link de whatsapp

```https

https://api.whatsapp.com/send?phone=573173420342&text=Hola%20estoy%20quiero%20una%20hamburguesa%20%F0%9F%8D%94%0A%F0%9F%93%8DGiron%2C%20Barrio%20el%20poblado%20%2374-58%0A%F0%9F%93%B13194xxxxx%0A%E2%9C%8BLuis%20Fernando%0A%3Clink__%3E%0Apor%20favor%20sin%20cebolla%2C%20salsa%20pi%C3%B1a

```

# Objetivos

### Objetivo general

Crear un backend para la aplicacion, que permina a restautantes crear sus menus y a sus clientes realizar sus pedidos por medio de whatsapp

### Objetivos Especificos

* Craer el diagrama MER de la base de datos
* Connectar el backend con la api de whatsapp
* Crear plantilla para el envio de los mensajes
* Especificar las rutas de la aplicacion
* Configurar autenticación por JWT
* Craer un sistema para que los restaurantes creen sus propios menus
* Crear validaciones para las entradas de datos


## Navegabilidad

### Restaurantes
 
 * Crear ingredientes
 * Crea platillos y los relaciona con los ingredientes
 * Relaciona los platillos con el mismo, esto crea los menus

### Clientes
 
 * Puede estar registrado o ser anonimo
 * Consulta los platillos y sus ingredientes
 * Crea un nuevo pedido
 * Digita su info con el pedido o esta se agg automaticamente si el clientes ya esta registrado
 * Se asocia el pedido con el cliente, el restaurante y el menu
 * El cliente recibe un link de whatsapp con un mensaje personalizado
 * Usa el link para confirmar su pedido con el restaurante


## Diagrama MER

<img src="./doc/Diagrama_en_MER_Restaurantes.png" alt="Diagrama">

## Run Locally

Clona el repositorio

```bash
  git clone https://github.com/Dannkol/menus.git
```

ve al directorio

```bash
  cd menus
```

Instala las dependencias

```bash
  npm install
```

Inicializa el servidor de desarrollo

```bash
  npm run dev
```

crea la base de datos con el archivo database.sql, este se encuentra en la carpeta db, tambien puedes usar el script phpmyadmin.sql, este es el script generado por phpmyadmin contiene la data minima necesaria para el buen funcionamiento de la aplicacion.

#### NOTA: NO OLVIDES CAMBIAR LAS VARIABLES DE ENTORNO A TUS NECESIDADES


## 🛠 Tecnologias
Node, Express, Mysql

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://dannkol.github.io/portafolios/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-manosalva-000b98242)


## API Reference


## Authentication

Dependiendo del rol tienes Ciertos permisos en algunas tablas

### Authentication Restaurantes

```http
GET /api/auth/restaurante/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

Request

```json
{
    "email" : "devjgi@gmail.com",
    "password" : "12345"
}
```

Responde

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoicGVwZXMiLCJyb2wiOiJyZXN0YXVyYW50ZSIsImlhdCI6MTY5MDE2NDg2NiwiZXhwIjoxNjkwMTY4NDY2fQ.5ua59hXVduEpwrJLlh57EFi3IZnh3inH6JhN8Q-Zm3g"
}
```

### Authentication Clientes

```http
GET /api/auth/restaurante/
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |

Request

```json
{
    "email" : "clinete@correo.com",
    "password" : "123a45"
}
```

Responde

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoicGVwZXMiLCJyb2wiOiJyZXN0YXVyYW50ZSIsImlhdCI6MTY5MDE2NDg2NiwiZXhwIjoxNjkwMTY4NDY2fQ.5ua59hXVduEpwrJLlh57EFi3IZnh3inH6JhN8Q-Zm3g"
}
```



## Restaurantes

Cada Restaurante tiene su propio menu, pueden realizar todas las acciones de un CRUD

#### Get all platillos (Menus)


```http
GET /api/auth/restaurante/menu
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

Responde 

```json
{
    "mensaje" : "Menu del restaurante 1",
    "data" : [
        {
            "nombre" : "pasta con carne",
            "precio" : 12.000,
            "descripcion" : "pastas con carne y sabor a verduras"
        },
        {
            "nombre" : "pasta con verduras",
            "precio" : 10.000,
            "descripcion" : "pastas con verduras"
        },
    ]
}
```

### Crear platillos y menus

#### CRUD ingredientes 

#### Get ingredientes

```http
GET /api/auth/restaurante/menu/ingredientes
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |

Responde

```json
{
    "mensaje" : "Ingredientes",
    "data" : [
        {
            "nombre" : "Tomate"
        },
        {
            "nombre" : "Tomate grille"
        }
    ]
}
```

#### Post ingredientes

```http
POST /api/auth/restaurante/menu/ingredientes
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |
| `nombre`  | `string` | **Required** |

Request

```json
{
    "nombre" : "tomate"
}
```

Responde

```json
{
    "nombre" : "Ingredientes agregado"
}
```

#### Put ingredientes para uctualizar ingredientes

```http
PUT /api/auth/restaurante/menu/ingredientes/{id}
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `id`      | `number` | **Required**.  |
| `api_key`      | `string` | **Required**.  |
| `nombre`  | `string` | **Required** |

Request

```json
{
    "nombre" : "tomate grill"
}
```

Responde

```json
{
    "nombre" : "Ingrediente actualizados"
}
```

#### Delete ingredientes para uctualizar ingredientes

```http
DELETE /api/auth/restaurante/menu/ingredientes/{id}
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `id`      | `number` | **Required**.  |
| `api_key`      | `string` | **Required**.  |

Responde

```json
{
    "nombre" : "Ingrediente Eliminado"
}
```

### CRUD Platillo

#### Get platilos

```http
GET /api/auth/restaurante/menu
```
| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |

pormedio del api_key se trae el platillo del restaurante

Responde

```json
{
    "mensaje" : "Platillos",
    "data" : [
        {
            "nombre" : "papas fritas",
            "precio" : 3.000,
            "descripcion" : "papas fritas de las calles"  
        },
        {
            "nombre" : "pasta",
            "precio" : 12.000,
            "descripcion" : "pasta boloñesa" 
        }
    ]
}
```

#### Post platilos crea nuevos menus

```http
POST /api/auth/restaurante/menu
```
pormedio del api_key se oscia el platillo al restaurante

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |
| `nombre` | `string`| **Required** |
| `precio` | `number`| **Required** |
| `descripcion` | `string`| **Required** |
| `slug` | `string`| nombre + random_number |
| `ingredientes` | `array` | **Required** |


Request

```json
{
    "nombre" : "papas fritas",
    "precio" : 3.000,
    "descripcion" : "papas fritas de las calles",
    "ingredientes" : [
        1,2
    ],// array con los id de los ingredientes 
}
```

Responde

```json
{
    "mensaje" : "Platillo creado"
}

```
#### Put platilos

```http
PUT /api/auth/restaurante/menu/{id}
```
| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |
| `id`      | `numbre` | **Required**.  |
| `nombre` | `string`| **Required** |
| `precio` | `number`| **Required** |
| `descripcion` | `string`| **Required** |
| `slug` | `string`| nombre + random_number |
| `ingredientes` | `array` | **Required** |

Request

```json
{
    "nombre" : "papas fritas",
    "precio" : 3.000,
    "descripcion" : "papas fritas de las calles"
}
```

Responde

```json
{
    "mensaje" : "Platillo actualizado"
}
```

### Put ingredientes de un platillo

```http
PUT /auth/restaurante/menu/:platillo/ingrediente/:ingredientes
```
| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |
| `platillo` | `number` | **Required**.  |
| `ingredientes` | `number` | **Required**.  |

Request

params: id del platillo y el ingrediente a actualizar

Body el id del ingrediente actualizado
```json
{
  "ingrediente" : 1
}

```

Responde 

```json
{
  "mensaje": "Ingredientes actualizados"
}
```

#### Delete platillo

```http
DELETE /api/auth/restaurante/menu/{id}
```
| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key`      | `string` | **Required**.  |
| `id` | `string` | **Required**.  |


Responde
```json
{
    "mensaje" : "Platillo eliminado"
}
```

## Cientes

los clientes pueden realizar pedidos, estos pueden estar registrados o ser ananonimos, al realizar un pedido, este se relaciona al usuario si esta logueado y tambien se relaciona al restaurante sin importar si esta logueado o no


#### Post realizar un pedido

```http
POST /api/pedidos
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `api_key` | `string` | **Opcional**  |
| `platillo` | `number` | **Required**. |
| `cantidad` | `number` | **Required**. |
| `metodo_pago` | `number` | **Required**. |
| `nombre` | `string` | **Opcional**  |
| `direccion` | `string` | **Opcional**  |
| `tel` | `string` | **Opcional**  |
| `opciones` | `array` | **Opcional**  |


por medio del platillo se sabe a que restaurante esta asosiado y de esta manera se asosia el pedido a un restaurante

#### Usuario ya registrado

En caso dee que el usuario ya este registrado, se usara su info para crear el link de whatsapp.

Request

```json
{
    "platillo" : 1,
    "cantidad" : 2,
    "metodo_pago" : 2
}
```
#### Usuario no registrado

Request

```json
{
    "platillo_menu" : 1,
    "cantidad" : 2,
    "metodo_pago" : 2,
    "nombre" : "Daniel",
    "direccion" : "Giron, Barrio el poblado #74-58",
    "tel" : "3194xxxxx",
    "opciones" : [ 1, 2] // los ingredientes que no quiere en el pedido
}
```

Responde

```json
{

    "mensaje" : "Pedido enviado al restaurante",
    "whatsapp" : "https://api.whatsapp.com/send?phone=573173420342&text=Hola%20estoy%20quiero%20una%20hamburguesa%20%F0%9F%8D%94%0A%F0%9F%93%8DGiron%2C%20Barrio%20el%20poblado%20%2374-58%0A%F0%9F%93%B13194xxxxx%0A%E2%9C%8BLuis%20Fernando%0A%3Clink__%3E%0Apor%20favor%20sin%20cebolla%2C%20salsa%20pi%C3%B1a"

}
```

#### Post Creacion de un usuario

con este endpoint se pueden registrar los usuario

```http
POST /api/usuario/login
```
| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `email` | `string` | **Required**. |
| `password` | `string` | **Required**. |
| `metodo_pago` | `number` | **Required**. |
| `nombre` | `string` | **Required**  |
| `direccion` | `string` | **Required**  |
| `tel` | `string` | **Required**  |

Request 

```json
{
    "email" : "correo@correo.com",
    "password" : "dew223",
    "metodo_pago" : 1, // id del metodo de pago a usar
    "nombre" : "Daniel",
    "direccion" : "Giron, Barrio el poblado #74-58",
    "tel" : "3194xxxxx"
}
```

Responde

```json
{
    "mensaje" : "Usuario registrado"
}
```

## Endpoints Publicos

Estos endpoint tienen el fin de ser parte esencial de la navegacion de los usuarios ( clientes )

### Get All platillos

```http
GET /api/restaurante/menu/public
```

Responde

```json
{
  "mensaje": "Menu de los restaurante",
  "data": [
    {
      "menu": 1,
      "restaurante": "pepes",
      "restaurante_id": 1,
      "platillo": "papas saladas sin sal",
      "platillo_id": 1,
      "descripcion": "papas fritas de las calles",
      "precio": "34.00",
      "slug": "papas418"
    },
    {
      "menu": 3,
      "restaurante": "pepes",
      "restaurante_id": 1,
      "platillo": "pastas carno",
      "platillo_id": 3,
      "descripcion": "pres",
      "precio": "3.00",
      "slug": "pastas_carno778"
    }
  ]
}
```


### Get All ingredientes del platillo

```http
GET /api/restaurante/menu/ingredientes/public/:id
```

| Parameter | Type     | Description |
| :-------- | :------- | :------------ |
| `:id` | `number` | **Required**. |

Responde

```json
[
  {
    "id": 1,
    "Nombre": "tomate grille"
  },
  {
    "id": 2,
    "Nombre": "Pasta"
  }
]
```