using Catalog.Application.Interfaces;

namespace Catalog.Application.UseCases;

public class UpdateProductUseCase
{
  private readonly IProductRepository _repository;

  public UpdateProductUseCase(IProductRepository repository)
  {
    _repository = repository;
  }

  public async Task<bool> ExecuteAsync(UpdateProductDto dto)
  {
    var product = await _repository.GetByIdAsync(dto.Id);
    if (product == null) return false;
    product.ProductName = dto.ProductName;
    product.UnitPrice = dto.UnitPrice;
    await _repository.UpdateAsync(product);
    return true;
  }
}
