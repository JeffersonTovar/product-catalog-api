using Xunit;
using Moq;
using Catalog.Application.UseCases;
using Catalog.Application.Interfaces;
using Catalog.Application.DTOs;
using Catalog.Domain.Entities;

public class CreateCategoryUseCaseTests
{
  [Fact]
  public async Task Should_Create_Category_Successfully()
  {
    var mockRepo = new Mock<ICategoryRepository>();
    var useCase = new CreateCategoryUseCase(mockRepo.Object);
    var dto = new CreateCategoryDto
    {
      CategoryName = "SERVIDORES",
      Description = "Infraestructura",
      Picture = "img.png"
    };
    var result = await useCase.ExecuteAsync(dto);
    Assert.NotNull(result);
    Assert.Equal(dto.CategoryName, result.CategoryName);
    mockRepo.Verify(r => r.AddAsync(It.IsAny<Category>()), Times.Once);
  }
}
