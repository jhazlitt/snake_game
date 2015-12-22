var direction = 'right'; 
var segments = [];
var foodCount = 0;

$(document).ready(function(){
	$(document).keydown(function(evt) {
		if (evt.keyCode === 37) {
			direction = "left";
		}
		else if (evt.keyCode === 38) {
			direction = "up";
		}
		else if (evt.keyCode === 39) {
			direction = "right";
		}
		else if (evt.keyCode === 40) {
			direction = "down";
		}
	});
	
	moveSegments = setInterval(function(){
		if (direction === 'up') {
			$('.segment').css("top", "-=50px");
		}
		else if (direction === 'down') {
			$('.segment').css("top", "+=50px");
		}
		else if (direction === 'left') {
			$('.segment').css("left", "-=50px");	
		}
		else if (direction === 'right') {
			$('.segment').css("left", "+=50px");
		}

		correctPosition('.segment');
	}, 150);
});

function generateFood() {
	var foodTop = Math.floor(Math.random() * 12) * 50;
	var foodLeft = Math.floor(Math.random() * 16) * 50;

	foodCount += 1;
	$('#game').append("<div class='food' id='food" + foodCount + "'></div>");
	$('#food' + foodCount + '').css("top", "" + foodTop + "px");
	$('#food' + foodCount + '').css("left", "" + foodLeft + "px");
	
}

function correctPosition(ID) {
	var topPosition = $(ID).position().top;
	var leftPosition = $(ID).position().left;

	$(ID).text(topPosition + ", " + leftPosition);	
	if (topPosition < 0) {
		$(ID).css("top", "550px");
	}

	if (topPosition > 550) {
		$(ID).css("top", "0px");
	}

	if (leftPosition < 0) {
		$(ID).css("left", "750px");
	}

	if (leftPosition > 750) {
		$(ID).css("left", "0px");
	}	
}
