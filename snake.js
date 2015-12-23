var direction = 'right'; 
var segments = [];
var foodCount = 0;

$(document).ready(setupGame);

function playGame() {
	// Game controls
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
	
	gameInterval = setInterval(function(){
		moveSegment();
		correctPosition('.segment');
	}, 150);
}

function setupGame() {
	addSegment('0px', '0px', 'right');	
	generateFood();
	playGame();
}

function Segment(ID, direction) {
	this.ID = ID;
	this.direction = direction;
}

function moveSegment() {
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
}

function addSegment(segmentTop, segmentLeft, direction) {
	segmentCount = segments.length;
	segmentID = "#segment" + segmentCount + "";
	
	$('#game').append("<div class='segment' id='segment" + segmentCount + "'></div>");
	$(segmentID).css("top", segmentTop);
	$(segmentID).css("left", segmentLeft);	
	segments.push(new Segment(segmentID, direction));
}

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
