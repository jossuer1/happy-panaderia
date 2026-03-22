namespace HappyPanaderia.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("Clientes")]
public class Cliente
{
    [Column("id_cliente")]
    public int Id { get; set; }
    [Column("nombre")]
    public required string Nombre { get; set; }
    [Column("cedula")]
    public required string Cedula { get; set; }
    [Column("direccion")]
    public required string Direccion { get; set; }
}