// apy key --> B4zwRLxtvL7eov816I6BWKo2R6q6ZrKx

$(document).ready(function () {

// random topics
var topics = ["Cat", "Dog", "Panda", "Friends", "HIMYM"];

// create buttons
function createBtn() { 
	$('#display-buttons').empty();
	for (var i = 0; i < topics.length; i++){
		var btn = $('<button>') 
		btn.addClass("button-text");
		btn.attr('data-name', topics[i]);
		btn.text(topics[i]);
		$('#display-buttons').append(btn);
	}
}

// grab input value from user input and push to array
$("#addGif").on("click", function(){
	var search = $("#user-input").val().trim();
	topics.push(search);
	createBtn();
})

// display gifs
function render() {
	var search = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=B4zwRLxtvL7eov816I6BWKo2R6q6ZrKx";
		$.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function (response) {
            $("#display-gifs").empty();
			console.log(response.data);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gifs")
				var gifs = $("<img>");
				gifs.attr("src", results[i].images.fixed_height_still.url);
				gifs.attr("data-still", results[i].images.fixed_height_still.url);
				gifs.attr("data-state", "still");
				gifs.addClass("gifs");
				gifs.attr("data-animate", results[i].images.fixed_height.url);
				var rating = results[i].rating;
				var p = $("<p>").text('Rating: ' + rating.toUpperCase());
				gifDiv.append(gifs);
				gifDiv.append(p);
				$("#display-gifs").prepend(gifDiv);
			}	
		});
}

// toggle animate & still
$(document).on('click', '.gifs', function() {
	var state = $(this).attr('data-state');
		if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
});

$(document).on("click", ".button-text", render);

createBtn();

});