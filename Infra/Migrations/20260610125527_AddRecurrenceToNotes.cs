using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AskDate.Infra.Migrations
{
    /// <inheritdoc />
    public partial class AddRecurrenceToNotes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentNoteId",
                table: "Notes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecurrenceCount",
                table: "Notes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RecurrenceDaysOfWeek",
                table: "Notes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RecurrenceEndDate",
                table: "Notes",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RecurrenceInterval",
                table: "Notes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RecurrenceType",
                table: "Notes",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentNoteId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "RecurrenceCount",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "RecurrenceDaysOfWeek",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "RecurrenceEndDate",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "RecurrenceInterval",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "RecurrenceType",
                table: "Notes");
        }
    }
}
