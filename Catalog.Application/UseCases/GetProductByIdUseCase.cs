using Catalog.Application.DTOs;
using Catalog.Application.Interfaces;

public class GetProductByIdUseCase
{
  private readonly IProductRepository _repository;

  public GetProductByIdUseCase(IProductRepository repository)
  {
    _repository = repository;
  }

  public async Task<ProductDto?> ExecuteAsync(Guid id)
  {
    var product = await _repository.GetByIdAsync(id);
    if (product == null) return null;

    return new ProductDto
    {
      Id = product.Id,
      ProductName = product.ProductName,
      UnitPrice = product.UnitPrice,
      CategoryName = product.Category.CategoryName
    };
  }
}
