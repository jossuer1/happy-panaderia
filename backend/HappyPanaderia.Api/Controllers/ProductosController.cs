using Microsoft.AspNetCore.Mvc;
using HappyPanaderia.Api.Data;
using HappyPanaderia.Api.Models;

namespace HappyPanaderia.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    //GET : api/productos
    [HttpGet]
    public IActionResult GetProductos()
    {
        var productos = _context.Productos.ToList();
        return Ok(productos);
    }

    //POST : api/productos
    [HttpPost]
    public IActionResult CreateProducto([FromBody] Producto producto)
    {
        _context.Productos.Add(producto);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetProductos), new { id = producto.Id }, producto);
    }

    //PUT : api/productos/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateProducto(int id, [FromBody] Producto producto)
    {
        var existingProducto = _context.Productos.Find(id);
        if (existingProducto == null)
        {
            return NotFound();
        }

        existingProducto.Nombre = producto.Nombre;
        existingProducto.Categoria = producto.Categoria;
        existingProducto.Precio = producto.Precio;

        _context.SaveChanges();
        return NoContent();
    }

    //DELETE : api/productos/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteProducto(int id)
    {
        var producto = _context.Productos.Find(id);
        if (producto == null)
        {
            return NotFound();
        }

        _context.Productos.Remove(producto);
        _context.SaveChanges();
        return NoContent();
    }

}