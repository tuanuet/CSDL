var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/recipe', function(req, res) {
  	models.Recipes.findRecipe(req.param.a,function (recipe) {
		res.json(recipe)
	})
});
/*
* lam theo tung cong doan
* b1: Indert FoodCate xem co ko ?  neu co thi tra ve 304 , neu khong thi =>B2
* B2: Insert Recipe xem co ko ? neu co thi tra ve 304, neu ko thi => b3
* B3: Tim kiem All Ingredient lay ra id de thuc hien B4
* B4: Insert vao bang RecipeIngredient vs 2 tham so idRecipe vs idIngredient
* */
router.post('/insert',insertFoodCate,insertRecipe,findIngredientByName,insertToRecipeIngredient,function(req, res) {
	res.send("ok")
});
function insertFoodCate(req,res,next) {

	models.Foodcategories.insertFoodCategory(req.body.FoodCategories,function (food) {
		if(food[1]){
			return next(food);
		}
		else {
			res.json({msg : "ton tai foodCate",status : 304})
		}

	})
}
function insertRecipe(food,req,res,next) {
	var idFoodCate = food[0].dataValues.idFoodCategories;
	var body = req.body;
	var recipe ={
		RecipeName: body.RecipeName,
		RecipeDescription: body.RecipeDescription,
		Source: body.Source,
		Vegetarian: parseInt(body.Vegeterian),
		NumberOfServings : body.NumberOfServings,
		TimeToPrepare: body.TimeToPrepare,
		CaloriesPerServing: body.CaloriesPerServing,
		NutritionalInformation: body.NutritionalInformation,
		Instructions: body.Instructions,
		Utensils: body.Utensils,
		FoodcategoryIdFoodCategories : idFoodCate
	}
	models.Recipes.insertRecipe(recipe,function (recipe) {

		return next(recipe)
	})

}
function findIngredientByName(recipe,req,res,next) {
	var names = new Array();
	//dua tat ca ca Ingredient name vao mang name
	names.push(req.body.Ingredient)
	console.log(names)
	models.Ingredients.findIngredientByName(names,function (ingredient) {
		var Obj = {
			idRecipe : recipe[0].dataValues.idRecipe,
			Ingredient : ingredient
		}
		return next(Obj);
	})
}
function insertToRecipeIngredient(data,req,res,next) {
	console.log(data.Ingredient[0].dataValues)
	return next();
}



router.get('/', function(req, res) {
	models.Ingredients.findAllIngredient(function (ingredients) {
		res.render('Themthucan',{
			title: "Insert Recipe",
			Ingredients : ingredients
		})
	})

});
router.get('/food', function(req, res) {
    var idRecipe = req.query.id;
    console.log(idRecipe)
	models.Recipes.findRecipeById(idRecipe,models,function (recipeFood) {
		res.json(recipeFood)
	})
});
router.get('/ingredient', function(req, res) {
	models.Ingredients.findAllIngredient(function (ingredients) {
		res.json(ingredients)
	})
});
router.get('/allfood', function(req, res) {
    models.Recipes.findAllRecipe(models,function (recipeFood) {
        res.render('Tatcathucan',
            {
                title : "Tất cả các món ăn",
                Recipes : recipeFood
            }
        )

    })
});
module.exports = router;