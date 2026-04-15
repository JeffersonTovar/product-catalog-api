using Catalog.Application.Interfaces;
using Catalog.Domain.Entities;
using Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
  private readonly AppDbContext _context;

  public CategoryRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task AddAsync(Category category)
  {
    await _context.Categories.AddAsync(category);
    await _context.SaveChangesAsync();
  }

  public async Task<Category?> GetByIdAsync(Guid id)
  {
    return await _context.Categories
      .FirstOrDefaultAsync(c => c.Id == id);
  }

  public async Task<IEnumerable<Category>> GetAllAsync()
  {
    return await _context.Categories.ToListAsync();
  }
}
