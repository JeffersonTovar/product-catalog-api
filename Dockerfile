FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Catalog.Api/Catalog.Api.csproj Catalog.Api/
COPY Catalog.Application/Catalog.Application.csproj Catalog.Application/
COPY Catalog.Domain/Catalog.Domain.csproj Catalog.Domain/
COPY Catalog.Infrastructure/Catalog.Infrastructure.csproj Catalog.Infrastructure/

RUN dotnet restore Catalog.Api/Catalog.Api.csproj

COPY . .

RUN dotnet publish Catalog.Api/Catalog.Api.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Catalog.Api.dll"]
