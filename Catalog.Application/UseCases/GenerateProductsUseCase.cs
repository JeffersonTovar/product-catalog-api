using Catalog.Application.DTOs;
using Catalog.Application.Interfaces;
using Catalog.Domain.Entities;

namespace Catalog.Application.UseCases;

public class GenerateProductsUseCase
{
  private readonly IProductRepository _productRepository;
  private readonly ICategoryRepository _categoryRepository;

  public GenerateProductsUseCase(
    IProductRepository productRepository,
    ICategoryRepository categoryRepository)
  {
    _productRepository = productRepository;
    _categoryRepository = categoryRepository;
  }

  public async Task ExecuteAsync(int amount)
  {
    var categories = (await _categoryRepository.GetAllAsync()).ToList();

    if (!categories.Any())
      throw new Exception("No categories found. Create categories first.");

    var random = new Random();
    var products = new List<Product>(amount);

    for (int i = 0; i < amount; i++)
    {
      var category = categories[random.Next(categories.Count)];

      products.Add(new Product
      {
        Id = Guid.NewGuid(),
        ProductName = $"Product {i + 1}",
        UnitPrice = (decimal)(random.NextDouble() * 1000),
        UnitsInStock = random.Next(1, 100),
        CategoryId = category.Id
      });
    }

    await _productRepository.BulkInsertAsync(products);
  }
}
