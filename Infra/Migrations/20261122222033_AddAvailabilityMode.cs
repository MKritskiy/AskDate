using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AskDate.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddAvailabilityMode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvailabilityMode",
                table: "Participants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailabilityMode",
                table: "Participants");
        }
    }
}
