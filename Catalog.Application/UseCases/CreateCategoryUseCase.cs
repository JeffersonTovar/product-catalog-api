using Catalog.Application.DTOs;
using Catalog.Application.Interfaces;
using Catalog.Domain.Entities;

namespace Catalog.Application.UseCases;

public class CreateCategoryUseCase
{
  private readonly ICategoryRepository _repository;

  public CreateCategoryUseCase(ICategoryRepository repository)
  {
    _repository = repository;
  }

  public async Task<CategoryDto> ExecuteAsync(CreateCategoryDto dto)
  {
    var category = new Category
    {
      Id = Guid.NewGuid(),
      CategoryName = dto.CategoryName,
      Description = dto.Description,
      Picture = dto.Picture
    };

    await _repository.AddAsync(category);

    return new CategoryDto
    {
      Id = category.Id,
      CategoryName = category.CategoryName,
      Description = category.Description
    };
  }
}
