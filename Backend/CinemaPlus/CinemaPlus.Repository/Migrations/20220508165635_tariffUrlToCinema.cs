using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class tariffUrlToCinema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TarifUrl",
                table: "Cinemas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TarifUrl",
                table: "Cinemas");
        }
    }
}
