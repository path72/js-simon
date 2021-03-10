//###################################################### 
// DYNAMICS

$(function() {
// ********************* doc ready start ***


// ** KICK-OFF **
mainInit();


// *********************** doc ready end ***
});

//###################################################### 
// FUNCTIONS

function mainInit() {
	console.log('--------- mainInit:');

	var usrSet = []; // numeri dell'utente
	var maxN = 100; // range numerico random

	$('.input_form_game').fadeIn(500);

	$('#usr_game_btn').click(function() { 

		// form data retrieving
		var usrListLengthForm = $('#usr_list_length');
		var usrTimeForm = $('#usr_time');
		listLength = parseInt(usrListLengthForm.val()); // numero di numeri da ricordare
		time = parseInt(usrTimeForm.val()); // secondi di visualizzazione dei numeri

		// check
		if (isNaN(listLength) || isNaN(time)) {
			$('.msg_text').html('Qualcosa non va, riprova!');
			$('.msg').fadeIn(500, function(){
				setTimeout(function() {
					$('.msg').fadeOut(500);
				}, 1000);
			});
			console.log('qualcosa non va');
		} else {
			
			usrSet = []; // numeri dell'utente

			// random number set
			var numSet = numSetGen(listLength,maxN);
			console.log(numSet);

			// form interactions
			$('#usr_number_btn').click(function() { 
				console.log('usr_number_btn >>> '+usrSet);
				getUsrNum(numSet, usrSet); 
			});
			$('#usr_number').keyup(function(_ev) {
				if (_ev.keyCode == 13) { 
					console.log('usr_number_btn >>> '+usrSet);
					getUsrNum(numSet, usrSet);  
				}
			});	

			// number set showing 
			numShow(numSet,usrSet,time);

		}
	
	});

}

function numShow(_numSet,_usrSet,_time) {
	console.log('--------- numShow >>> '+_usrSet);

	// deploy num list
	for (var i=0; i<_numSet.length; i++) {
		var sep = (i<(_numSet.length-1)) ? ', ' : '';
		$('.num_list').append(_numSet[i]+sep);	
	}

	// display num list panel 
	$('.number_display').fadeIn(500, function(){
		console.log('timer start');
		setTimeout(function() {
			console.log('timer stop');
			$('.number_display').fadeOut(500, askNum(_usrSet));
		}, _time*1000);
	});

}

function askNum(_usrSet) {
	console.log('--------- askNum >>> '+_usrSet);

	// display form
	askMsgUpdate(_usrSet);
	$('.input_form').fadeIn(500);
	$("#usr_number").focus();

}

function askMsgUpdate(_usrSet) {
	console.log('--------- askMsgUpdate >>> '+_usrSet);

	$('#usr_number_label').html('Tentativo #'+(_usrSet.length+1));

}

function getUsrNum(_numSet,_usrSet) {
	console.log('--------- getUsrNum >>> '+_usrSet);

	// form data retrieving
	var usrNumberForm = $('#usr_number');
	usrNum = parseInt(usrNumberForm.val());
	console.log('usrNum = '+usrNum);

	// data check
	if (!_usrSet.includes(usrNum) && !isNaN(usrNum)) {
		_usrSet.push(usrNum);
		console.log('caso 1: '+_usrSet);
	} else {
		if (isNaN(usrNum)) {
			$('.msg_text').html(usrNum+' non è un numero, riprova!');
			console.log('caso 2: '+usrNum+' non è un numero, riprova!');
		} else {
			$('.msg_text').html(usrNum+' è già presente, riprova!');
			console.log('caso 3: '+usrNum+' è già presente, riprova!');
		}
		$('.msg').fadeIn(500, function(){
			setTimeout(function() {
				$('.msg').fadeOut(500);
			}, 1000);
		});
	}

	// form cleaning
	usrNumberForm.val('');
	askMsgUpdate(_usrSet);
	$("#usr_number").focus();

	// user number set complete 
	if (_usrSet.length == _numSet.length ) {
		$('.input_form').fadeOut(500, getResult(_numSet,_usrSet));
	}

}

function getResult(_numSet,_usrSet) {
	console.log('--------- getResult >>> '+_usrSet);

	// right number collection 
	var areIn = [];
	for (var i=0; i<_usrSet.length; i++) {
		if (_numSet.includes(_usrSet[i])) areIn.push(_usrSet[i]);
	}
	console.log('areIn = '+areIn);

	// final message
	finalMsg(_numSet,areIn);

	// _usrSet = [];

}

function finalMsg(_numSet,_areIn) {

	// final message deploy
	var msg;
	if (_areIn.length != 0) {
		if (_areIn.length == _numSet.length) msg = 'tutti!';
		else msg = ''+_areIn;
	} else {
		msg = 'nessuno!';
	}

	// message showing
	$('.result').find('div:nth-child(3)').append(' <span class="highlight">'+_areIn.length+'</span>');
	$('.result_list').append(msg);
	$('.result').fadeIn(500, function() {
		setTimeout(function() {

			// reset game
			$('.result').fadeOut(500);
			$('#usr_list_length').val('');
			$('#usr_time').val('');
			$('.num_list').html('');
			// mainInit();

		}, 4000);
	});

}






function numSetGen(_N,_maxN) {
	var numSet = [];
	while (numSet.length<_N) {
		var r = randomNumber(1,_maxN);
		if (!numSet.includes(r)) numSet.push(r);
	}
	return numSet;
}

function randomNumber(_a,_b) {
	return Math.floor(Math.random()*(_b - _a + 1)) + _a;
}
