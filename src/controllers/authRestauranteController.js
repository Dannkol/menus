import jwt from 'jsonwebtoken';

import users from "../models/restuarante.js";
import jwtconfig from '../config/jwtconfig.js';

const authorization = async (req, res) => {
  const secretKey = jwtconfig.secret_key;

  try {

    const user = await users.getUser(Object.values(req.body));

    const auth = user.Email === req.body['email'] && user.Password == req.body['password'];

    console.log(user)
    if (!auth) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    } else {
      // Generar el token JWT
      const token = jwt.sign({ id: user.id, nombre: user.Nombre , rol: req.rol }, secretKey, {
        expiresIn: "1h",
      });

      // Responder con el token
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
    console.log(error);
  }
};

export default authorization ;