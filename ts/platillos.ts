import { IsString, IsInt , IsNotEmpty } from "class-validator";

import { Expose } from "class-transformer";

export class platillos {

  @Expose()
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
  @IsString({ message: "El campo nombre debe ser un string" })
  nombre: string;

  @Expose()
  @IsNotEmpty({ message: 'El campo descripcion no puede estar vacío' })
  @IsString({ message: "El campo descripcion debe ser un string" })
  descripcion: string;

  @Expose()
  @IsNotEmpty({ message: 'El campo precio no puede estar vacío' })
  @IsInt({ message: "El campo precio debe ser un int" })
  precio: number;


}
