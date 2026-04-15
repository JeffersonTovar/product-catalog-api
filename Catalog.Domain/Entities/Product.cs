namespace Catalog.Domain.Entities;

public class Product
{
  public Guid Id { get; set; }
  public string ProductName { get; set; }
  public decimal UnitPrice { get; set; }
  public int UnitsInStock { get; set; }

  public Guid CategoryId { get; set; }
  public Category Category { get; set; }
}
