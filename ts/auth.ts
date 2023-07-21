import {
    IsEmail,
    IsString,
    IsNotEmpty
  } from "class-validator";
  
  import { Expose } from "class-transformer";
  
  /* 
  
      {
          "email": "correo@correo.com", -> String
          "password": 12345 -> Number
      }
  */
  
  export class auth {
    @Expose()
    @IsEmail({}, { message: 'El correo no es válido' })
    @IsNotEmpty({ message: 'El campo email no puede estar vacío' })
    email: string;
  
    @Expose()
    @IsNotEmpty({ message: 'El campo password no puede estar vacío' })
    @IsString({ message: 'El campo password debe ser un string' })
    password: string;
  }