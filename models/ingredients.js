/**
 * Created by Admin on 3/11/2016.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Ingredient = sequelize.define("Ingredients", {
        idIngredient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // Automatically gets converted to SERIAL for postgres
        },
        Ingredient: DataTypes.STRING(45)
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
               Ingredient.hasMany(models.Recipeingredients);
            },
            findAllIngredient : function (callback) {
                Ingredient.findAll({}).then(callback);
            }
        }
    });

    return Ingredient;
};