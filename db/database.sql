CREATE DATABASE `Restaurantes_menus_api`;

USE Restaurantes_menus_api;

CREATE TABLE `ingredientes` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(255) NOT NULL
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

CREATE TABLE `infoRestaurante` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL,
    `Telefono_Movile` VARCHAR(50) NOT NULL,
    `Direccion` VARCHAR(150) NOT NULL,
    `Slug` VARCHAR(150) NOT NULL,
    `NIT` BIGINT NOT NULL
);

CREATE TABLE `Restaurantes` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    `infoRestaurante_id` INT(11) NOT NULL UNIQUE,
    CONSTRAINT `fk_infoRestaurante`
    FOREIGN KEY (`infoRestaurante_id`) REFERENCES `infoRestaurante` (`id`)
);


CREATE TABLE `Platillo_Restaurantes_menu` (
    `platillo_id` int(11) NOT NULL,
    `restaurantes_id` int(11) NOT NULL,
    PRIMARY KEY (`platillo_id`,`restaurantes_id`),
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

CREATE TABLE `InfoCliente`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Email` varchar(150) NOT NULL,
    `Telefono_Movil` varchar(50) NOT NULL,
    `Direccion` varchar(150) NOT NULL,
    `Metado_pago_def` INT(11) NOT NULL,
    CONSTRAINT `fk_metodo_pago_def`
    FOREIGN KEY (`Metado_pago_def`) REFERENCES `Metodo_pago` (`id`)
);

CREATE TABLE `Clientes`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` varchar(150) NOT NULL,
    `Password` varchar(150) NOT NULL,
    `infoCliente_id` INT(11) NOT NULL UNIQUE,
    CONSTRAINT `fk_infoCliente`
    FOREIGN KEY (`infoCliente_id`) REFERENCES `InfoCliente` (`id`)
);

-- Pedidos

CREATE TABLE `Pedidos`(
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Mensaje` VARCHAR(255) NOT NULL,
    `Created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Metodo_pago` INT(11) NOT NULL,
    CONSTRAINT `fk_Metodo_pago`
    FOREIGN KEY (`Metodo_pago`) REFERENCES `Metodo_pago` (`id`)
);

CREATE TABLE `Pedidos_platillos`(
    `PedidoId` int(11) NOT NULL,
    `PlatilloId` int(11) NOT NULL,
    `Cantidad` int(11) NOT NULL,
    PRIMARY KEY (`PedidoId`,`PlatilloId`),
    CONSTRAINT `fk_pedidos_platillos`
    FOREIGN KEY (`PedidoId`) REFERENCES `Pedidos` (`id`),
    CONSTRAINT `fk_platillos_pedidos`
    FOREIGN KEY (`PlatilloId`) REFERENCES `platillos` (`id`)
);

CREATE TABLE `Pedidos_Clientes`(
    `PedidoId` int(11) NOT NULL,
    `ClienteId` int(11) NOT NULL,
    PRIMARY KEY (`PedidoId`,`ClienteId`),
    CONSTRAINT `fk_pedidos_clientes`
    FOREIGN KEY (`PedidoId`) REFERENCES `Pedidos` (`id`),
    CONSTRAINT `fk_clientes_pedidos`
    FOREIGN KEY (`ClienteId`) REFERENCES `Clientes` (`id`)
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