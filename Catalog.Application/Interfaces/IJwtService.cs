namespace Catalog.Application.Interfaces;

public interface IJwtService
{
  string GenerateToken(string username);
}
