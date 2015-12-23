var direction = 'right'; 
var segments = [];
var foodCount = 0;

// Snake segment constructor
function Segment(ID, direction) {
	this.ID = ID;
	this.direction = direction;
}

$(document).ready(setupGame);

function playGame() {
	// Game controls
	$(document).keydown(function(evt) {
		if (evt.keyCode === 37) {
			segments[segments.length - 1].direction = "left";
		}
		else if (evt.keyCode === 38) {
			segments[segments.length - 1].direction = "up";
		}
		else if (evt.keyCode === 39) {
			segments[segments.length - 1].direction = "right";
		}
		else if (evt.keyCode === 40) {
			segments[segments.length - 1].direction = "down";
		}
		else if (evt.keyCode === 80) {
			clearInterval(gameInterval);
		}
	});
	
	gameInterval = setInterval(function(){
		var foodTop = $('.food').position().top;
		var foodLeft = $('.food').position().left;

		var segmentID = segments[segments.length - 1].ID;
		var segmentDirection = segments[segments.length - 1].direction;
		var segmentTop = $(segmentID).position().top;
		var segmentLeft = $(segmentID).position().left;	

		// Check for snake head collision with food
		if ((segmentTop === foodTop) && (segmentLeft === foodLeft)) {
			$('.food').remove();
			if (segmentDirection === 'up') {
				addSegment('' + (segmentTop - 50) + 'px', '' + segmentLeft + 'px', segmentDirection);
			}
			else if (segmentDirection === 'down') {
				addSegment('' + (segmentTop + 50) + 'px', '' + segmentLeft + 'px', segmentDirection);
			}
			else if (segmentDirection === 'left') {
				addSegment('' + segmentTop + 'px', '' + (segmentLeft - 50) + 'px', segmentDirection);
			}
			else if (segmentDirection === 'right') {
				addSegment('' + segmentTop + 'px', '' + (segmentLeft + 50) + 'px', segmentDirection);
			}
			correctPosition(segments[segments.length - 1].ID);
			generateFood();
		}
		else {
			for (i = segments.length - 1; i >= 0; i--) {
				segmentID = segments[i].ID;
				segmentDirection = segments[i].direction;
				moveSegment(segmentID, segmentDirection);
				correctPosition(segmentID);
				// $(segmentID).text(segmentID + " " + segmentDirection);
			}
			// For all of the snake segments except the head, propogate the direction down the snake
			for (i = 0; i < segments.length - 1; i++) {
				segmentID = segments[i].ID;
				segmentDirection = segments[i].direction;
				
				segments[i].direction = segments[i + 1].direction;	
			}
		}
	}, 150);
}

function setupGame() {
	addSegment('0px', '0px', 'right');	
	generateFood();
	playGame();
}

function moveSegment(ID, direction) {
	if (direction === 'up') {
		$(ID).css("top", "-=50px");
	}
	else if (direction === 'down') {
		$(ID).css("top", "+=50px");
	}
	else if (direction === 'left') {
		$(ID).css("left", "-=50px");	
	}
	else if (direction === 'right') {
		$(ID).css("left", "+=50px");
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

	$('#game').append("<div class='food'></div>");
	$('.food').css("top", "" + foodTop + "px");
	$('.food').css("left", "" + foodLeft + "px");
}

function correctPosition(ID) {
	var topPosition = $(ID).position().top;
	var leftPosition = $(ID).position().left;

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
