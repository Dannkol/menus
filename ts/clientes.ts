import {
    IsEmail,
    IsString,
    IsNotEmpty,
    IsInt
  } from "class-validator";
  
import { Expose } from "class-transformer";

  
  /* 
  
    {
        "email" : "correo@correo.com",
        "password" : "dew223",
        "metodo_pago" : 3,
        "nombre" : "Daniel",
        "direccion" : "Giron, Barrio el poblado #74-58",
        "tel" : "3194xxxxx"
    }
  */
  
  export class clientes {
    @Expose()
    @IsEmail({}, { message: 'El correo no es válido' })
    @IsNotEmpty({ message: 'El campo email no puede estar vacío' })
    email: string;
  
    @Expose()
    @IsNotEmpty({ message: 'El campo password no puede estar vacío' })
    @IsString({ message: 'El campo password debe ser un string' })
    password: string;

    @Expose()
    @IsNotEmpty({ message: 'El campo metodo_pago no puede estar vacío' })
    @IsInt({ message: 'El campo metodo_pago debe ser un numero' })
    metodo_pago: number;

    @Expose()
    @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
    @IsString({ message: 'El campo nombre debe ser un string' })
    nombre: string;

    @Expose()
    @IsNotEmpty({ message: 'El campo direccion no puede estar vacío' })
    @IsString({ message: 'El campo direccion debe ser un string' })
    direccion: string;

    @Expose()
    @IsNotEmpty({ message: 'El campo tel no puede estar vacío' })
    @IsString({ message: 'El campo tel debe ser un string' })
    tel: string;
  }