using Catalog.Application.DTOs;
using Catalog.Application.UseCases;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
  private readonly CreateCategoryUseCase _createCategoryUseCase;

  public CategoryController(CreateCategoryUseCase createCategoryUseCase)
  {
    _createCategoryUseCase = createCategoryUseCase;
  }
  [Authorize]
  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateCategoryDto dto)
  {
    var result = await _createCategoryUseCase.ExecuteAsync(dto);
    return Ok(result);
  }
}
