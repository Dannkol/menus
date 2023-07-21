import users from "../models/clientes.js";

const crearUsuario = async (req, res) => {
    try {
      const data = req.body;

      const result = await users.createUsuario(data);
  
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear cliente" });
    }
};


export {crearUsuario};