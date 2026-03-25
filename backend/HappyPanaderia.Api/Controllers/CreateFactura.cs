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
        if (facturaDto == null || facturaDto.Detalles == null || !facturaDto.Detalles.Any())
        {
            return BadRequest("La factura no tiene productos.");
        }

        var factura = new Factura
        {
            IdCliente = facturaDto.ClienteId, // Soporta null correctamente
            Fecha = DateTime.Now,
            Detalles = new List<DetalleFactura>()
        };

        decimal subtotalGeneral = 0;

        foreach (var item in facturaDto.Detalles)
        {
            // Importante: item.ProductoId debe venir del JSON
            var producto = _context.Productos.Find(item.ProductoId);
            if (producto == null) return BadRequest($"El producto con ID {item.ProductoId} no existe.");

            var detalle = new DetalleFactura
            {
                IdProducto = producto.Id,
                Cantidad = item.Cantidad,
                PrecioUnitario = producto.Precio
            };

            subtotalGeneral += (producto.Precio * item.Cantidad);
            factura.Detalles.Add(detalle);
        }

        factura.Iva = subtotalGeneral * 0.15m;
        factura.Total = subtotalGeneral + factura.Iva;

        try
        {
            foreach (var d in factura.Detalles)
            {
                d.Factura = null;
            }
            _context.Facturas.Add(factura);
            _context.SaveChanges();

            var resultado = ObtenerFacturaLimpia(factura.Id);
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }

    // Método auxiliar privado para no repetir código y que sea seguro
    private object? ObtenerFacturaLimpia(int id)
    {
        return _context.Facturas
            .Where(f => f.Id == id)
            .Select(f => new
            {
                f.Id,
                f.IdCliente,

                NombreCliente = f.IdCliente == null
                    ? "Consumidor Final"
                    : _context.Clientes
                        .Where(c => c.Id == f.IdCliente)
                        .Select(c => c.Nombre)
                        .FirstOrDefault(),
                f.Fecha,
                f.Iva,
                f.Total,
                Detalles = f.Detalles.Select(d => new
                {
                    d.IdProducto,
                    // Buscamos el nombre manualmente en la tabla Productos
                    NombreProducto = _context.Productos
                        .Where(p => p.Id == d.IdProducto)
                        .Select(p => p.Nombre)
                        .FirstOrDefault(),
                    d.Cantidad,
                    d.PrecioUnitario,
                    Subtotal = d.Cantidad * d.PrecioUnitario
                }).ToList()
            })
            .FirstOrDefault();
    }

    [HttpGet("{id}")]
    public IActionResult GetFactura(int id)
    {
        var factura = ObtenerFacturaLimpia(id);
        return factura == null ? NotFound() : Ok(factura);
    }

}
