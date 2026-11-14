using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Infrastructure;
using ClimaCidadao.Api.Data;

#nullable disable
namespace ClimaCidadao.Api.Migrations;

[DbContext(typeof(AppDbContext))]
[Migration("202611110001_InitialCreate")]
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(name: "Readings", columns: table => new { Id = table.Column<long>(nullable: false).Annotation("Sqlite:Autoincrement", true), TemperatureC = table.Column<double>(nullable: false), HumidityPercent = table.Column<double>(nullable: false), Source = table.Column<string>(maxLength: 40, nullable: false), Neighborhood = table.Column<string>(maxLength: 80, nullable: false), ObservedAtUtc = table.Column<DateTime>(nullable: false) }, constraints: table => table.PrimaryKey("PK_Readings", x => x.Id));
        migrationBuilder.CreateTable(name: "Reports", columns: table => new { Id = table.Column<long>(nullable: false).Annotation("Sqlite:Autoincrement", true), Category = table.Column<string>(maxLength: 30, nullable: false), Neighborhood = table.Column<string>(maxLength: 80, nullable: false), Description = table.Column<string>(maxLength: 280, nullable: false), CreatedAtUtc = table.Column<DateTime>(nullable: false) }, constraints: table => table.PrimaryKey("PK_Reports", x => x.Id));
        migrationBuilder.CreateTable(name: "SafePoints", columns: table => new { Id = table.Column<int>(nullable: false).Annotation("Sqlite:Autoincrement", true), Name = table.Column<string>(maxLength: 100, nullable: false), Address = table.Column<string>(maxLength: 200, nullable: false), Kind = table.Column<string>(maxLength: 30, nullable: false), Latitude = table.Column<double>(nullable: false), Longitude = table.Column<double>(nullable: false), IsAccessible = table.Column<bool>(nullable: false), IsVerified = table.Column<bool>(nullable: false) }, constraints: table => table.PrimaryKey("PK_SafePoints", x => x.Id));
        migrationBuilder.CreateIndex(name: "IX_Readings_Neighborhood_ObservedAtUtc", table: "Readings", columns: new[] { "Neighborhood", "ObservedAtUtc" });
        migrationBuilder.CreateIndex(name: "IX_Reports_CreatedAtUtc", table: "Reports", column: "CreatedAtUtc");
        // A migração foi mantida autocontida, sem arquivo Designer. SQL explícito evita
        // depender do modelo de destino para traduzir as operações de seed.
        migrationBuilder.Sql("""
            INSERT INTO SafePoints (Id, Address, IsAccessible, IsVerified, Kind, Latitude, Longitude, Name)
            VALUES
              (1, 'R. Peixoto Gomide, 949', 1, 1, 'sombra', -23.5614, -46.6560, 'Parque Trianon'),
              (2, 'Av. Paulista, 1313', 1, 0, 'apoio', -23.5618, -46.6549, 'Centro Cultural Fiesp');
            """);
    }
    protected override void Down(MigrationBuilder migrationBuilder) { migrationBuilder.DropTable("Readings"); migrationBuilder.DropTable("Reports"); migrationBuilder.DropTable("SafePoints"); }
}
