import pedidos from "../models/pedidos.js";

const createPedido = async (req, res) => {
    try {
        const pedido = await pedidos.createPedido(req.user , req.body, req, res);

        res.status(200).json(pedido);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getPedidos = async (req, res) => {
    try {
        const pedido = await pedidos.getPedidos(req, req.user);

        res.status(200).json(pedido);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    createPedido,
    getPedidos
}