namespace HappyPanaderia.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("detalles_factura")]
public class Detalle_Factura
{
    [Column("id_detalle")]
    public int Id { get; set; }
    [Column("id_factura")]
    public int IdFactura { get; set; }
    [Column("id_producto")]
    public int IdProducto { get; set; }
    [Column("cantidad")]
    public int Cantidad { get; set; }
    [Column("precio_unitario")]
    public decimal PrecioUnitario { get; set; }
}