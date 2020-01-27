$(document).ready(function() {
    $("#createList").click(function(){
        var wordNumber = $("#wordNumber").val();
        $('#wordList').empty();
        $('#wordList2').empty();
        for(var number = 0; number < wordNumber; number++) {
            var newWord = "";
            do {
                newWord = createWord("");
            } while (newWord.length > 20 || newWord.length < 2);
            var newWordNoPhonemes = replacePhonemes(newWord);
            var li1Element = "<li class=\"list-group-item list-group-item-action\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Click to copy\">";
            var li2Element = "</li>";
            $("#wordList").append(li1Element + newWord + li2Element);
            $("#wordList2").append(li1Element + newWordNoPhonemes + li2Element);
        }
        $("li").click(function(event) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(this).text()).select();
            document.execCommand("copy");
            $temp.remove();
        });
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    });
});