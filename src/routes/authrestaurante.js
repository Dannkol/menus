import express from "express";

// Controllers

import authController from "../controllers/authRestauranteController.js";
import { getAllIngradiente , putIngradiente, getIngradiente, deleteIngradiente, createIngradiente} from '../controllers/restauranteController.js';

// Middlewareq

import authDTO from "../middleware/DTO_auth.js";
import authenticateToken from "../middleware/JWT.js";

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
router.post('/auth/restaurante/menu/ingredientes', authenticateToken , createIngradiente );
router.put('/auth/restaurante/menu/ingredientes/:id', authenticateToken , putIngradiente );
router.get('/auth/restaurante/menu/ingredientes/:id', authenticateToken , getIngradiente );
router.delete('/auth/restaurante/menu/ingredientes/:id', authenticateToken , deleteIngradiente );





export default router;