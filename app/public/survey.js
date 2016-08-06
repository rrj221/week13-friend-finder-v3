$(document).ready(function() {
    $('select').material_select();

    var questions = [];

    var Question = function (number, question) {
    	this.id = number + 1;
    	this.question = question;
    }

    Question.prototype.options = ['1 (Strongly Disagree)', '2', '3', '4', '5 (Strongly Agree)'];

    var questionsArray = [ 	
    	"Your mind is always buzzing with unexplored ideas and plans.",
		'Generally speaking, you rely more on your experience than your imagination.',
		'You find it easy to stay relaxed and focused even when there is some pressure.',
		'You rarely do something just out of sheer curiosity.',
		'People can rarely upset you.',
		"It is often difficult for you to relate to other peoples feelings.",
		'In a discussion, truth should be more important than peoples sensitivities.',
		'You rarely get carried away by fantasies and ideas.',
		'You think that everyones views should be respected regardless of whether they are supported by facts or not.',
		'You feel more energetic after spending time with a group of people.'
	];

	questionsArray.forEach(function(row, i) {
		var newQuestion = new Question(i, questionsArray[i]);
		questions.push(newQuestion);
	});

	console.log(questions);

	var questionsDiv = $('<div>', {
		class: 'questionsDiv'
	});
	questions.forEach(function(question, i) {
		displayQuestions(questions[i]);
		$('#questionsContainer').append(questionsDiv);
		$('select').material_select();		
	});


 	function displayQuestions(question) {
		var div = $('<div>', {
			class: 'input-field col s12'
		});
		var questionDiv = $('<div>', {
			class: 'question',
			text: question.question
		});
		var select = $('<select>', {
			id: question.id,
			class: 'select',
			name: 'question'+question.id
		});

		select = appendOptionsToSelect(select, question);

		var text = 'Question ' + question.id;
		var label = $('<label>', {
			text: text
		});

		div.append(questionDiv);
		div.append(select);
		div.append(label);
		div.appendTo(questionsDiv);
	}

	function appendOptionsToSelect(select, question) {
		var selectNew = select;
		$('<option>', {
			value: '',
			disabled: '',
			selected: '',
			text: 'Select an option'
		}).appendTo(selectNew);
		
		question.options.forEach(function (option, i) {
			$('<option>', {
				value: i + 1,
				text: option
			}).appendTo(selectNew);
		}); 
		console.log(selectNew);
		return selectNew;
	}


//AJAX////////////////

	var currentURL = window.location.origin;

	$('#survey').on('submit', function () {
		console.log('here', $('#survey').serializeArray());

		formSubmissionArray = $('#survey').serializeArray();

		//if you don't fill out the form correctly you'll break it
		if (formSubmissionArray.length < 12 || 
			(formSubmissionArray[0].value === '' || formSubmissionArray[1].value === '')) {
				// alert('fill out the entire form please!');
				$('.message').css('visibility', 'visible');
				$("html, body").animate({ scrollTop: 0 }, "fast");
				return false;
		}

		$('.message').css('visibility', 'hidden');

		var name = $('#name').val();
		var link = $('#photoURL').val();
		var answers = [];

		//fill answers array
		for (var i = 1; i <= 10; i++) {
			var questionId = '#'+i;
			answers.push(parseInt($(questionId).val()));
			console.log('type', typeof parseInt($(questionId).val()));
		} 

		var userInfo = {
			name: name,
			link: link,
			answers: answers
		}

		//AJAX post 
		$.post(currentURL+'/friends', userInfo, function (data) {
			console.log(userInfo);

			console.log(data);

			var matchName = $('<div>', {
				class: 'matchName',
				text: data.name
			}).appendTo('.response');

			var matchPhoto = $('<img>', {
				class: 'matchPhoto',
				src: data.link
			}).appendTo('.response');

			$('#modal1').openModal();
		});

		//clears out last friend and scroll to top
		$('.modal-action').on('click', function () {
			$('.response').empty();
			clearForm();
			$("html, body").animate({ scrollTop: 0 }, "fast");
			return false;
		});

		return false;
	});

	function clearForm() {
		$('#name').val('');
		$('#photoURL').val('');
		$('.select-dropdown').val('Select an Option');
	}



});