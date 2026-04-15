namespace Catalog.Application.Interfaces;

using Catalog.Domain.Entities;

public interface ICategoryRepository
{
  Task AddAsync(Category category);
  Task<Category?> GetByIdAsync(Guid id);
  Task<IEnumerable<Category>> GetAllAsync();
}
