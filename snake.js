var direction = 'right'; 
var segments = [];
var foodCount = 0;

// Snake segment constructor
function Segment(ID, direction) {
	this.ID = ID;
	this.direction = direction;
}

$(document).ready(titleScreen);

function playGame(difficulty) {
	// Set speed and score multiplier based on selected difficulty
	var speed;
	var scoreMultiplier;
	if (difficulty === 'easy') {
		speed = 300;
		scoreMultiplier = 1;
	}
	else if (difficulty === 'medium') {
		speed = 150;
		scoreMultiplier = 2;
	}
	else if (difficulty === 'hard') {
		speed = 75;
		scoreMultiplier = 3;
	}
	
	// Game controls
	$(document).keydown(function(evt) {
		if (evt.keyCode === 37) {
			if (!adjacentCollision('left')) {
				segments[segments.length - 1].direction = "left";
			}
		}
		else if (evt.keyCode === 38) {
			if (!adjacentCollision('up')) {
				segments[segments.length - 1].direction = "up";
			}
		}
		else if (evt.keyCode === 39) {
			if (!adjacentCollision('right')) {
				segments[segments.length - 1].direction = "right";
			}
		}
		else if (evt.keyCode === 40) {
			if (!adjacentCollision('down')) {
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
		
		// Check for snake collision with itself
		if (bodyCollision()) {
			gameOver(scoreMultiplier);
		}
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
	}, speed);
}

// This function detects any collisions between the head of the snake and the body
function bodyCollision() {
	var headID = segments[segments.length - 1].ID;
	var headTop = $(headID).position().top;
	var headLeft = $(headID).position().left;
	var segmentID;
	var segmentTop;
	var segmentLeft;

	for (i = 0; i < segments.length - 2; i++) {
		segmentID = segments[i].ID;
		segmentTop = $(segmentID).position().top;
		segmentLeft = $(segmentID).position().left;
		if ((headTop === segmentTop) && (headLeft === segmentLeft)) {
			return true;
		}
	}
	return false;
}

// This function prevents the user from controlling the snake to double back over itself
function adjacentCollision(direction) {
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

function titleScreen() {
	// Add title elements to the screen
	$('#game').append('<div id="title_screen"></div>');
	$('#title_screen').append('<h1 style="font-size: 80px">SNAKE</h1>');
	$('#title_screen').append('<h1>Use arrow keys to move</h1>');
	$('#title_screen').append('<div class="difficulty_button" id="easy_button"><h1 style="font-size: 40px">EASY</h1></div>');
	$('#title_screen').append('<div class="difficulty_button" id="medium_button"><h1 style="font-size: 40px">MEDIUM</h1></div>');
	$('#title_screen').append('<div class="difficulty_button" id="hard_button"><h1 style="font-size: 40px">HARD</h1></div>');

	highlightButton('#easy_button');
	highlightButton('#medium_button');
	highlightButton('#hard_button');
	
	$('#easy_button').click(function() {
		setupGame('easy');
	});
	$('#medium_button').click(function() {
		setupGame('medium');
	});
	$('#hard_button').click(function() {
		setupGame('hard');
	});
}

function gameOver(scoreMultiplier) {
	var score = (segments.length - 3) * scoreMultiplier;
	clearInterval(gameInterval);
	$('#game').append('<div id="title_screen"></div>');
	$('#title_screen').append('<h1 style="font-size: 60px">GAME OVER</h1>');
	$('#title_screen').append('<h1 style="font-size: 40px">SCORE: ' + score + '</h1>');
	$('#title_screen').append('<div class="restart_button"></div>');
	$('.restart_button').append('<h1 style="font-size: 40px">Play again?</ha');

	highlightButton('.restart_button');
	
	$('.restart_button').click(function() {
		location.reload();
	});
}

function highlightButton(ID) {
	$(ID).hover(function() {
		$(ID).css('background-color', '#C1FFC1');
	}, function() {
		$(ID).css('background-color', 'gray');
	});

}

function setupGame(difficulty) {
	// Hide the title menu
	$('#title_screen').remove();
	addSegment('0px', '0px', 'right');	
	addSegment('0px', '50px', 'right');
	addSegment('0px', '100px', 'right');
	generateFood();
	playGame(difficulty);
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
	var foodTop;
	var foodLeft;
	var segmentID;
	var segmentTop;
	var segmentLeft;
	var collision = true;

	while (collision) {
		foodTop = Math.floor(Math.random() * 12) * 50;
		foodLeft = Math.floor(Math.random() * 16) * 50;
		
		collision = false;	
		for (i = 0; i < segments.length; i++) {
			segmentID = segments[i].ID;
			segmentTop = $(segmentID).position().top;
			segmentLeft = $(segmentID).position().left;			
			if ((foodTop === segmentTop) && (foodLeft === segmentLeft)) {
				collision = true;
			}
		}
	}

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
