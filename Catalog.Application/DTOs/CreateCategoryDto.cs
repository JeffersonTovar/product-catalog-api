namespace Catalog.Application.DTOs;

public class CreateCategoryDto
{
  public string CategoryName { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Picture { get; set; } = string.Empty;
}
