var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
	models.Ingredients.findAllIngredient(function (ingredients) {
		res.render('Themthucan',{
			title: "Insert Recipe",
			Ingredients : ingredients
		})
	})

});

router.get('/recipe', function(req, res) {
  	models.Recipes.findRecipe(req.param.a,function (recipe) {
		res.json(recipe)
	})
});

/**
	* show json cho tuan
	**/
router.post('/showjson', function(req, res) {
		console.log('body: ' + JSON.stringify(req.body));
		res.send(req.body);
});


/*
* lam theo tung cong doan
* b1: Indert FoodCate xem co ko ?  neu co thi tra ve 304 , neu khong thi =>B2
* B2: Insert Recipe xem co ko ? neu co thi tra ve 304, neu ko thi => b3
* B3: Tim kiem All Ingredient lay ra id de thuc hien B4
* B4: Insert vao bang RecipeIngredient vs 2 tham so idRecipe vs idIngredient
* B5: send 1 json stuatus ve
* */
router.post('/insert',insertFoodCate,insertRecipe,insertToRecipeIngredient,function(req, res) {
	res.send({
		status: 200,
		redirect : "/allfood"
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
// function findIngredientByName(recipe,req,res,next) {
//
// 	var names = new Array();
// 	//dua tat ca ca Ingredient name vao mang name
// 	names.push(req.body.Ingredient)
//
// 	console.log(names)
// 	models.Ingredients.findIngredientByName(names,function (ingredient) {
// 		var Obj = {
// 			idRecipe : recipe[0].dataValues.idRecipe,
// 			Ingredient : ingredient
// 		}
// 		return next(Obj);
// 	})
// }

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
 * B1: delete bang RecipeIngredient with id
 * B2: Delete Recipe with id
 * B3: send 1 status ve
 */
router.post('/delete',deleteRecipeIngredient,deleteRecipe,function (req,res) {
	res.json({
		status : 200,
		msg : "Delete thanh cong"
	})
})
function deleteRecipeIngredient(req,res,next) {
	var ids = new Array();
	ids.push(37)
	models.Recipeingredients.deleteRecipeIngredients(ids,function (recipeIngredient,isLast) {
		if(isLast==true){
			console.log(recipeIngredient)
			return next();
		}
	})
}
function deleteRecipe(req,res,next) {
	var idRecipe = 41
	models.Recipes.deleteRecipe(idRecipe,function (arg1,arg2) {
		return next();
	})
}
router.get('/food', function(req, res) {
    var idRecipe = req.query.id;
    console.log(idRecipe)
	models.Recipes.findRecipeById(idRecipe,models,function (recipeFood) {
		res.render('chitietthucan',{
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
