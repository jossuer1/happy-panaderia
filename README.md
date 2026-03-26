Sistema de Gestión de Ventas - Happy Panadería
Proyecto académico desarrollado con una arquitectura desacoplada, utilizando ASP.NET Core para el servicio de datos y React para la interfaz de usuario, conectado a una base de datos MySQL.

Autor
Josue Patiño

Tecnologías
Frontend: React.js, Bootstrap 5, Axios

Backend: ASP.NET Core Web API (C#)

Base de Datos: MySQL

Herramientas: Entity Framework Core / ADO.NET, Node.js

Arquitectura
El sistema se divide en dos capas principales:

Servidor de Datos (Backend): Una API construida en .NET que gestiona la lógica de facturación, el cálculo automático del IVA (15%) y la comunicación con la base de datos mediante controladores.

Interfaz de Usuario (Frontend): Una aplicación de una sola página desarrollada en React que permite una gestión fluida del carrito de compras y la visualización de facturas en tiempo real.

Estructura de la Base de Datos
El diseño relacional se enfoca en la integridad de la transacción de venta:

Productos: Catálogo con categorías (Panadería, Pastelería, Bebidas) y precios.

Clientes: Registro de datos personales y validación de cédula.

Facturas y Detalles: Almacenamiento de la cabecera de la venta y el desglose de cada producto vendido para mantener el histórico de precios.

Ejecución
Base de Datos: Importar el script database_schema.sql en MySQL.

Backend: - Abrir la carpeta del servidor en Visual Studio o VS Code.

Configurar la cadena de conexión en appsettings.json.

Ejecutar el proyecto con el comando dotnet run.

Frontend:

Abrir la carpeta del cliente en la terminal.

Instalar dependencias: npm install.

Iniciar la aplicación: npm start.

Funcionalidades Principales
Registro y edición de productos y clientes.

Punto de venta interactivo con carrito de compras.

Proceso de pago con selección de cliente o "Consumidor Final".

Generación visual de comprobantes de venta con desglose de impuestos.
