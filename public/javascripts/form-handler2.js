$(document).ready(function() {
  $('#saveRecipe').click(function() {
      var recipe = {
      idRecipe : document.getElementsByTagName("p")[0].innerHTML,
      RecipeName: $('#recipename').val(),
      FoodCategories: $('#FoodCategories').val(),
      RecipeDescription: $('#RecipeDescription').val(),
      Source: $('#Source').val(),
      Vegetarian: $('#Vegeterian').is(':checked') ? 1 : 0,
      NumberOfServings : $('#NumberOfServings').val(),
      TimeToPrepare: $('#timetoprepare').val(),
      CaloriesPerServing: $('#CaloriesPerServing').val(),
      NutritionalInformation: $('#NutritionalInformation').val(),
      Instructions: $('#instructions').val(),
      Utensils: $('#Utensils').val(),
      list : "",
    }

    //make the AJAX call
    $.ajax({
      url: '/save',
      type: 'post',
      data: JSON.stringify(recipe),
      contentType: 'application/json',
      success: function(data) {
        console.log(recipe);
        window.location = "/";
      }
    });
  })
})
