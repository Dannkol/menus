import { IsString, IsInt , IsNotEmpty } from "class-validator";

import { Expose } from "class-transformer";

export class annopedidos {

  @Expose()
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
  @IsString({ message: "El campo nombre debe ser un string" })
  nombre: string;

  @Expose()
  @IsNotEmpty({ message: 'El campo direccion no puede estar vacío' })
  @IsString({ message: "El campo direccion debe ser un string" })
  direccion: string;
  
  @Expose()
  @IsNotEmpty({ message: 'El campo tel no puede estar vacío' })
  @IsString({ message: "El campo tel debe ser un string" })
  tel: string;
  
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
