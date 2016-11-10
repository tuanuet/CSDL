/**
 * Created by Admin on 3/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Foodcategories = sequelize.define("Foodcategories", {
        idFoodCategories: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        FoodCategory: DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                 Foodcategories.hasMany(models.Recipes);
            },
            findFood: function(callback){
                Foodcategories.findAll({}).then(callback);
            },
            findFoodCategory : function (name,models,callback) {
                console.log(name)
                Foodcategories.findAll({
                    where : {FoodCategory: name},
                    include : [
                        {
                            model : models.Recipes,
                            attributes : ['RecipeName','RecipeDescription','NumberOfServings','CaloriesPerServing'],
                            include : [
                                {
                                    model : models.Recipeingredients,
                                    attributes : ['Quantity','Comments'],
                                    include : [
                                        {
                                            model : models.Ingredients,
                                            attributes: ['Ingredient']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }).then(callback)
            },
            insertFoodCategory : function (name,callback) {
                Foodcategories.findOrCreate({
                    where : {FoodCategory: name}
                }).then(callback)
            }
        }


    });

    return Foodcategories;
};