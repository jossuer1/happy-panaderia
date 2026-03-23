using Microsoft.EntityFrameworkCore;
using HappyPanaderia.Api.Models;

namespace HappyPanaderia.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Factura> Facturas { get; set; }
    public DbSet<Detalle_Factura> DetallesFactura { get; set; }

}