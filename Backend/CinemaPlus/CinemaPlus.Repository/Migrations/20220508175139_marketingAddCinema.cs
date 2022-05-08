using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class marketingAddCinema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MarketingMail",
                table: "Cinemas",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MarketingMail",
                table: "Cinemas");
        }
    }
}
