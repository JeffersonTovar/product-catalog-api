using Catalog.Application.DTOs;
using Catalog.Application.UseCases;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase
{
  private readonly GenerateProductsUseCase _generateProductsUseCase;
  private readonly GetProductsUseCase _getProductsUseCase;

  public ProductController(
    GenerateProductsUseCase generateProductsUseCase,
    GetProductsUseCase getProductsUseCase)
  {
    _generateProductsUseCase = generateProductsUseCase;
    _getProductsUseCase = getProductsUseCase;
  }

  [HttpGet]
  public async Task<IActionResult> Get(
    int page = 1,
    int pageSize = 10,
    string? search = null,
    Guid? categoryId = null)
  {
    var result = await _getProductsUseCase.ExecuteAsync(
      page,
      pageSize,
      search,
      categoryId);

    return Ok(result);
  }

  [HttpPost]
  public async Task<IActionResult> Generate(GenerateProductsDto dto)
  {
    await _generateProductsUseCase.ExecuteAsync(dto.Amount);
    return Ok(new { message = $"{dto.Amount} products generated successfully" });
  }
}
