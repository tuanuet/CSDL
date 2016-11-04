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
                // Foodcategories.hasMany(models.Recipes);
            },
            findFood: function(name,callback){
                Foodcategories.findAll({}).then(callback);
            }
        }


    });

    return Foodcategories;
};