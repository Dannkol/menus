var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsInt, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";
export class pedidos {
}
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo platillo_menu no puede estar vacío' }),
    IsInt({ message: "El campo platillo_menu debe ser un int" })
], pedidos.prototype, "platillo_menu", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo cantidad no puede estar vacío' }),
    IsInt({ message: "El campo cantidad debe ser un int" })
], pedidos.prototype, "cantidad", void 0);
__decorate([
    Expose(),
    IsNotEmpty({ message: 'El campo metodo_pago no puede estar vacío' }),
    IsInt({ message: "El campo metodo_pago debe ser un int" })
], pedidos.prototype, "metodo_pago", void 0);
