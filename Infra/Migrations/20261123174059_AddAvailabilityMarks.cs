using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AskDate.Infra.Migrations
{
    /// <summary>
    /// Introduces typed personal availability marks (whole-day or time intervals) and turns the
    /// v2.1 "marking mode" into the single "unmarked days are free" preference — without losing
    /// the stored values.
    /// </summary>
    public partial class AddAvailabilityMarks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // v2.1 stored "which days do I mark" as an int: 0 = "I mark free days", 1 = "I mark busy days".
            // The only thing kept from it is the inverted default of value 1 ("I'm free unless marked
            // busy"), so the column is renamed and converted in place instead of being dropped and re-added.
            migrationBuilder.RenameColumn(
                name: "AvailabilityMode",
                table: "Participants",
                newName: "UnmarkedDaysFree");

            // The integer default cannot be cast to boolean, so it is dropped first (EF always supplies the value).
            migrationBuilder.Sql(
                """
                ALTER TABLE "Participants" ALTER COLUMN "UnmarkedDaysFree" DROP DEFAULT;
                ALTER TABLE "Participants" ALTER COLUMN "UnmarkedDaysFree" TYPE boolean USING "UnmarkedDaysFree" = 1;
                """);

            migrationBuilder.CreateTable(
                name: "AvailabilityMarks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    ProfileId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    EndTime = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    LastModified = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvailabilityMarks", x => x.Id);
                    table.CheckConstraint("CK_AvailabilityMarks_Interval", "(\"StartTime\" IS NULL AND \"EndTime\" IS NULL) OR (\"StartTime\" IS NOT NULL AND \"EndTime\" > \"StartTime\")");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvailabilityMarks_GroupId_ProfileId_Date",
                table: "AvailabilityMarks",
                columns: new[] { "GroupId", "ProfileId", "Date" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvailabilityMarks");

            migrationBuilder.Sql(
                """
                ALTER TABLE "Participants" ALTER COLUMN "UnmarkedDaysFree" TYPE integer USING CASE WHEN "UnmarkedDaysFree" THEN 1 ELSE 0 END;
                ALTER TABLE "Participants" ALTER COLUMN "UnmarkedDaysFree" SET DEFAULT 0;
                """);

            migrationBuilder.RenameColumn(
                name: "UnmarkedDaysFree",
                table: "Participants",
                newName: "AvailabilityMode");
        }
    }
}
