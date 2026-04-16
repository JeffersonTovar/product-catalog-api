namespace Catalog.Application.Interfaces;

using Catalog.Domain.Entities;

public interface IProductRepository
{
  Task BulkInsertAsync(List<Product> products);
  Task<Product?> GetByIdAsync(Guid id);
  Task UpdateAsync(Product product);
  Task DeleteAsync(Product product);
  Task<(IEnumerable<Product> data, int total)> GetPagedAsync(
    int page,
    int pageSize,
    string? search,
    Guid? categoryId);
}
