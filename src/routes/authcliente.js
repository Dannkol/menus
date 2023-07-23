import express from "express";

// Controllers

import authController from "../controllers/authClientesController.js";
import { crearUsuario } from "../controllers/clientesControllers.js";

// Middlewareq

import authDTO from "../middleware/DTO_auth.js";
import clientesDTO from "../middleware/DTO__cliente.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// {
//     "email" : "devjgi@gmail.com",
//     "password" : "12345"
// }

router.post(
  "/auth",
  (req, res, next) => {
    req.rol = "cliente";
    authDTO(req, res, next);
  },
  authController
);

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

router.post("/usuario/login", clientesDTO, crearUsuario);

export default router;
