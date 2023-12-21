﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Repository.Migrations
{
    public partial class addedfieldIncludedServiceintracking : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IncludedService",
                table: "PD_Trackings",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IncludedService",
                table: "PD_Trackings");
        }
    }
}
