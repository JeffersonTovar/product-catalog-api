using Catalog.Application.Interfaces;

namespace Catalog.Application.UseCases;

public class DeleteProductUseCase
{
  private readonly IProductRepository _repository;

  public DeleteProductUseCase(IProductRepository repository)
  {
    _repository = repository;
  }

  public async Task<bool> ExecuteAsync(Guid id)
  {
    var product = await _repository.GetByIdAsync(id);
    if (product == null) return false;
    await _repository.DeleteAsync(product);
    return true;
  }
}
