var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    models.Recipes.findAllRecipe(models,function (recipeFood) {
        res.render('allfood',{
                title : "Tất cả các món ăn",
                Recipes : recipeFood
            }
        )

    })
});

router.get('/insertRecipe', function(req, res) {
	models.Ingredients.findAllIngredient(function (ingredients) {
		res.render('insertrecipe',{
			title: "Thêm công thức - Insert Recipe",
			Ingredients : ingredients
		})
	})
});

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
* B5: send 1 json stuatus ve
* */
router.post("/insert",insertFoodCate,insertRecipe,insertToRecipeIngredient,function(req, res) {
	res.send({
		status: 200,
		redirect : "/"
	})
});
function insertFoodCate(req,res,next) {
	models.Foodcategories.insertFoodCategory(req.body.FoodCategories,function (food) {
		return next(food);
	})
}
function insertRecipe(food,req,res,next) {
	var idFoodCate = food[0].dataValues.idFoodCategories;
	var body = req.body;
	var recipe ={
		RecipeName: body.RecipeName,
		RecipeDescription: body.RecipeDescription,
		Source: body.Source,
		Vegetarian: parseInt(body.Vegetarian),
		NumberOfServings : parseInt(body.NumberOfServings),
		TimeToPrepare: parseInt(body.TimeToPrepare),
		CaloriesPerServing: parseInt(body.CaloriesPerServing),
		NutritionalInformation: body.NutritionalInformation,
		Instructions: body.Instructions,
		Utensils: body.Utensils,
		FoodcategoryIdFoodCategories : idFoodCate
	}
	models.Recipes.insertRecipe(recipe,function (recipe) {
		return next(recipe)
	})

}

function insertToRecipeIngredient(recipe,req,res,next) {
	var idRecipe = recipe[0].dataValues.idRecipe;
	var listRecipeIngredient = req.body.list;

	console.log(idRecipe)
	console.log(listRecipeIngredient)
	var dataValidate = new Array();
	for(var i=0;i<listRecipeIngredient.length;i++){
		var RecordRecipeIngredients = {
			IngredientIdIngredient: parseInt(listRecipeIngredient[i].idIngredient),
			RecipeIdRecipe: idRecipe,
			Comments: listRecipeIngredient[i].Comments, //comment va quantity lay trong mang
			Quantity: parseInt(listRecipeIngredient[i].Quantity)
		}
		dataValidate.push(RecordRecipeIngredients)
	}
	models.Recipeingredients.insertRecipeIngredients(dataValidate,function (isLast) {
		console.log(isLast)
		if (isLast == true)
			return next();
	})

}

/*
 * lam theo tung con doan
 * B1: delete bang RecipeIngredient with idRecipe
 * B2: Delete Recipe with idRecipe
 * B3: send 1 status ve
 */
router.post('/delete',deleteRecipeIngredient,deleteRecipe,function (req,res) {
	res.json({
		status : 200,
		msg : "Delete thanh cong",
	})
})
function deleteRecipeIngredient(req,res,next) {
	var idRecipe = req.body.idRecipe;
	models.Recipeingredients.deleteRecipeIngredientByIdRecipe(idRecipe,function () {
		return next();
	})
}
function deleteRecipe(req,res,next) {
	var idRecipe = req.body.idRecipe;
	models.Recipes.deleteRecipe(idRecipe,function () {
		return next();
	})
}
router.get('/food', function(req, res) {
    var idRecipe = req.query.id;
	  models.Recipes.findRecipeById(idRecipe,models,function (recipeFood) {
		res.render('fooddetail',{
			title : "Chi tiết thức ăn",
			Recipe : recipeFood
		})
	})
});
router.get('/ingredient', function(req, res) {
	models.Ingredients.findAllIngredient(function (ingredients) {
		res.json(ingredients)
	})
});

router.post("/save", updateRecipes , updateRecipeIngredients, function(req,res) {
  res.send({
		status: 200,
		redirect : "/"
	})
});

function updateRecipes(req, res, next) {
 var body = req.body;
 var recipe ={
   idRecipe : parseInt(body.idRecipe),
   RecipeName: body.RecipeName,
   RecipeDescription: body.RecipeDescription,
   Source: body.Source,
   Vegetarian: parseInt(body.Vegetarian),
   NumberOfServings : parseInt(body.NumberOfServings),
   TimeToPrepare: parseInt(body.TimeToPrepare),
   CaloriesPerServing: parseInt(body.CaloriesPerServing),
   NutritionalInformation: body.NutritionalInformation,
   Instructions: body.Instructions,
   Utensils: body.Utensils,
   FoodcategoryIdFoodCategories : body.FoodcategoryIdFoodCategories
 }
 models.Recipes.updateRecipe(recipe, function() {
   return next;
 })
}

function updateRecipeIngredients(req, res, next) {
  models.Recipeingredients.deleteRecipeIngredientByIdRecipe(req.body.idRecipe, function(idRecipe, req, res) {
    var listRecipeIngredient = req.body.list;
    var dataValidate = new Array();
  	for(var i=0;i<listRecipeIngredient.length;i++){
  		var RecordRecipeIngredients = {
  			IngredientIdIngredient: parseInt(listRecipeIngredient[i].idIngredient),
  			RecipeIdRecipe: idRecipe,
  			Comments: listRecipeIngredient[i].Comments, //comment va quantity lay trong mang
  			Quantity: parseInt(listRecipeIngredient[i].Quantity)
  		}
  		dataValidate.push(RecordRecipeIngredients)
  	}
  	models.Recipeingredients.updateRecipeingredients(req.body.idRecipe,dataValidate,function (isLast) {
  		if (isLast == true)
  			return next();
  	})
  })
}

module.exports = router;
