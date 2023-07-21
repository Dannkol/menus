import express from "express";

// Controllers

import authController from "../controllers/authRestauranteController.js";

// Middlewareq

import authDTO from "../middleware/DTO_auth.js";

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


export default router;