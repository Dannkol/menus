-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-07-2023 a las 05:49:58
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

DROP DATABASE IF EXISTS `restaurantes_menus_api`;

CREATE DATABASE `restaurantes_menus_api`;

USE `restaurantes_menus_api`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurantes_menus_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Telefono_Movil` varchar(15) NOT NULL,
  `Direccion` varchar(150) NOT NULL,
  `Metado_pago_def` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingredientes`
--

INSERT INTO `ingredientes` (`id`, `nombre`) VALUES
(1, 'papa'),
(2, 'cebolla'),
(3, 'huevo'),
(4, 'ajo'),
(5, 'perejil'),
(6, 'salmon'),
(7, 'alga'),
(8, 'tomate');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo_pago`
--

CREATE TABLE `metodo_pago` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL,
  `Abreviacion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodo_pago`
--

INSERT INTO `metodo_pago` (`id`, `Nombre`, `Abreviacion`) VALUES
(1, 'Efectivo', 'Ef'),
(2, 'Tarjeta de credito', 'TC'),
(3, 'Tarjeta de debito', 'TD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `Mensaje` varchar(255) NOT NULL,
  `Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Metodo_pago` int(11) NOT NULL,
  `Cliente_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_platillos`
--

CREATE TABLE `pedidos_platillos` (
  `PedidoId` int(11) NOT NULL,
  `menuId` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_restaurantes`
--

