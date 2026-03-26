using Microsoft.EntityFrameworkCore;
using HappyPanaderia.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Agregar controladores
builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Conexión a MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        "server=b7lgdbwyyeqqzzj1qpyg-mysql.services.clever-cloud.com;port=3306;database=b7lgdbwyyeqqzzj1qpyg;user=usqpe0lmjrsjz91x;password=LAHQhEN9JejJo76Khtgh",
        ServerVersion.AutoDetect("server=b7lgdbwyyeqqzzj1qpyg-mysql.services.clever-cloud.com;port=3306;database=b7lgdbwyyeqqzzj1qpyg;user=usqpe0lmjrsjz91x;password=LAHQhEN9JejJo76Khtgh")
    )
);

var app = builder.Build();

app.UseCors("AllowAll");

//app.UseHttpsRedirection();

// Mapear controllers
app.MapControllers();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Run($"http://0.0.0.0:{port}");