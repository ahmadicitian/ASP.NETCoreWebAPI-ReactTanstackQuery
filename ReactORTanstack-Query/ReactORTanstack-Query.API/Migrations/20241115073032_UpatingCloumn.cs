using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactORTanstack_Query.API.Migrations
{
    /// <inheritdoc />
    public partial class UpatingCloumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblEmployees_tblDeparments_DepartmentId",
                table: "tblEmployees");

            migrationBuilder.AddForeignKey(
                name: "FK_tblEmployees_tblDeparments_DepartmentId",
                table: "tblEmployees",
                column: "DepartmentId",
                principalTable: "tblDeparments",
                principalColumn: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblEmployees_tblDeparments_DepartmentId",
                table: "tblEmployees");

            migrationBuilder.AddForeignKey(
                name: "FK_tblEmployees_tblDeparments_DepartmentId",
                table: "tblEmployees",
                column: "DepartmentId",
                principalTable: "tblDeparments",
                principalColumn: "DepartmentId",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
