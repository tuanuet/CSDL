var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/recipe', function(req, res) {
  	models.Recipes.findRecipe(req.param.a,function (recipe) {
		res.json(recipe)
	})
});
router.get('/food', function(req, res) {
	models.Foodcategories.findFood(req.param.a,function (food) {
		res.json(food)
	})
});
module.exports = router;