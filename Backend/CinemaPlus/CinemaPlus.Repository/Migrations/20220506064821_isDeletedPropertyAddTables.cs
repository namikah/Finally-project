using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class isDeletedPropertyAddTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Tickets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Tariffs",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Sessions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "News",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Tariffs");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "News");
        }
    }
}
