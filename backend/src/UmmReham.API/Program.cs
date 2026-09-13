using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using UmmReham.Infrastructure;
using UmmReham.Infrastructure.Data;
using UmmReham.Infrastructure.Seed;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "أم رهام API | Umm Reham API",
        Version = "v1",
        Description = "API for Umm Reham Student Help Platform"
    });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header. Example: 'Bearer {token}'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// Infrastructure (DB + Repositories)
builder.Services.AddInfrastructure(builder.Configuration);

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "UmmReham_SuperSecret_Key_2024_SaudiArabia_Academic_Platform_!@#";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "UmmReham",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "UmmRehamAdmin",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

// CORS - Allow localhost and production domains (Vercel, Render, etc.)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.SetIsOriginAllowed(origin => true) // Allows localhost, Vercel, Render, and custom domains
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await context.Database.EnsureCreatedAsync();

    // Safely ensure all new columns exist in SQLite database
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE testimonials ADD COLUMN AvatarUrl TEXT;"); } catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE testimonials ADD COLUMN MediaType TEXT DEFAULT 'text';"); } catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE testimonials ADD COLUMN MediaUrl TEXT;"); } catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE portfolio_items ADD COLUMN LikesCount INTEGER DEFAULT 0;"); } catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE portfolio_items ADD COLUMN Rating REAL DEFAULT 5.0;"); } catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE portfolio_items ADD COLUMN RatingCount INTEGER DEFAULT 1;"); } catch {}

    // Ensure Notifications table exists in SQLite database
    try 
    { 
        await context.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS Notifications (
                Id TEXT PRIMARY KEY,
                Title TEXT NOT NULL,
                Message TEXT NOT NULL,
                Type TEXT NOT NULL,
                Target TEXT NOT NULL,
                Icon TEXT NULL,
                Link TEXT NULL,
                ActionLabel TEXT NULL,
                IsRead INTEGER NOT NULL,
                RecipientType TEXT NOT NULL,
                CreatedAt TEXT NOT NULL,
                UpdatedAt TEXT NOT NULL
            );
        "); 
    } 
    catch {}
    try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE Notifications ADD COLUMN UpdatedAt TEXT;"); } catch {}

    await SeedData.SeedAsync(context);
}

// Swagger enabled for testing API endpoints
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Umm Reham API v1");
    c.RoutePrefix = "swagger";
});

// Ensure wwwroot and uploads folder exist for static media files
var wwwrootPath = Path.Combine(app.Environment.ContentRootPath, "wwwroot");
var uploadsPath = Path.Combine(wwwrootPath, "uploads");
Directory.CreateDirectory(uploadsPath);

app.UseCors("AllowAngular");
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Root Healthcheck for Render / Cloud uptime monitoring
app.MapGet("/", () => Results.Ok(new 
{ 
    status = "healthy", 
    service = "Umm Reham Academic Platform API", 
    version = "1.0.0",
    docs = "/swagger",
    timestamp = DateTime.UtcNow 
}));

app.Run();
