using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class mapUrlAddCinema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MapUrl",
                table: "Cinemas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MapUrl",
                table: "Cinemas");
        }
    }
}
