import express from "express";

// controllers

import { createPedido, getPedidos } from "../controllers/pedidosController.js"

// middleware
import UserToken from "../middleware/JWT_pedidos.js";
import pedidosDTO from "../middleware/DTO_pedidos.js";

const router = express.Router();



// crear un pedido del usuario
router.post('/', UserToken , pedidosDTO , createPedido )

// traer todos los pedidos de un usuario

router.get('/', UserToken, getPedidos)


export default router;
