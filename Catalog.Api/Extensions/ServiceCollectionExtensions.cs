using Catalog.Application.Interfaces;
using Catalog.Application.UseCases;
using Catalog.Infrastructure.Repositories;

namespace Catalog.Api.Extensions;

public static class ServiceCollectionExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services)
  {
    services.AddScoped<ICategoryRepository, CategoryRepository>();
    services.AddScoped<CreateCategoryUseCase>();
    return services;
  }
}
