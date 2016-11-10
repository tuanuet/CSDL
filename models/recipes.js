/**
 * Created by Admin on 3/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipes", {
        idRecipe: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        RecipeName: DataTypes.STRING(45),
        RecipeDescription: DataTypes.STRING(45),
        Source: DataTypes.STRING(45),
        Vegetarian: DataTypes.INTEGER,
        NumberOfServings : DataTypes.INTEGER,
        TimeToPrepare: DataTypes.INTEGER,
        CaloriesPerServing: DataTypes.INTEGER,
        NutritionalInformation: DataTypes.TEXT,
        Instructions: DataTypes.TEXT,
        Utensils: DataTypes.TEXT,
        FoodcategoryIdFoodCategories:DataTypes.INTEGER
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Recipe.hasMany(models.Recipeingredients);
                Recipe.belongsTo(models.Foodcategories, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            findRecipe: function(id,callback){
                Recipe.findAll({}).then(callback);
            },
            findAllRecipe : function (models,callback) {
                Recipe.findAll({
                    attributes: ['idRecipe','RecipeName','Source','NumberOfServings','TimeToPrepare','CaloriesPerServing'],
                    include : [
                        {
                            model: models.Foodcategories,
                            attributes : ['FoodCategory']
                        }
                    ]
                }).then(callback)
            },
            findRecipeById : function (id,models,callback) {
                Recipe.findAll({
                    where: {idRecipe : id},
                    include : [
                        {
                            model: models.Foodcategories
                        },
                        {
                            model : models.Recipeingredients,
                            include : [
                                {
                                    model : models.Ingredients
                                }
                            ]
                        }
                    ]
                }).then(callback)
            },
            insertRecipe : function (recipe,callback) {
                Recipe.findOrCreate({
                    where : {
                        RecipeName: recipe.RecipeName,
                        RecipeDescription: recipe.RecipeDescription,
                        Source: recipe.Source,
                        Vegetarian:recipe.Vegetarian ,
                        NumberOfServings : recipe.NumberOfServings,
                        TimeToPrepare: recipe.TimeToPrepare,
                        CaloriesPerServing: recipe.CaloriesPerServing,
                        NutritionalInformation: recipe.NutritionalInformation,
                        Instructions: recipe.Instructions,
                        Utensils: recipe.Utensils,
                        FoodcategoryIdFoodCategories : recipe.FoodcategoryIdFoodCategories
                    }
                }).then(callback)
            }
        }
    });

    return Recipe;
};