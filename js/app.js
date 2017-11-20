$(document).ready(function(){

//creating object prototype for all questions
	function Question(question, options, answer) {
	  this.question = question;
	  this.options = options;
	  this.answer = answer;
	}

//creating instances of the Question object which contain actual question data and their answers
	var question1 = new Question ('What is the capital of India?', ['New Dehli', 'Kolkata', 'Dhaka'], 'New Dehli');

	var question2 = new Question ('What was the first country to send the man on moon in 1969?', ['USSR', 'Brasil', 'USA'], 'USA');

	var question3 = new Question ('Aethens is the capital of which country?', ['Greece', 'Sweden', 'Iceland'], 'Greece');

	var question4 = new Question ('When was Buckingham Palace of UK built?', ['1703', '1898', '1901', '1880'], '1703');

	var question5 = new Question ('What is the capital of Australia?', ['Canberra', 'Sydney', 'Melbourne', 'Wellington'], 'Canberra');

	var question6 = new Question ('Amsterdam is the capital of which country?', ['Netherlands', 'Germany', 'Belgium'], 'Netherlands');

//creating an array with all the instances of Question, so we can call them by index (with the i variable)
	var questionList = [question1, question2, question3, question4, question5, question6]; // could we have said var questionList = question[i]; ?
//creating variable so we can call the question we want when the user is going through the quiz 
	var i = 0;
	var score = 0;
	var unanswered = 0;
	var clockRunning = false;
	var gameTimer;

	var timer = {
		time :50, 
		reset: function(){
			timer.time = 50;
			document.getElementById("timer").innerHTML = timer.time;
		},
		start: function(){
			if(!clockRunning){
				gameTimer = setInterval(timer.count, 1000);
				clockRunning = true;
			}

		},
		stop: function(){
			clearInterval(gameTimer);
			clockRunning = false;
		},
		count: function(){
			document.getElementById("timer").innerHTML = timer.time;
			if(timer.time > 0){
				timer.time--;
			}else{
				gameOver();
			}
		}
	}

//creating variable for the selected button so it's easy to switch CSS class on and off
	var activeButton = "";

// showing content for next question. This will happen for each new quiz (when 'Start quiz' button is pressed)
//and after each question is answered. 
	var nextQuestion = function() {
		//the following is only relevant after the first question has been answered, to set things back to beginning state.
		activeButton.className = "answer-unselected";
		document.getElementById("correct").style.display = "none";
		document.getElementById("incorrect").style.display = "none";

		//this is necessary as the array index starts at 0 and so will always be 1 number below the question number
		//we want to display. 
		//Note: The value of i is only changed locally here as it is within a local variable 'questionNumber'.
		var questionNumber = i + 1; // add loop here for as long as i++ < number of questions ? Otherwise won't quiz go on for ever?

		//question number is displayed in div#q-number
		document.getElementById("q-number").innerHTML = "Question " + questionNumber + " of 6";

		//current question is displayed in div#question
		document.getElementById("question").innerHTML = questionList[i].question;  //how does this work? Can we apply .question because of line 5?

		//displaying appropriate options in the 3 option buttons
		document.getElementById("answers").style.display = "block";
		document.getElementById("answer-a").innerHTML = questionList[i].options[0];
		document.getElementById("answer-b").innerHTML = questionList[i].options[1];
		document.getElementById("answer-c").innerHTML = questionList[i].options[2];
	}

	//Interaction when user selects an answer:
	
	//on click change button style to 'selected'
	var userGuess = function() {	//see 'click' event listener on lines 123-127
		activeButton = this;	//'this' refers to the button that has just been clicked. 
		activeButton.className = "answer-selected";

		//Finding the text value of:
		//1) the user-clicked button ('activeButton')
		var userAnswer = activeButton.textContent;
		//2) the correct answer as defined in the question[i] object
		var answer = questionList[i].answer;

		//comparing the above text values to see if user is correct
		var checkAnswer = function (answer, userAnswer) {
			if (answer === userAnswer) {
				activeButton.className = "answer-correct";
				document.getElementById("correct").style.display = "block";
				score++;
			}
			else {
				questionList[i].answer.className = "answer-correct";
				document.getElementById("incorrect").style.display = "block";
			}
		}

		//Note: after setTimeOut method, either use anonymous function (l. 86)
		//or refer to function by name with no brackets (l. 88)
		setTimeout(function(){ checkAnswer(answer, userAnswer); },1000);
		i++;
		if (i === questionList.length) {
			setTimeout(gameOver,3000);
		} else {
			setTimeout(nextQuestion,3000);
		}	
	}

	//launching quiz on click of 'start quiz' button	
	var start = function() {	//see 'click' event listener on line 123
		timer.reset()
		timer.start();
		document.getElementById("start").style.display = "none";
		document.getElementById("score").style.display = "none";
		document.getElementById("question").style.display = "block";
		document.getElementById("play-again").style.display = "none";
		nextQuestion();
	}
	//display score on end of game
	var gameOver = function() {
		timer.stop()
		document.getElementById("q-number").style.display = "none";
		document.getElementById("question").style.display = "none";
		document.getElementById("answers").style.display = "none";
		document.getElementById("feedback").style.display = "none";
		document.getElementById("score").style.display = "block";
		document.getElementById("play-again").style.display = "initial";
		console.log(score);
		i = 0; 

		if (score < 3) {
			var points = "You scored " + score +  " points. Better luck next time!"
		}
		else if (score == 3 || score == 4) {
			points = "Not bad, you scored " + score +  " points. Try again to improve your score!"
		}
		else {
			points = "Well done, you scored " + score +  " points."
		}
		score = 0;
		document.getElementById("points").innerHTML = points;
	}

	//event listeners
	document.getElementById("new-quiz").addEventListener("click", start);
	document.getElementById("answer-a").addEventListener("click", userGuess); 
	document.getElementById("answer-b").addEventListener("click", userGuess); 
	document.getElementById("answer-c").addEventListener("click", userGuess);
	document.getElementById("play-again").addEventListener("click", start);
});