import mysql from "mysql2/promise";

import dbConfig from "../config/dbconfig.js";

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const getAllIngradiente = async (data) => {
  const connection = await getConnection();

  try {
    const query_user = `SELECT Nombre FROM ingredientes;`;

    const [result] = await connection.execute(query_user);
    
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const putIngradiente = async (data , id) => {
  const connection = await getConnection();

  try {

    const query_user = `UPDATE ingredientes SET nombre = ? WHERE id = ?;`;

    await connection.execute(query_user, [data[0], id]);
    
    return {
      "nombre" : "Ingrediente actualizados"
  };

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const getIngradiente = async (id) => {
  const connection = await getConnection();

  try {

    const query_user = `Select Nombre from ingredientes WHERE id = ?;`;

    const [result] = await connection.execute(query_user, [id]);
    
    return result;

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const deleteIngradiente = async (id) => {
  const connection = await getConnection();

  try {

    const query_user = `DELETE FROM ingredientes WHERE id = ? ;`;

    await connection.execute(query_user, [id]);
    
    return {
      "nombre" : "Ingrediente Eliminado"
  };

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const createIngradiente = async (data) => {
  const connection = await getConnection();

  try {

    const query_user = `INSERT INTO ingredientes(nombre) VALUES(?);`;

    await connection.execute(query_user,[ data['nombre']]);
    
    return {
      "nombre" : "Ingredientes agregado"
  };

  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};


export default { getAllIngradiente , putIngradiente, getIngradiente, deleteIngradiente, createIngradiente };