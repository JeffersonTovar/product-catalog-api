using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Catalog.Application.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Catalog.Tests.Integration;

public class ProductEndpointsTests : IClassFixture<WebApplicationFactory<Program>>
{
  private readonly HttpClient _client;

  public ProductEndpointsTests(WebApplicationFactory<Program> factory)
  {
    _client = factory.CreateClient();
  }

  [Fact]
  public async Task FullFlow_Should_Work_Correctly()
  {
    var loginResponse = await _client.PostAsJsonAsync("/api/Auth/login", new
    {
      username = "admin",
      password = "admin"
    });
    Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);
    var loginContent = await loginResponse.Content.ReadFromJsonAsync<LoginResponse>();
    string token = loginContent!.Token;
    _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    var categoryRequest = new CreateCategoryDto
    {
      CategoryName = "SERVIDORES",
      Description = "Infraestructura",
      Picture = "img.png"
    };
    var categoryResponse = await _client.PostAsJsonAsync("/api/Category", categoryRequest);

    var error = await categoryResponse.Content.ReadAsStringAsync();
    Console.WriteLine(error);

    Assert.Equal(HttpStatusCode.OK, categoryResponse.StatusCode);
    var productResponse = await _client.PostAsJsonAsync("/api/Product?amount=100", new { });
    Assert.Equal(HttpStatusCode.OK, productResponse.StatusCode);
    var getResponse = await _client.GetAsync("/api/Product?page=1&pageSize=10");
    Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
  }
}
