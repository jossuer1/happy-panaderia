using System.ComponentModel.DataAnnotations;

namespace HappyPanaderia.Api.Models.DTOs.Factura;

public class CreateDetalleFacturaDto
{
    [Required]
    public int ProductoId { get; set; }

    [Required]
    public int Cantidad { get; set; }
}