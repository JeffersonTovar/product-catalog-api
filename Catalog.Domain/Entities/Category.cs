namespace Catalog.Domain.Entities;

public class Category
{
  public Guid Id { get; set; }
  public string CategoryName { get; set; }
  public string Description { get; set; }
  public string Picture { get; set; }

  public List<Product> Products { get; set; } = new();
}
