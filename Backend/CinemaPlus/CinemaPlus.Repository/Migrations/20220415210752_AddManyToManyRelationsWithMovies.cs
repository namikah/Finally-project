using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class AddManyToManyRelationsWithMovies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DetailId",
                table: "Movies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Movies_DetailId",
                table: "Movies",
                column: "DetailId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Details_DetailId",
                table: "Movies",
                column: "DetailId",
                principalTable: "Details",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Details_DetailId",
                table: "Movies");

            migrationBuilder.DropIndex(
                name: "IX_Movies_DetailId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "DetailId",
                table: "Movies");
        }
    }
}
