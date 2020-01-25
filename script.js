$(document).ready(function() {
    $("button").click(function(){
        var wordNumber = $("#wordNumber").val();
        $("#wordList").empty();
        for(var number = 0; number < wordNumber; number++) {
            var newWord = createWord("");
            var newWordPhonemes = replacePhonemes(newWord);
            $("#wordList").append("<p>" + newWord + "\t" + newWordPhonemes + "</p></br>");
        }
    });
});