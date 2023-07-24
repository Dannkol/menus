import platillos from "../models/platillos.js";

const getAllPlatillos = async (req, res) => {
  try {
    const result = await platillos.getAllPlatillos(req);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al traer los platillos" });
  }
};

const getAllPlatillospublic = async (req, res) => {
  try {
    const result = await platillos.getAllPlatillospublic();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al traer los platillos" });
  }
};

const actualizaringredientes = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params;

    const result = await platillos.actualizaringredientes(data, id);

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar los ingredientes de un platillo" });
  }
};

const putPlatillos = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const result = await platillos.putPlatillos(req, data, id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar platillos" });
  }
};

const getPlatillos = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await platillos.getPlatillos(id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al encontrar un platillos" });
  }
};

const deletePlatillos = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await platillos.deletePlatillos(req, id);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al borrar el platillos" });
  }
};

const createPlatillos = async (req, res) => {
  try {
    const data = req.body;

    const result = await platillos.createPlatillos(req, data);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear platillos" });
  }
};

export {
  getAllPlatillos,
  putPlatillos,
  getPlatillos,
  deletePlatillos,
  createPlatillos,
  actualizaringredientes,
  getAllPlatillospublic
};
