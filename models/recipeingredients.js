/**
 * Created by Admin on 3/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Recipeingredient = sequelize.define("Recipeingredients", {
        idrecipeIngredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Quantity: DataTypes.INTEGER,
        Comments : DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Recipeingredient.belongsTo(models.Recipes, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
                Recipeingredient.belongsTo(models.Ingredients, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            },
            findAllRecipeIngredient : function (name,models,callback) {
                console.log(name)
                Recipeingredient.findAll({
                    include : [
                        { model : models.Ingredients,attributes : ['Ingredient']},
                        { model :
                            models.Recipes,
                            attributes :
                                ['RecipeName','RecipeDescription','NumberOfServings','CaloriesPerServing'],
                            include: [
                                {
                                    model: models.Foodcategories,
                                    where :{FoodCategory: name},
                                    attributes: ['FoodCategory']
                                }]}
                    ]
                }).then(callback)
            }

        }
    });

    return Recipeingredient;
};