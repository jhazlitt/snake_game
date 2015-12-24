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
			if (!bodyCollision('left')) {
				segments[segments.length - 1].direction = "left";
			}
		}
		else if (evt.keyCode === 38) {
			if (!bodyCollision('up')) {
				segments[segments.length - 1].direction = "up";
			}
		}
		else if (evt.keyCode === 39) {
			if (!bodyCollision('right')) {
				segments[segments.length - 1].direction = "right";
			}
		}
		else if (evt.keyCode === 40) {
			if (!bodyCollision('down')) {
				segments[segments.length - 1].direction = "down";
			}
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

// This function prevents the user from controlling the snake to double back over itself
function bodyCollision(direction) {
	var headID = segments[segments.length - 1].ID;
	var headTop = $(headID).position().top;
	var headLeft = $(headID).position().left;	
	var adjacentID = segments[segments.length - 2].ID;
	var adjacentTop = $(adjacentID).position().top;
	var adjacentLeft = $(adjacentID).position().left;
	// Look for body sections adjacent to the direction the snake is heading
	if (direction === 'up') {
		headTop -= 50;
	}
	else if (direction === 'down') {
		headTop += 50;
	}
	else if (direction === 'left') {
		headLeft -= 50;
	}
	else if (direction === 'right') {
		headLeft += 50;
	}

	if ((headTop === adjacentTop) && (headLeft === adjacentLeft)) {
		return true;
	}	
	else {
		return false;
	}	
}

function setupGame() {
	addSegment('0px', '0px', 'right');	
	addSegment('0px', '50px', 'right');
	addSegment('0px', '100px', 'right');
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
