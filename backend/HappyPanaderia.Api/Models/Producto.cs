namespace HappyPanaderia.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("Productos")]
public class Producto
{
    [Column("id_producto")]
    public int Id { get; set; }

    [Column("nombre")]
    public required string Nombre { get; set; }

    [Column("categoria")]
    public required string Categoria { get; set; }

    [Column("precio")]
    public required decimal Precio { get; set; }
}