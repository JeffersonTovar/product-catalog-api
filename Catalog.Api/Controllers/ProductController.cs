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
  private readonly GetProductByIdUseCase _getByIdUseCase;
  private readonly UpdateProductUseCase _updateUseCase;
  private readonly DeleteProductUseCase _deleteUseCase;

public ProductController(
    GetProductByIdUseCase getByIdUseCase,
    GenerateProductsUseCase generateProductsUseCase,
    GetProductsUseCase getProductsUseCase,
    UpdateProductUseCase updateUseCase,
    DeleteProductUseCase deleteUseCase)
  {
    _generateProductsUseCase = generateProductsUseCase;
    _getProductsUseCase = getProductsUseCase;
    _getByIdUseCase = getByIdUseCase;
    _updateUseCase = updateUseCase;
    _deleteUseCase = deleteUseCase;
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

  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(Guid id)
  {
    var result = await _getByIdUseCase.ExecuteAsync(id);
    if (result == null) return NotFound();
    return Ok(result);
  }

  [Authorize]
  [HttpPut]
  public async Task<IActionResult> Update([FromBody] UpdateProductDto dto)
  {
    var success = await _updateUseCase.ExecuteAsync(dto);
    if (!success) return NotFound();
    return Ok();
  }

  [Authorize]
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(Guid id)
  {
    var success = await _deleteUseCase.ExecuteAsync(id);
    if (!success) return NotFound();

    return Ok();
  }

  [HttpPost]
  public async Task<IActionResult> Generate(GenerateProductsDto dto)
  {
    await _generateProductsUseCase.ExecuteAsync(dto.Amount);
    return Ok(new { message = $"{dto.Amount} products generated successfully" });
  }
}
