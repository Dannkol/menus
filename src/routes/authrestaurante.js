import express from "express";

// Controllers

import authController from "../controllers/authRestauranteController.js";
import { getAllIngradiente , putIngradiente, getIngradiente, deleteIngradiente, createIngradiente} from '../controllers/restauranteController.js';

// Middlewareq

import authDTO from "../middleware/DTO_auth.js";
import authenticateToken from "../middleware/JWT.js";
import ingredienteDTO from '../middleware/DTO_ingredientes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})

// {
//     "email" : "devjgi@gmail.com",
//     "password" : "12345"
// }

router.post("/auth/restaurante", authDTO , authController);

// CRUD ingredientes

router.get('/auth/restaurante/menu/ingredientes', authenticateToken , getAllIngradiente );
router.post('/auth/restaurante/menu/ingredientes', authenticateToken , ingredienteDTO ,createIngradiente );
router.put('/auth/restaurante/menu/ingredientes/:id', authenticateToken , ingredienteDTO ,putIngradiente );
router.get('/auth/restaurante/menu/ingredientes/:id', authenticateToken , ingredienteDTO ,getIngradiente );
router.delete('/auth/restaurante/menu/ingredientes/:id', authenticateToken , ingredienteDTO ,deleteIngradiente );





export default router;