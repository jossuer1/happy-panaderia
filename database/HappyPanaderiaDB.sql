create database happy_panaderia;

use happy_panaderia;

create table Productos(
id_producto int primary key auto_increment,
nombre varchar(100) not null,
categoria varchar(40) not null,
precio decimal(10,2) not null
);

create table Clientes(
id_cliente int primary key auto_increment,
nombre varchar(100)not null,
cedula varchar(15) not null unique,
direccion varchar(100) not null
);

create table Facturas (
id_factura int primary key auto_increment,
id_cliente int,
fecha_emision datetime not null,
total decimal(10,2) not null,
iva decimal(10,2) not null,

foreign key (id_cliente) references Clientes(id_cliente)
);

create table Detalles_Factura(
id_detalle int primary key auto_increment,
id_factura int not null,
id_producto int not null,

cantidad int not null,
precio_unitario decimal(10,2) not null,

foreign key (id_factura) REFERENCES  Facturas(id_factura)ON DELETE CASCADE,
foreign key (id_producto) REFERENCES Productos(id_producto)
)