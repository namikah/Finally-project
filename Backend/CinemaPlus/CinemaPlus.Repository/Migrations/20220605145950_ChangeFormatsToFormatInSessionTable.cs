using Microsoft.EntityFrameworkCore.Migrations;

namespace CinemaPlus.Repository.Migrations
{
    public partial class ChangeFormatsToFormatInSessionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FormatId",
                table: "Sessions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_FormatId",
                table: "Sessions",
                column: "FormatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_Formats_FormatId",
                table: "Sessions",
                column: "FormatId",
                principalTable: "Formats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_Formats_FormatId",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_FormatId",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "FormatId",
                table: "Sessions");
        }
    }
}
