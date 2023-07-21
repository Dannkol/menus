import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import { platillos } from "../DTO/platillos.js";

const platillosDTO = async (req, res, next) => {

    const validaciones = plainToClass(platillos, req.body, {
      excludeExtraneousValues: true,
    });

    const errors_msg = [];
  
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
  
  export default platillosDTO;
  