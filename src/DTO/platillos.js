var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsString, IsInt, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";
export class platillos {
}
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo nombre no puede estar vacío' }),
    IsString({ message: "El campo nombre debe ser un string" })
], platillos.prototype, "nombre", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo descripcion no puede estar vacío' }),
    IsString({ message: "El campo descripcion debe ser un string" })
], platillos.prototype, "descripcion", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo precio no puede estar vacío' }),
    IsInt({ message: "El campo precio debe ser un int" })
], platillos.prototype, "precio", void 0);
