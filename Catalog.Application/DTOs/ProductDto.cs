namespace Catalog.Application.DTOs;

public class ProductDto
{
  public Guid Id { get; set; }
  public string ProductName { get; set; }
  public decimal UnitPrice { get; set; }
  public int UnitsInStock { get; set; }
  public string CategoryName { get; set; }
}
