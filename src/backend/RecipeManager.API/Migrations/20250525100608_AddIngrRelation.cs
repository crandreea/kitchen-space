using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeManager.API.Migrations
{
    /// <inheritdoc />
    public partial class AddIngrRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_Recipes_RecipeId",
                table: "Ingredient");

            migrationBuilder.DropForeignKey(
                name: "FK_Instruction_Recipes_RecipeId",
                table: "Instruction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instruction",
                table: "Instruction");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient");

            migrationBuilder.RenameTable(
                name: "Instruction",
                newName: "Instructions");

            migrationBuilder.RenameTable(
                name: "Ingredient",
                newName: "Ingredients");

            migrationBuilder.RenameIndex(
                name: "IX_Instruction_RecipeId",
                table: "Instructions",
                newName: "IX_Instructions_RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredient_RecipeId",
                table: "Ingredients",
                newName: "IX_Ingredients_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instructions",
                table: "Instructions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId",
                table: "Ingredients",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Instructions_Recipes_RecipeId",
                table: "Instructions",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Recipes_RecipeId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Instructions_Recipes_RecipeId",
                table: "Instructions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Instructions",
                table: "Instructions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients");

            migrationBuilder.RenameTable(
                name: "Instructions",
                newName: "Instruction");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingredient");

            migrationBuilder.RenameIndex(
                name: "IX_Instructions_RecipeId",
                table: "Instruction",
                newName: "IX_Instruction_RecipeId");

            migrationBuilder.RenameIndex(
                name: "IX_Ingredients_RecipeId",
                table: "Ingredient",
                newName: "IX_Ingredient_RecipeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Instruction",
                table: "Instruction",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_Recipes_RecipeId",
                table: "Ingredient",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Instruction_Recipes_RecipeId",
                table: "Instruction",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
