import mysql from "mysql2/promise";

import dbConfig from "../config/dbconfig.js";

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const getUser = async (data) => {
  const connection = await getConnection();

  try {
    const query_user = `SELECT id, Email, Nombre , Password FROM clientes WHERE Email = ? AND Password = ?;`;

    const [result] = await connection.execute(query_user, data);

    if (!result.length) {
      return {
        id: "",
        email: "",
        nombre: "",
        password: "",
      };
    } else {
      return result[0];
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

/**
 *
{
    "email" : "correo@correo.com",
    "password" : "dew223",
    "metodo_pago" : 3,
    "nombre" : "Daniel",
    "direccion" : "Giron, Barrio el poblado #74-58",
    "tel" : "3194xxxxx"
}
 *
 */

const createUsuario = async (data) => {
  const connection = await getConnection();


  try {
    const query_cliente = `
    INSERT INTO clientes (Nombre,Password,Email,Telefono_Movil,Direccion,Metado_pago_def)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const values_query_cliente = [
      data.nombre,
      data.password,
      data.email,
      data.tel,
      data.direccion,
      data.metodo_pago
    ];

    console.log(values_query_cliente);
  
    await connection.execute(
      query_cliente,
      values_query_cliente
    );
    
    return {
      "mensaje" : "Usuario registrado"
    }
  } catch (error) {
    throw error;
  }finally{
    connection.end();
  }



};

export default { getUser , createUsuario};