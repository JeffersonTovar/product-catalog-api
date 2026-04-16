using Catalog.Application.Interfaces;
using Catalog.Domain.Entities;
using Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
  private readonly AppDbContext _context;

  public ProductRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task BulkInsertAsync(List<Product> products)
  {
    _context.ChangeTracker.AutoDetectChangesEnabled = false;

    await _context.Products.AddRangeAsync(products);
    await _context.SaveChangesAsync();

    _context.ChangeTracker.AutoDetectChangesEnabled = true;
  }

  public async Task<(IEnumerable<Product> data, int total)> GetPagedAsync(
    int page,
    int pageSize,
    string? search,
    Guid? categoryId)
  {
    var query = _context.Products
      .Include(p => p.Category)
      .AsQueryable();
    if (!string.IsNullOrWhiteSpace(search))
    {
      query = query.Where(p => p.ProductName.Contains(search));
    }

    if (categoryId.HasValue)
    {
      query = query.Where(p => p.CategoryId == categoryId.Value);
    }

    var total = await query.CountAsync();
    var data = await query
      .OrderBy(p => p.ProductName)
      .Skip((page - 1) * pageSize)
      .Take(pageSize)
      .ToListAsync();
    return (data, total);
  }

  public async Task<Product?> GetByIdAsync(Guid id)
  {
    return await _context.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
  }

  public async Task UpdateAsync(Product product)
  {
    _context.Products.Update(product);
    await _context.SaveChangesAsync();
  }

  public async Task DeleteAsync(Product product)
  {
    _context.Products.Remove(product);
    await _context.SaveChangesAsync();
  }

}
