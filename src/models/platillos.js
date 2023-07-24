import mysql from "mysql2/promise";

import dbConfig from "../config/dbconfig.js";

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const getAllPlatillos = async (req) => {
  const connection = await getConnection();

  try {
    const query_user = `SELECT t1.id , nombre , descripcion, precio, slug FROM platillo_restaurantes_menu AS t1 
        INNER JOIN platillos AS t2 ON t2.id = t1.platillo_id
        WHERE restaurantes_id = ?;`;

    const [result] = await connection.execute(query_user, [req.user.id]);

    return {
      mensaje: "Menu del restaurante 1",
      data: result,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};


const getAllPlatillospublic = async (req) => {
  const connection = await getConnection();

  try {
    const query_user = `SELECT t1.id AS "menu", t3.nombre AS "restaurante", t1.restaurantes_id as "restaurante_id", t2.nombre AS "platillo", t1.platillo_id AS "platillo_id" , descripcion, precio, t2.slug FROM platillo_restaurantes_menu AS t1 
        INNER JOIN platillos AS t2 ON t2.id = t1.platillo_id
        INNER JOIN restaurantes AS t3 ON t3.id = t1.restaurantes_id;`;

    const [result] = await connection.execute(query_user);

    return {
      mensaje: "Menu de los restaurante",
      data: result,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const actualizaringredientes = async (data, id) => {
  const conexion = await getConnection();
  try {
    const actualizado = `UPDATE platillo_ingredientes SET ingredientes_id = ? WHERE platillo_id = ? AND ingredientes_id = ?`;
    await conexion.execute(actualizado, [data['ingrediente'], id.platillo, id.ingredientes]);

    return {
      mensaje: "Ingredientes actualizados",
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conexion.end();
  }
};

const putPlatillos = async (req, data, id) => {
  const connection = await getConnection();
  try {
    let query = `UPDATE platillos SET `;
    const values = [];

    // Construir la consulta dinámicamente patch
    Object.entries(data).forEach(([key, value], index) => {
      query += `${key} = ?`;
      values.push(value);

      if (index < Object.entries(data).length - 1) {
        query += ", ";
      }
    });

    query += ` WHERE id = ?;`;
    values.push(id);

    const [result] = await connection.execute(query, values);

    if (result.affectedRows > 0) {
      return {
        mensaje: "Platillo actualizado",
      };
    } else {
      return {
        mensaje: "Platillo no existe",
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const getPlatillos = async (id) => {
  const connection = await getConnection();

  try {
    const query_user = `Select nombre , descripcion, precio, slug from platillos WHERE id = ?;`;

    const [result] = await connection.execute(query_user, [id]);

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const deletePlatillos = async (req, id) => {
  const connection = await getConnection();

  try {
    const query_platillo_restaurant = `DELETE FROM platillo_restaurantes_menu WHERE platillo_id = ? AND restaurantes_id = ? ;`;
    await connection.execute(query_platillo_restaurant, [id, req.user.id]);

    const query_user = `DELETE FROM platillos WHERE id = ? ;`;
    await connection.execute(query_user, [id]);

    return {
      nombre: "Platillos Eliminado",
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const createPlatillos = async (req, data) => {
  const connection = await getConnection();

  try {
    const query_user = `INSERT INTO platillos(nombre,descripcion,precio,Slug) VALUES( ?, ?, ?, ? );`;

    const [platillo] = await connection.execute(query_user, [
      data["nombre"],
      data["descripcion"],
      data["precio"],
      data["slug"]
        ? data["slug"]
        : data["nombre"].replace(/ /g, "_") + parseInt(Math.random() * 1000),
    ]);

    const query_platillo_restaurant = `INSERT INTO platillo_restaurantes_menu(platillo_id, restaurantes_id) VALUES( ?, ?);`;

    await connection.execute(query_platillo_restaurant, [
      platillo.insertId,
      req.user.id,
    ]);

    data["ingredientes"].forEach(async (item) => {
      const query_platillo_ingredientes = `INSERT INTO platillo_ingredientes(platillo_id, ingredientes_id) VALUES(?,?);`;
      await connection.execute(query_platillo_ingredientes, [
        platillo.insertId,
        item,
      ]);
    });

    return {
      mensaje: "Platillo creado",
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

export default {
  getAllPlatillos,
  putPlatillos,
  getPlatillos,
  deletePlatillos,
  createPlatillos,
  actualizaringredientes,
  getAllPlatillospublic
};
