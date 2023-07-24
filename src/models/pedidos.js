import mysql from "mysql2/promise";

import dbConfig from "../config/dbconfig.js";

/* instacia de la conexion a la base de datos */
const getConnection = async () => {
  return await mysql.createConnection(dbConfig);
};

const authCliente = async (id, data) => {
  const connection = await getConnection();
  try {
    const query_user = `select * from clientes WHERE id = ?`;
    const [rows] = await connection.execute(query_user, [id]);

    const query_platillo = `SELECT t2.nombre , t5.telefono, t3.id FROM platillo_restaurantes_menu AS t1 
        INNER JOIN platillos AS t2 ON t1.platillo_id = t2.id
        INNER JOIN restaurantes AS t3 ON t1.restaurantes_id = t3.id
        INNER JOIN sucursal_telefonos AS t4 ON t3.sucursal = t4.sucursal_id
        INNER JOIN telefono AS t5 ON t4.telefono_id = t5.id
        WHERE t1.id = ?`;

    const [rows2] = await connection.execute(query_platillo, [
      data["platillo_menu"],
    ]);

    data["nombre"] = rows[0]["Nombre"];
    data["direccion"] = rows[0]["Direccion"];
    data["tel"] = rows[0]["Telefono_Movil"];
    data["platillo"] = rows2[0]["nombre"];
    data["telefono_restaurante"] = rows2[0]["telefono"];
    data["restaurantes_id"] = rows2[0]["id"];

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

function createWhatsAppLink(obj) {
  const {
    telefono_restaurante,
    platillo,
    direccion,
    tel,
    nombre,
    opciones,
    cantidad,
  } = obj;

  const message = `Hola, quiero ${cantidad} ${platillo} 🍔 📍${direccion} 📱${tel} ✋${nombre} por favor sin ${opciones}`;

  const encodedMessage = encodeURIComponent(message);
  const phone = telefono_restaurante.replace(/\+|\s/g, ""); // Remove '+' and white spaces from the phone number

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  return whatsappLink;
}

async function opciones(data) {
  const connection = await getConnection();
  try {
    data["opciones"] = await Promise.all(
      data["opciones"].map(async (element) => {
        let query = `SELECT t4.nombre FROM platillo_restaurantes_menu AS t1 
            INNER JOIN platillos AS t2 ON t1.platillo_id = t2.id
            INNER JOIN platillo_ingredientes AS t3 ON t2.id = t3.platillo_id
            INNER JOIN ingredientes AS t4 ON t3.ingredientes_id = t4.id
            WHERE t4.id = ?;`;
        let [rows] = await connection.execute(query, [element]);

        return await rows[0]["nombre"];
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
}

const annopedidos = async (data) => {
  const connection = await getConnection();
  try {
    const query_platillo = `SELECT t2.nombre as "nombre" , t5.telefono , t3.id FROM platillo_restaurantes_menu AS t1 
        INNER JOIN platillos AS t2 ON t1.platillo_id = t2.id
        INNER JOIN restaurantes AS t3 ON t1.restaurantes_id = t3.id
        INNER JOIN sucursal_telefonos AS t4 ON t3.sucursal = t4.sucursal_id
        INNER JOIN telefono AS t5 ON t4.telefono_id = t5.id
        WHERE t1.id = ?`;

    const [rows] = await connection.execute(query_platillo, [
      data["platillo_menu"],
    ]);

    data["platillo"] = rows[0]["nombre"];
    data["telefono_restaurante"] = rows[0]["telefono"];
    data["restaurantes_id"] = rows[0]["id"];

    if (data["opciones"]) {
      await opciones(data);
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const createPedido = async (user, data, req, res) => {
  const connection = await getConnection();
  try {

    // Objeto dependiendo si el usuario es registrado o anonimo
    let objeto = !user
      ? await annopedidos(data)
      : await authCliente(user.id, data);

    const enlaceWhatsApp = createWhatsAppLink(objeto);

    console.log(enlaceWhatsApp);

    const query_insert_pedido = `INSERT INTO pedidos(Mensaje, Metodo_pago, Cliente_id) VALUES
(?,?,?);`;

    const [row_insert_pedido] = await connection.execute(query_insert_pedido, [
      enlaceWhatsApp,
      data["metodo_pago"],
      user.id === undefined ? null : user.id,
    ]);

    const query_insert_pedido_platillo = `INSERT INTO pedidos_platillos(PedidoId, menuId, Cantidad) VALUES (?, ?, ?);`;
    await connection.execute(query_insert_pedido_platillo, [
      row_insert_pedido.insertId,
      data["platillo_menu"],
      data["cantidad"],
    ]);

    const query_insert_pedidos_restaurantes = `INSERT INTO pedidos_restaurantes(PedidoId, RestaurantesId) VALUES (?,?);`;
    await connection.execute(query_insert_pedidos_restaurantes, [
      row_insert_pedido.insertId,
      data["restaurantes_id"],
    ]);

    // guardo en las cookies el historial de los usuarios anonimos
    
    if (!user) {
      let pedidos = req.cookies.pedidos;
      if (pedidos) {
        pedidos.push(row_insert_pedido.insertId);
        res.cookie("pedidos", pedidos, { httpOnly: true });
      } else {
        const pedidos = [row_insert_pedido.insertId];
        res.cookie("pedidos", pedidos, { httpOnly: true });
      }
    }

    return {
      mensaje: "Pedido enviado al restaurante",
      whatsapp: enlaceWhatsApp,
    };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    connection.end();
  }
};

const getPedidos = async(req, user) => {
  const connection = await getConnection();
  const ids = !user ? req.cookies.pedidos : req.user.id;
  try {
    // Construir la consulta SQL con la cláusula IN y los IDs del array
    const query = !user ? `
      SELECT t1.Mensaje, t1.Created_at AS "Fecha", t2.Nombre AS "Metod_pago",
        t5.nombre AS "Restaurante", t6.nombre AS "Platilo", t6.precio * t3.Cantidad AS "Total"
      FROM pedidos AS t1 
      INNER JOIN metodo_pago AS t2 ON t1.Metodo_pago = t2.id
      INNER JOIN pedidos_platillos AS t3 ON t3.PedidoId = t1.id
      INNER JOIN platillo_restaurantes_menu AS t4 ON t4.restaurantes_id = t3.menuId
      INNER JOIN restaurantes AS t5 ON t5.id = t4.restaurantes_id
      INNER JOIN platillos AS t6 ON t6.id = t4.platillo_id
      WHERE t1.id IN (?)
    ` : `
    SELECT t1.Mensaje, t1.Created_at AS "Fecha", t2.Nombre AS "Metod_pago",
      t5.nombre AS "Restaurante", t6.nombre AS "Platilo", t6.precio * t3.Cantidad AS "Total"
    FROM pedidos AS t1 
    INNER JOIN metodo_pago AS t2 ON t1.Metodo_pago = t2.id
    INNER JOIN pedidos_platillos AS t3 ON t3.PedidoId = t1.id
    INNER JOIN platillo_restaurantes_menu AS t4 ON t4.restaurantes_id = t3.menuId
    INNER JOIN restaurantes AS t5 ON t5.id = t4.restaurantes_id
    INNER JOIN platillos AS t6 ON t6.id = t4.platillo_id
    WHERE t1.Cliente_id = ?
   ;`

    // Ejecutar la consulta con los IDs del array
    const [rows, fields] = await connection.query(query, [ids]);

    // Aquí tienes los resultados de la consulta
    return{
      mensaje : "mis pedidos",
      data : rows
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
  } finally {
    connection.end();
  }

}

export default { createPedido, getPedidos };
