using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace webapi.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreInfoToCards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6cf31de4-e9b9-4339-bd54-8e7dcb8989f4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1dc872d-9540-4676-820e-a312c230dad5");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Card");

            migrationBuilder.AlterColumn<string>(
                name: "Subname",
                table: "Card",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<short>(
                name: "Cost",
                table: "Card",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<bool>(
                name: "IsBorderless",
                table: "Card",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsFoil",
                table: "Card",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Card",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Release",
                table: "Card",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<short>(
                name: "Strength",
                table: "Card",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "Willpower",
                table: "Card",
                type: "smallint",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "09947360-7a56-4d6a-88db-bfe057d0fb64", null, "Administrator", "ADMINISTRATOR" },
                    { "7c6920e7-9e8c-495a-87b4-1aba43d655d0", null, "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "09947360-7a56-4d6a-88db-bfe057d0fb64");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7c6920e7-9e8c-495a-87b4-1aba43d655d0");

            migrationBuilder.DropColumn(
                name: "IsBorderless",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "IsFoil",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "Release",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "Strength",
                table: "Card");

            migrationBuilder.DropColumn(
                name: "Willpower",
                table: "Card");

            migrationBuilder.AlterColumn<string>(
                name: "Subname",
                table: "Card",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Cost",
                table: "Card",
                type: "int",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Card",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6cf31de4-e9b9-4339-bd54-8e7dcb8989f4", null, "Member", "MEMBER" },
                    { "a1dc872d-9540-4676-820e-a312c230dad5", null, "Administrator", "ADMINISTRATOR" }
                });
        }
    }
}
