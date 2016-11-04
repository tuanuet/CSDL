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
            }

        }
    });

    return Recipeingredient;
};