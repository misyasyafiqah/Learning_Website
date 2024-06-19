// script.js

$(function () {
    // Planets Drag and Drop
    $(".planet").draggable({ revert: "invalid" });
    $(".orbit").droppable({
        drop: function (event, ui) {
            var planet = $(ui.draggable).data("planet");
            var orbit = $(this).data("orbit");
            if (planet === orbit) {
                $(this).addClass("correct");
                ui.draggable.draggable("disable").appendTo(this);
            }
        }
    });

    // Animals Drag and Drop
    $(".animal").draggable({ revert: "invalid" });
    $(".habitat").droppable({
        drop: function (event, ui) {
            var animal = $(ui.draggable).data("habitat");
            var habitat = $(this).data("habitat");
            if (animal === habitat) {
                $(this).addClass("correct");
                ui.draggable.draggable("disable").appendTo(this);
            }
        }
    });

    // Resizable images
    $(".resizable").resizable();

    // Sortable lunar phases
    $(".sortable").sortable();

    // Datepicker
    $("#datepicker").datepicker();

    // Submit button function
    window.submitAnswers = function () {
        var name = $("#name").val();
        var age = $("#age").val();
        
        if (confirm("Click 'OK' to confirm submission.")) {
            $("#submit-message").text("You have submitted your answers!");
        } else {
            $("#submit-message").text("You canceled the submission.");
        }
    };

    // Reset button function
    window.resetForm = function () {
        location.reload();
    };
});
