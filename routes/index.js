var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/recipe', function(req, res) {
  	models.Recipes.findRecipe(req.param.a,function (recipe) {
		res.json(recipe)
	})
});
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