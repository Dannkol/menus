import ingredientes from "../models/ingredientes.js";

const getAllIngradiente = async (req, res) => {
  try {
    const data = req.body;

    const result = await ingredientes.getAllIngradiente(data);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al traer los ingredientes" });
  }
};

const getAllIngradientePublic = async (req, res) => {
  try {
    const data = req.params.id;

    const result = await ingredientes.getAllIngradientePublic(data);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al traer los ingredientes" });
  }
};

const putIngradiente = async (req, res) => {
  try {
    const data = Object.values(req.body);
    const id = req.params.id;

    const result = await ingredientes.putIngradiente(data, id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar ingredientes" });
  }
};

const getIngradiente = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await ingredientes.getIngradiente(id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al encontrar un ingrediente" });
  }
};

const deleteIngradiente = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await ingredientes.deleteIngradiente(id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al borrar el ingrediente" });
  }
};

const createIngradiente = async (req, res) => {
  try {
    const data = req.body;

    const result = await ingredientes.createIngradiente(data);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear ingrediente" });
  }
};

export {
  getAllIngradiente,
  getAllIngradientePublic,
  putIngradiente,
  getIngradiente,
  deleteIngradiente,
  createIngradiente,
};
