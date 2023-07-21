var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsEmail, IsString, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";
/*

    {
        "email": "correo@correo.com", -> String
        "password": 12345 -> Number
    }
*/
export class auth {
}
__decorate([
    Expose(),
    IsEmail({}, { message: 'El correo no es válido' }),
    IsNotEmpty({ message: 'El campo email no puede estar vacío' })
], auth.prototype, "email", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo password no puede estar vacío' }),
    IsString({ message: 'El campo password debe ser un string' })
], auth.prototype, "password", void 0);
