using Microsoft.AspNetCore.Mvc;
using HappyPanaderia.Api.Data;
using HappyPanaderia.Api.Models;
using HappyPanaderia.Api.Models.DTOs.Factura;

namespace HappyPanaderia.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class FacturasController : ControllerBase
{
    private readonly AppDbContext _context;

    public FacturasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateFactura([FromBody] CreateFacturaDto facturaDto)
    {
        // 1. VALIDAR QUE HAYA PRODUCTOS
        if (facturaDto.Detalles == null || !facturaDto.Detalles.Any())
        {
            return BadRequest("La factura debe tener al menos un producto.");
        }

        decimal total = 0;

        // 2. CREAR FACTURA VACÍA
        var factura = new Factura
        {
            IdCliente = facturaDto.ClienteId,
            Fecha = DateTime.Now,
            Detalles = new List<DetalleFactura>() // importante inicializar
        };

        // 3. RECORRER LOS PRODUCTOS DEL DTO
        foreach (var item in facturaDto.Detalles)
        {
            // 4. BUSCAR EL PRODUCTO REAL EN LA BD
            var producto = _context.Productos.Find(item.ProductoId);

            if (producto == null)
            {
                return BadRequest($"Producto con id {item.ProductoId} no existe.");
            }

            // 5. CALCULAR SUBTOTAL
            var subtotal = producto.Precio * item.Cantidad;

            // 6. SUMAR AL TOTAL
            total += subtotal;

            // 7. CREAR DETALLE CON PRECIO REAL
            var detalle = new DetalleFactura
            {
                IdProducto = producto.Id,
                Cantidad = item.Cantidad,
                PrecioUnitario = producto.Precio
            };

            factura.Detalles.Add(detalle);
        }

        // 8. CALCULAR IVA (15%)
        var iva = total * 0.15m;

        factura.Iva = iva;
        factura.Total = total + iva;

        // 9. GUARDAR TODO
        _context.Facturas.Add(factura);
        _context.SaveChanges();

        // 10. RESPUESTA
        return CreatedAtAction(nameof(GetFactura), new { id = factura.Id }, factura);
    }

    // MÉTODO PARA OBTENER UNA FACTURA POR ID (USADO EN CreatedAtAction)
    [HttpGet("{id}")]
    public IActionResult GetFactura(int id)
    {
        var factura = _context.Facturas.Find(id);

        if (factura == null)
        {
            return NotFound();
        }

        return Ok(factura);
    }

}

