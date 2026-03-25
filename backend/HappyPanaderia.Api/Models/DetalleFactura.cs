namespace HappyPanaderia.Api.Models;

using HappyPanaderia.Api.Models;

using System.ComponentModel.DataAnnotations.Schema;

[Table("Detalles_Factura")]
public class DetalleFactura
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

    // Relaciones
    [ForeignKey("IdFactura")]
    public Factura? Factura { get; set; }
}