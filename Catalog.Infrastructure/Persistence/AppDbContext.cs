using Microsoft.EntityFrameworkCore;
using Catalog.Domain.Entities;

namespace Catalog.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
    : base(options) { }

  public DbSet<Product> Products => Set<Product>();
  public DbSet<Category> Categories => Set<Category>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Product>(entity =>
    {
      entity.HasKey(p => p.Id);

      entity.Property(p => p.ProductName)
        .IsRequired()
        .HasMaxLength(150);

      entity.Property(p => p.UnitPrice)
        .HasColumnType("decimal(18,2)");

      entity.HasOne(p => p.Category)
        .WithMany(c => c.Products)
        .HasForeignKey(p => p.CategoryId);
    });

    modelBuilder.Entity<Category>(entity =>
    {
      entity.HasKey(c => c.Id);

      entity.Property(c => c.CategoryName)
        .IsRequired()
        .HasMaxLength(100);
    });
  }
}
