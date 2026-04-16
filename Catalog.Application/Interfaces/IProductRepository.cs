namespace Catalog.Application.Interfaces;

using Catalog.Domain.Entities;

public interface IProductRepository
{
  Task BulkInsertAsync(List<Product> products);
  Task<(IEnumerable<Product> data, int total)> GetPagedAsync(
    int page,
    int pageSize,
    string? search,
    Guid? categoryId);
}
