using Catalog.Application.Interfaces;
using Catalog.Application.UseCases;
using Catalog.Infrastructure.Repositories;
using Catalog.Infrastructure.Services;

namespace Catalog.Api.Extensions;

public static class ServiceCollectionExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services)
  {
    services.AddScoped<ICategoryRepository, CategoryRepository>();
    services.AddScoped<CreateCategoryUseCase>();
    services.AddScoped<IProductRepository, ProductRepository>();
    services.AddScoped<GenerateProductsUseCase>();
    services.AddScoped<GetProductsUseCase>();
    services.AddScoped<IJwtService, JwtService>();
    return services;
  }
}
