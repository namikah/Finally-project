using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class tarifAndSeatTypeRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SeatTypeId",
                table: "Tariffs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tariffs_SeatTypeId",
                table: "Tariffs",
                column: "SeatTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tariffs_SeatTypes_SeatTypeId",
                table: "Tariffs",
                column: "SeatTypeId",
                principalTable: "SeatTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tariffs_SeatTypes_SeatTypeId",
                table: "Tariffs");

            migrationBuilder.DropIndex(
                name: "IX_Tariffs_SeatTypeId",
                table: "Tariffs");

            migrationBuilder.DropColumn(
                name: "SeatTypeId",
                table: "Tariffs");
        }
    }
}
