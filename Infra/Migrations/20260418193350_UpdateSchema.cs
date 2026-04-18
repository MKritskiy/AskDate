using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AskDate.Infra.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Participants",
                newName: "ProfileId");

            migrationBuilder.RenameColumn(
                name: "CreatorId",
                table: "Notes",
                newName: "CreatorProfileId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "NoteConfirmations",
                newName: "ProfileId");

            migrationBuilder.RenameColumn(
                name: "CreatorId",
                table: "Groups",
                newName: "CreatorProfileId");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Comments",
                newName: "AuthorProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "Participants",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "CreatorProfileId",
                table: "Notes",
                newName: "CreatorId");

            migrationBuilder.RenameColumn(
                name: "ProfileId",
                table: "NoteConfirmations",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "CreatorProfileId",
                table: "Groups",
                newName: "CreatorId");

            migrationBuilder.RenameColumn(
                name: "AuthorProfileId",
                table: "Comments",
                newName: "AuthorId");
        }
    }
}
