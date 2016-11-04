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
        Utensils: DataTypes.TEXT
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // Recipe.hasMany(models.Recipeingredients);
                // Recipe.belongsTo(models.Foodcategories, {
                //     onDelete: "CASCADE",
                //     foreignKey: {
                //         allowNull: false
                //     }
                // });
            },
            findRecipe: function(id,callback){
                Recipe.findAll({}).then(callback);
            }
        }
    });

    return Recipe;
};