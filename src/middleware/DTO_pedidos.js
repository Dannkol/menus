import { plainToClass } from "class-transformer";
import { validateOrReject , validate} from "class-validator";
import { pedidos } from "../DTO/pedidos.js";
import { annopedidos } from "../DTO/annopedidos.js";

const pedidosDTO = async (req, res, next) => {

  const validaciones = !req.user
    ? 
    plainToClass(annopedidos, req.body)
    
    : plainToClass(pedidos, req.body);

  

  const errors_msg = await validate(validaciones, { skipMissingProperties: true });

  try {
    await validateOrReject(validaciones);
    next();
  } catch (errors) {
    for (const error of errors) {
      errors_msg.push({
        property: error.property,
        constraints: error.constraints,
      });
    }
    return res.status(400).json({ errors: errors_msg });
  }
};

export default pedidosDTO;
