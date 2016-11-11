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
        Comments : DataTypes.STRING(45),
        RecipeIdRecipe : DataTypes.INTEGER,
        IngredientIdIngredient : DataTypes.INTEGER
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
            },
            insertRecipeIngredients : function (data,callback) {

                for(var i=0;i<data.length;i++){
                    Recipeingredient.findOrCreate({
                        where : {
                            IngredientIdIngredient : data[i].IngredientIdIngredient,
                            RecipeIdRecipe : data[i].RecipeIdRecipe,
                            Comments : data[i].Comments, //comment va quantity lay trong mang
                            Quantity: data[i].Quantity
                        }
                    }).then(function (recipeIngredient) {
                        if(i==data.length){
                            callback(recipeIngredient,true)
                        }else {
                            callback(recipeIngredient,false)
                        }
                    })
                }

            },
            deleteRecipeIngredients : function (ids,callback) {
                for(var i=0;i<ids.length;i++){
                    Recipeingredient.destroy({
                        where : {idrecipeIngredient : ids[i]}
                    })
                    .then(function(recipeIngredient) {
                        if(i==ids.length){
                            callback(recipeIngredient,true)
                        }else {
                            callback(recipeIngredient,false)
                        }
                    })
                }
            }
        }
    });

    return Recipeingredient;
};