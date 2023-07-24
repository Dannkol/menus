import pedidos from "../models/pedidos.js";

const createPedido = async (req, res) => {
    try {
        const pedido = await pedidos.createPedido(req.user , req.body, req, res);

        res.status(200).json(pedido);

    } catch (error) {
        res.status(500).json(`Error en la creacion del pedido: ${error.errno}`);
        res.end();
        console.log(error);
    }
}

const getPedidos = async (req, res) => {
    try {
        const pedido = await pedidos.getPedidos(req, req.user);

        res.status(200).json(pedido);

    } catch (error) {
        res.status(500).json(`Error: ${error.errno}`);
        res.end();
        console.log(error);

    }
}

export {
    createPedido,
    getPedidos
}