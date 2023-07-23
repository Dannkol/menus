import { IsInt , IsNotEmpty } from "class-validator";

import { Expose } from "class-transformer";

export class pedidos {

  @Expose()
  @IsNotEmpty({ message: 'El campo platillo_menu no puede estar vacío' })
  @IsInt({ message: "El campo platillo_menu debe ser un int" })
  platillo_menu: number;

  @Expose()
  @IsNotEmpty({ message: 'El campo cantidad no puede estar vacío' })
  @IsInt({ message: "El campo cantidad debe ser un int" })
  cantidad: number;

  @Expose()
  @IsNotEmpty({ message: 'El campo metodo_pago no puede estar vacío' })
  @IsInt({ message: "El campo metodo_pago debe ser un int" })
  metodo_pago: number;

}
