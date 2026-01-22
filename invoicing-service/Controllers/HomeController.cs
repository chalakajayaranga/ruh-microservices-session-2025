using Microsoft.AspNetCore.Mvc;

namespace invoicing_service.Controllers;

[ApiController]
[Route("")]
public class HomeController : ControllerBase
{

    public HomeController()
    {
        
    }

    [HttpGet]
    public IActionResult Get()
    {
        Console.WriteLine("Home Page Accessed!");
        var htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>Invoicing Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.6;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class=""container"">
        <h1>Welcome to the invoicing service!</h1>
        <p>This is the Invoicing Service API. You can explore the API documentation using Swagger.</p>
        <a href=""/doc"">View API Documentation</a>
    </div>
</body>
</html>";
        return Content(htmlContent, "text/html");
    }
}
