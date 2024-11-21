
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using ReactORTanstack_Query.API.Data;
using ReactORTanstack_Query.API.Profiles;
using ReactORTanstack_Query.API.Repository;
using ReactORTanstack_Query.API.Repository.IRepository;
using ReactORTanstack_Query.API.Upload;
using ReactORTanstack_Query.API.Utility;

namespace ReactORTanstack_Query.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //Automapper Configutation
            builder.Services.AddAutoMapper(typeof(MappingConfig));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ReactQueryDbContext>(opt =>
            opt.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));
            
            builder.Services.AddScoped<IEmployeeRepository,EmployeeRepository>();
            builder.Services.AddScoped<IDepartmentRepository,DepartmentRepository>();

            builder.Services.AddScoped<UploadFiles>();

            // Register the custom model state validation filter globally
            builder.Services.AddScoped<ValidateModelStateFilter>();
            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<ValidateModelStateFilter>();  // Add your custom filter here
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.WithOrigins("http://localhost:5173") // Correct method
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            // Use static files from wwwroot by default
            app.UseStaticFiles(); // This will serve static files from the wwwroot folder

            // If you want to serve images from a specific folder inside wwwroot (like 'images' folder)
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
                RequestPath = "/images" // Access images via '/images' path
            });
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
