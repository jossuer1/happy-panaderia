namespace HappyPanaderia.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("Facturas")]
public class Factura
{
    [Column("id_factura")]
    public int Id { get; set; }
    [Column("id_cliente")]
    public int? IdCliente { get; set; }
    [Column("fecha_emision")]
    public DateTime Fecha { get; set; }
    [Column("total")]
    public decimal Total { get; set; }
    [Column("iva")]
    public decimal Iva { get; set; }

    public List<DetalleFactura> Detalles { get; set; } = new();
}