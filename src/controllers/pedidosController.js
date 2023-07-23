import pedidos from "../models/pedidos.js";

const createPedido = async (req, res) => {
    try {

        const pedido = await pedidos.createPedido(req.user , req.body);

        res.status(200).json(pedido);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    createPedido
}