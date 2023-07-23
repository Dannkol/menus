import dotenv  from "dotenv"
import express  from "express";
//Modulos propios
import configureApp from "./src/config/express.js";

// Rutas
import routes_auth_clientes from './src/routes/authcliente.js';
import routes_auth_restaurante from './src/routes/authrestaurante.js';
import routes_pedidos from './src/routes/pedidos.js'

dotenv.config()

const app = express();

// Configurar la aplicación Express
configureApp(app);


// Definir las rutas
app.use('/api',routes_auth_clientes);
app.use('/api',routes_auth_restaurante);
app.use('/api/pedidos',routes_pedidos);




// Variables de entorno
const PORT = process.env.PORT || 8080;



//Get all employees from the database


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })