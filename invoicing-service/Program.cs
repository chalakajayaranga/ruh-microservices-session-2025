using invoicing_service.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

Thread.Sleep(10000);
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Invoicing Service API",
        Version = "v1",
        Description = "API documentation for the Invoicing Service"
    });
});

// RabbitMq
var rabbitMqConnection = new ConnectionFactory(){
            HostName = "rabbitmq",
            UserName = "guest",
            Password = "guest"
        }.CreateConnectionAsync().Result;

builder.Services.AddSingleton<IConnection>(rabbitMqConnection); 
builder.Services.AddSingleton<PaymentRequestService>(); 
builder.Services.AddHostedService<PaymentAckConsumer>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Invoicing Service API v1");
    c.RoutePrefix = "doc";
});

app.UseAuthorization();

app.MapControllers();

app.Run();
