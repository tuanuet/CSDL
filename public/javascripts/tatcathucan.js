/**
 * Created by Admin on 16/11/2016.
 */
$(document).ready(function() {
    $('.btn-danger').click(function () {
        var idRecipe = $(this).attr('value');

        var data = {
            idRecipe : idRecipe
        }
        $.ajax({
            url: '/delete',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(data) {
                console.log("OK OK")
            }
        });
    });
});