-- Crear la base de datos
CREATE DATABASE Grupo4DigitalCommerce;

-- Usar la base de datos recién creada
USE Grupo_4DigitalCommerce;

-- Crear la tabla de Usuarios
CREATE TABLE Usuarios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    CorreoElectronico VARCHAR(100),
    Contraseña VARCHAR(100),
    Direccion VARCHAR(100),
    Ciudad VARCHAR(50),
    Pais VARCHAR(50),
    Telefono VARCHAR(20),
    TipoUsuario VARCHAR(50) -- Cambiar a VARCHAR y controlar los valores permitidos en la aplicación
);

-- Crear la tabla de Productos
CREATE TABLE Productos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Descripcion TEXT,
    Precio DECIMAL(10, 2),
    StockDisponible INT,
    Categoria VARCHAR(50),
    Marca VARCHAR(50),
    Imagen VARCHAR(255)
);

-- Crear la tabla de Servicios
CREATE TABLE Servicios (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100),
    Descripcion TEXT,
    Precio DECIMAL(10, 2)
);

-- Crear la tabla de Pedidos
CREATE TABLE Pedidos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDUsuario INT,
    FechaHoraPedido DATETIME,
    EstadoPedido VARCHAR(50), -- Cambiar a VARCHAR y controlar los valores permitidos en la aplicación
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(ID)
);

-- Crear la tabla de Detalles del Pedido
CREATE TABLE DetallesPedido (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDPedido INT,
    IDProducto INT,
    Cantidad INT,
    PrecioUnitario DECIMAL(10, 2),
    FOREIGN KEY (IDPedido) REFERENCES Pedidos(ID),
    FOREIGN KEY (IDProducto) REFERENCES Productos(ID)
);

-- Crear la tabla de Comentarios y Valoraciones
CREATE TABLE ComentariosValoraciones (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDProducto INT,
    IDUsuario INT,
    Comentario TEXT,
    Valoracion INT,
    FOREIGN KEY (IDProducto) REFERENCES Productos(ID),
    FOREIGN KEY (IDUsuario) REFERENCES Usuarios(ID)
);
