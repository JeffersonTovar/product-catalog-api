using Catalog.Application.DTOs;
using Catalog.Application.Interfaces;

namespace Catalog.Application.UseCases;

public class GetProductsUseCase
{
  private readonly IProductRepository _repository;

  public GetProductsUseCase(IProductRepository repository)
  {
    _repository = repository;
  }

  public async Task<PagedResult<ProductDto>> ExecuteAsync(
    int page,
    int pageSize,
    string? search,
    Guid? categoryId)
  {
    var (products, total) = await _repository.GetPagedAsync(
      page,
      pageSize,
      search,
      categoryId);

    var data = products.Select(p => new ProductDto
    {
      Id = p.Id,
      ProductName = p.ProductName,
      UnitPrice = p.UnitPrice,
      UnitsInStock = p.UnitsInStock,
      CategoryName = p.Category?.CategoryName ?? ""
    });

    return new PagedResult<ProductDto>
    {
      Page = page,
      PageSize = pageSize,
      Total = total,
      Data = data
    };
  }
}