CREATE TABLE `pedidos_restaurantes` (
  `PedidoId` int(11) NOT NULL,
  `RestaurantesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platillos`
--

CREATE TABLE `platillos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `Slug` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platillos`
--

INSERT INTO `platillos` (`id`, `nombre`, `descripcion`, `precio`, `Slug`) VALUES
(1, 'sushi salmon', 'sushi de salmon 1 rol', 50000.00, 'shu234'),
(2, 'salsa de tomate', 'salsa boloñesa', 20000.00, 'salTom22'),
(3, 'salsa tami', 'salsa de ajo', 10000.00, 'saltam434');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platillo_ingredientes`
--

CREATE TABLE `platillo_ingredientes` (
  `platillo_id` int(11) NOT NULL,
  `ingredientes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platillo_ingredientes`
--

INSERT INTO `platillo_ingredientes` (`platillo_id`, `ingredientes_id`) VALUES
(1, 5),
(1, 6),
(1, 7),
(2, 2),
(2, 3),
(2, 8),
(3, 1),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platillo_restaurantes_menu`
--

CREATE TABLE `platillo_restaurantes_menu` (
  `id` int(11) NOT NULL,
  `platillo_id` int(11) NOT NULL,
  `restaurantes_id` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `platillo_restaurantes_menu`
--

INSERT INTO `platillo_restaurantes_menu` (`id`, `platillo_id`, `restaurantes_id`, `estado`) VALUES
(1, 1, 1, 1),
(2, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurantes`
--

CREATE TABLE `restaurantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `sucursal` int(11) NOT NULL,
  `Slug` varchar(150) NOT NULL,
  `NIT` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `restaurantes`
--

INSERT INTO `restaurantes` (`id`, `nombre`, `password`, `email`, `sucursal`, `Slug`, `NIT`) VALUES
(1, 'Sushi Kami', '12354', 'SushKami@correo.com', 1, 'daewf', 123412423523);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL,
  `direccion` varchar(50) DEFAULT 'VIRTUAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`id`, `direccion`) VALUES
(1, 'VIRTUAL'),
(2, 'Poblado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal_telefonos`
--

CREATE TABLE `sucursal_telefonos` (
  `telefono_id` int(11) NOT NULL,
  `sucursal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sucursal_telefonos`
--

INSERT INTO `sucursal_telefonos` (`telefono_id`, `sucursal_id`) VALUES
(1, 2),
(2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefono`
--

CREATE TABLE `telefono` (
  `id` int(11) NOT NULL,
  `telefono` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `telefono`
--

INSERT INTO `telefono` (`id`, `telefono`) VALUES
(0, '+5731758963866'),
(1, '+5731758963866'),
(2, '+573175834536');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Password` (`Password`),
  ADD KEY `fk_metodo_pago_def` (`Metado_pago_def`);

--
-- Indices de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Cliente_pedido` (`Cliente_id`),
  ADD KEY `fk_Metodo_pago_pedido` (`Metodo_pago`);

--
-- Indices de la tabla `pedidos_platillos`
--
ALTER TABLE `pedidos_platillos`
  ADD PRIMARY KEY (`PedidoId`,`menuId`),
  ADD KEY `fk_menu_pedidos` (`menuId`);

--
-- Indices de la tabla `pedidos_restaurantes`
--
ALTER TABLE `pedidos_restaurantes`
  ADD PRIMARY KEY (`PedidoId`,`RestaurantesId`),
  ADD KEY `fk_restaurantes_pedidos` (`RestaurantesId`);

--
-- Indices de la tabla `platillos`
--
ALTER TABLE `platillos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platillo_ingredientes`
--
ALTER TABLE `platillo_ingredientes`
  ADD PRIMARY KEY (`platillo_id`,`ingredientes_id`),
  ADD KEY `fk_ingredientes_platillo` (`ingredientes_id`);

--
-- Indices de la tabla `platillo_restaurantes_menu`
--
ALTER TABLE `platillo_restaurantes_menu`
  ADD PRIMARY KEY (`id`,`platillo_id`,`restaurantes_id`),
  ADD KEY `fk_platillo_restaurantes` (`platillo_id`),
  ADD KEY `fk_restaurantes_platillo` (`restaurantes_id`);

--
-- Indices de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sucursal` (`sucursal`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sucursal_telefonos`
--
ALTER TABLE `sucursal_telefonos`
  ADD KEY `fk_telefono_sucursales` (`telefono_id`),
  ADD KEY `fk_sucursal_telefonos` (`sucursal_id`);

--
-- Indices de la tabla `telefono`
--
ALTER TABLE `telefono`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `metodo_pago`
--
ALTER TABLE `metodo_pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platillos`
--
ALTER TABLE `platillos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `platillo_restaurantes_menu`
--
ALTER TABLE `platillo_restaurantes_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_metodo_pago_def` FOREIGN KEY (`Metado_pago_def`) REFERENCES `metodo_pago` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_Cliente_pedido` FOREIGN KEY (`Cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `fk_Metodo_pago_pedido` FOREIGN KEY (`Metodo_pago`) REFERENCES `metodo_pago` (`id`);

--
-- Filtros para la tabla `pedidos_platillos`
--
ALTER TABLE `pedidos_platillos`
  ADD CONSTRAINT `fk_menu_pedidos` FOREIGN KEY (`menuId`) REFERENCES `platillo_restaurantes_menu` (`id`),
  ADD CONSTRAINT `fk_pedidos_platillos` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`id`);

--
-- Filtros para la tabla `pedidos_restaurantes`
--
ALTER TABLE `pedidos_restaurantes`
  ADD CONSTRAINT `fk_pedidos_restaurantes` FOREIGN KEY (`PedidoId`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_restaurantes_pedidos` FOREIGN KEY (`RestaurantesId`) REFERENCES `restaurantes` (`id`);

--
-- Filtros para la tabla `platillo_ingredientes`
--
ALTER TABLE `platillo_ingredientes`
  ADD CONSTRAINT `fk_ingredientes_platillo` FOREIGN KEY (`ingredientes_id`) REFERENCES `ingredientes` (`id`),
  ADD CONSTRAINT `fk_platillo_ingredientes` FOREIGN KEY (`platillo_id`) REFERENCES `platillos` (`id`);

--
-- Filtros para la tabla `platillo_restaurantes_menu`
--
ALTER TABLE `platillo_restaurantes_menu`
  ADD CONSTRAINT `fk_platillo_restaurantes` FOREIGN KEY (`platillo_id`) REFERENCES `platillos` (`id`),
  ADD CONSTRAINT `fk_restaurantes_platillo` FOREIGN KEY (`restaurantes_id`) REFERENCES `restaurantes` (`id`);

--
-- Filtros para la tabla `restaurantes`
--
ALTER TABLE `restaurantes`
  ADD CONSTRAINT `fk_sucursal` FOREIGN KEY (`sucursal`) REFERENCES `sucursales` (`id`);

--
-- Filtros para la tabla `sucursal_telefonos`
--
ALTER TABLE `sucursal_telefonos`
  ADD CONSTRAINT `fk_sucursal_telefonos` FOREIGN KEY (`sucursal_id`) REFERENCES `sucursales` (`id`),
  ADD CONSTRAINT `fk_telefono_sucursales` FOREIGN KEY (`telefono_id`) REFERENCES `telefono` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
