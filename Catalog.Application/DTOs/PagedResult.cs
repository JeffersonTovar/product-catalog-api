namespace Catalog.Application.DTOs;

public class PagedResult<T>
{
  public int Page { get; set; }
  public int PageSize { get; set; }
  public int Total { get; set; }
  public IEnumerable<T> Data { get; set; }
  public int TotalPages => (int)Math.Ceiling((double)Total / PageSize);
}
