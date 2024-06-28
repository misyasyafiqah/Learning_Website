// scripts.js

$(function() {
    // Datepicker Initialization
    $("#datepicker").datepicker();

    // Drag and Drop for Planets and Animals
    $(".planet, .animal").draggable({
        revert: "invalid",
        stack: ".planet, .animal"
    });

    $(".orbit").droppable({
        accept: ".planet",
        drop: function(event, ui) {
            var planet = ui.draggable.data("planet");
            var orbit = $(this).data("orbit");
            if (planet === orbit) {
                $(this).addClass("correct");
            }
        }
    });

    $(".habitat").droppable({
        accept: ".animal",
        drop: function(event, ui) {
            var animal = ui.draggable.data("habitat");
            var habitat = $(this).data("habitat");
            if (animal === habitat) {
                $(this).addClass("correct");
            }
        }
    });

    // Resize Functionality
    $(".resizable").resizable({
        aspectRatio: true
    });

    // Sortable Functionality
    $(".sortable").sortable();

    // Periodic Table Quiz
    $(".element").click(function() {
        var symbol = $(this).data("symbol");
        if (symbol === "H") { // Replace with dynamic check
            $(this).addClass("correct");
        }
    });

    // Check Answers and Update Progress
    function checkAnswers() {
        var totalQuestions = 8; // Update total number of questions
        var correctAnswers = 0;

        // Check Drag and Drop
        correctAnswers += $(".orbit.correct").length;
        correctAnswers += $(".habitat.correct").length;

        // Check Fill in the Blanks
        var fillBlank1 = $("#fill-blank-1").val().trim().toLowerCase();
        if (fillBlank1 === "star") {
            correctAnswers++;
        }

        var fillBlank2 = $("#fill-blank-2").val().trim();
        if (fillBlank2 === "8") {
            correctAnswers++;
        }

        // Check Trivia Questions
        $(".trivia-question").each(function() {
            var selectedAnswer = $(this).find("input:checked").val();
            if (selectedAnswer) {
                correctAnswers++;
            }
        });

        // Calculate Progress
        var progress = (correctAnswers / totalQuestions) * 100;
        $("#progress-bar").css("width", progress + "%");
        $("#progress-text").text(progress.toFixed(0) + "% Completed");

        return progress;
    }

// Submit Answers
window.submitAnswers = function() {
    var progress = checkAnswers();
    if (progress === 100) {
        $("#submit-message").text("Congratulations! You have completed all activities!");
        // Redirect to certificate.html
        window.location.href = "certificate.html";
    } else {
        $("#submit-message").text("Keep going! You have completed " + progress.toFixed(0) + "% of the activities.");
    }
};


    // Reset Form
    window.resetForm = function() {
        // Reset All Inputs and Styles
        $("input[type='text'], input[type='number']").val("");
        $(".orbit, .habitat, .element").removeClass("correct");
        $(".sortable").sortable("cancel");
        $(".resizable").resizable("destroy").resizable({ aspectRatio: true });
        $(".trivia-question input").prop("checked", false);
        $("#progress-bar").css("width", "0");
        $("#progress-text").text("");
        $("#submit-message").text("");
    };
});
