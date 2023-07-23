import express from "express";

// controllers

import { createPedido } from "../controllers/pedidosController.js"

// middleware
import UserToken from "../middleware/JWT_pedidos.js";
import pedidosDTO from "../middleware/DTO_pedidos.js";

const router = express.Router();



// Traer todos los pedidos del usuario
router.post('/', UserToken , pedidosDTO , createPedido )



export default router;
