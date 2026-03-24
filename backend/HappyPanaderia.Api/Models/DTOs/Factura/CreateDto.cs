using System.ComponentModel.DataAnnotations;

namespace HappyPanaderia.Api.Models.DTOs.Factura;

public class CreateFacturaDto
{
    public int? ClienteId { get; set; }

    [Required]
    public List<CreateDetalleFacturaDto> Detalles { get; set; } = new();
}