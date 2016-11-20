var listIngredient = new Array();

$(document).ready(function() {
  $('#submitRecipe').click(submitRecipeToDB);
  $('#addIngredient').click(addIngredientToRecipe);
});

/*
* post data to server
*/
function submitRecipeToDB(evt) {
     var testForm = document.getElementById('recipe-form');

      // //prevent form submission
      // evt.preventDefault();
      // evt.stopPropagation();

      var recipe = {
    		RecipeName: $('#recipename').val(),
        FoodCategories: $('#FoodCategories').val(),
    		RecipeDescription: $('#RecipeDescription').val(),
    		Source: $('#Source').val(),
    		Vegetarian: $('input[name=Vegeterian]:checked', '#Vegeterian').val(),
    		NumberOfServings : $('#NumberOfServings').val(),
    		TimeToPrepare: $('#timetoprepare').val(),
    		CaloriesPerServing: $('#CaloriesPerServing').val(),
    		NutritionalInformation: $('#NutritionalInformation').val(),
    		Instructions: $('#instructions').val(),
    		Utensils: $('#Utensils').val(),
    		list : listIngredient,
    	}

      //make the AJAX call
      $.ajax({
        url: '/insert',
				type: 'post',
        data: JSON.stringify(recipe),
			  contentType: 'application/json',
        success: function(data) {
              window.location.reload();
        }
      });
  }

  function addIngredientToRecipe(evt) {
    var form_ingredient = document.getElementById('addIngredient-form');
    var ingre = document.getElementById('ingredient');
    if (document.getElementById('quantity').value != "") {
      if (!containsIngredient(ingre.selectedIndex, listIngredient)) {
        var row = '<tr><th scope="row">' + ingre.options[ingre.selectedIndex].innerHTML
                  + '</th><td>'+ document.getElementById('quantity').value
                  + '</td><td>'+ document.getElementById('comments').value
                  + ' </td></tr>';
        listIngredient.push({
            idIngredient: ingre.selectedIndex,
            Quantity: document.getElementById('quantity').value ,
            Comments: document.getElementById('comments').value
        });
        $("tbody").append(row);
      }
    } else {
      alert("Nhap so luong!!!");
    }
  }

function containsIngredient(ingredient, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].idrecipeIngredient == ingredient) {
            return true;
        }
    }
    return false;
}
