
DROP DATABASE IF EXISTS `restaurantes_menus_api`;

CREATE DATABASE `restaurantes_menus_api`;


USE restaurantes_menus_api;

CREATE TABLE `ingredientes` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(15) NOT NULL
);

CREATE TABLE `platillos` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `descripcion` varchar(50) NOT NULL,
    `precio` decimal(10,2) NOT NULL,
    `Slug` VARCHAR(100) NOT NULL
);



CREATE TABLE `Platillo_Ingredientes` (
    `platillo_id` int(11) NOT NULL,
    `ingredientes_id` int(11) NOT NULL,
    PRIMARY KEY (`platillo_id`,`ingredientes_id`),
    CONSTRAINT `fk_platillo_ingredientes`
    FOREIGN KEY (`platillo_id`) REFERENCES `platillos` (`id`),
    CONSTRAINT `fk_ingredientes_platillo`
    FOREIGN KEY (`ingredientes_id`) REFERENCES `ingredientes` (`id`)
);

CREATE TABLE `Telefono` (
    `id` INT(11) NOT NULL PRIMARY KEY,
    `telefono` VARCHAR(50) NOT NULL
);


CREATE TABLE `Sucursales` (
    `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `direccion` VARCHAR(50) DEFAULT 'VIRTUAL'
);

CREATE TABLE `Sucursal_Telefonos` (
    `telefono_id` INT(11) NOT NULL,
    `sucursal_id` INT(11) NOT NULL,

    CONSTRAINT `fk_telefono_sucursales`
    FOREIGN KEY (`telefono_id`) REFERENCES `Telefono` (`id`),

    CONSTRAINT `fk_sucursal_telefonos`
    FOREIGN KEY (`sucursal_id`) REFERENCES `Sucursales` (`id`)
);

CREATE TABLE `Restaurantes` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `sucursal` INT(11) NOT NULL,
    `Slug` VARCHAR(150) NOT NULL,
    `NIT` BIGINT NOT NULL,

    CONSTRAINT `fk_sucursal`
    FOREIGN KEY (`sucursal`) REFERENCES `Sucursales` (`id`)
);

CREATE TABLE `Platillo_Restaurantes_menu` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `platillo_id` int(11) NOT NULL,
    `restaurantes_id` int(11) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`,`platillo_id`,`restaurantes_id`),
    CONSTRAINT `fk_platillo_restaurantes`
    FOREIGN KEY (`platillo_id`) REFERENCES `platillos` (`id`),
    CONSTRAINT `fk_restaurantes_platillo`
    FOREIGN KEY (`restaurantes_id`) REFERENCES `Restaurantes` (`id`)
);

-- Metodo de pago

CREATE TABLE `Metodo_pago`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` varchar(150) NOT NULL,
    `Abreviacion` varchar(50) NOT NULL
);

-- Clientes

CREATE TABLE `Clientes`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` varchar(50) NOT NULL,
    `Password` varchar(15) NOT NULL UNIQUE,
    `Email` varchar(150) NOT NULL,
    `Telefono_Movil` varchar(15) NOT NULL,
    `Direccion` varchar(150) NOT NULL,
    `Metado_pago_def` INT(11) NOT NULL,
    CONSTRAINT `fk_metodo_pago_def`
    FOREIGN KEY (`Metado_pago_def`) REFERENCES `Metodo_pago` (`id`)
);


-- Pedidos

CREATE TABLE `Pedidos`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Mensaje` VARCHAR(255) NOT NULL,
    `Created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Metodo_pago` INT(11) NOT NULL,
    `Cliente_id` INT(11) NULL,

    CONSTRAINT `fk_Cliente_pedido` 
    FOREIGN KEY (`Cliente_id`) REFERENCES `Clientes` (`id`),

    CONSTRAINT `fk_Metodo_pago_pedido`
    FOREIGN KEY (`Metodo_pago`) REFERENCES `Metodo_pago` (`id`)
);



CREATE TABLE `Pedidos_Restaurantes`(
    `PedidoId` int(11) NOT NULL,
    `RestaurantesId` int(11) NOT NULL,
    PRIMARY KEY (`PedidoId`,`RestaurantesId`),
    CONSTRAINT `fk_pedidos_restaurantes`
    FOREIGN KEY (`PedidoId`) REFERENCES `Pedidos` (`id`),
    CONSTRAINT `fk_restaurantes_pedidos`
    FOREIGN KEY (`RestaurantesId`) REFERENCES `Restaurantes` (`id`)
);
CREATE TABLE `Pedidos_platillos`(
    `PedidoId` int(11) NOT NULL,
    `menuId` int(11) NOT NULL,
    `Cantidad` int(11) NOT NULL,
    PRIMARY KEY (`PedidoId`,`menuId`),
    CONSTRAINT `fk_pedidos_platillos`
    FOREIGN KEY (`PedidoId`) REFERENCES `Pedidos` (`id`),
    CONSTRAINT `fk_menu_pedidos`
    FOREIGN KEY (`menuId`) REFERENCES `Platillo_Restaurantes_menu` (`id`)
);
