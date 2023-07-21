var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsString, IsNotEmpty, IsInt } from "class-validator";
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
}
__decorate([
    Expose(),
    IsEmail({}, { message: 'El correo no es válido' }),
    IsNotEmpty({ message: 'El campo email no puede estar vacío' })
], clientes.prototype, "email", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo password no puede estar vacío' }),
    IsString({ message: 'El campo password debe ser un string' })
], clientes.prototype, "password", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo metodo_pago no puede estar vacío' }),
    IsInt({ message: 'El campo metodo_pago debe ser un numero' })
], clientes.prototype, "metodo_pago", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo nombre no puede estar vacío' }),
    IsString({ message: 'El campo nombre debe ser un string' })
], clientes.prototype, "nombre", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo direccion no puede estar vacío' }),
    IsString({ message: 'El campo direccion debe ser un string' })
], clientes.prototype, "direccion", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo tel no puede estar vacío' }),
    IsString({ message: 'El campo tel debe ser un string' })
], clientes.prototype, "tel", void 0);
