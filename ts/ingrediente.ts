import { IsString, IsInt , IsNotEmpty } from "class-validator";

import { Expose } from "class-transformer";

export class ingrediente {

  @Expose()
  @IsString({ message: "El campo nombre debe ser un string" })
  nombre: string;

}
