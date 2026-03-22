using Microsoft.AspNetCore.Mvc;
using HappyPanaderia.Api.Data;
using HappyPanaderia.Api.Models;

namespace HappyPanaderia.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ClientesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ClientesController(AppDbContext context)
    {
        _context = context;
    }

    //GET : api/clientes
    [HttpGet]
    public IActionResult GetClientes()
    {
        var clientes = _context.Clientes.ToList();
        return Ok(clientes);
    }

    //GET : api/clientes/{id}
    [HttpGet("{id}")]
    public IActionResult GetCliente(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
        {
            return NotFound();
        }
        return Ok(cliente);
    }

    //POST : api/clientes
    [HttpPost]
    public IActionResult CreateCliente([FromBody] Cliente cliente)
    {
        _context.Clientes.Add(cliente);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetCliente), new { id = cliente.Id }, cliente);
    }

    //PUT : api/clientes/{id}
    [HttpPut("{id}")]
    public IActionResult UpdateCliente(int id, [FromBody] Cliente cliente)
    {
        var existingCliente = _context.Clientes.Find(id);
        if (existingCliente == null)
        {
            return NotFound();
        }

        existingCliente.Nombre = cliente.Nombre;
        existingCliente.Cedula = cliente.Cedula;
        existingCliente.Direccion = cliente.Direccion;

        _context.SaveChanges();
        return NoContent();
    }

    //DELETE : api/clientes/{id}
    [HttpDelete("{id}")]
    public IActionResult DeleteCliente(int id)
    {
        var cliente = _context.Clientes.Find(id);
        if (cliente == null)
        {
            return NotFound();
        }

        _context.Clientes.Remove(cliente);
        _context.SaveChanges();
        return NoContent();
    }



}