//###################################################### 
// DYNAMICS

$(function() {
// ********************* doc ready start ***

var N =  3 // numero di numeri da ricordare
var usrSet = []; // numeri dell'utente
var T = 1 // secondi di visualizzazione dei numeri
var maxN = 100; 

// numeri da indovinare
var numSet = numSetGen(N,maxN);

// inserimento numeri utente 
$('#usr_number_btn').click(function() { getUsrNum(numSet, usrSet); });

// mostra i numeri 
numShow(numSet,T);


// *********************** doc ready end ***
});

//###################################################### 
// FUNCTIONS

function getResult(_numSet,_usrSet) {
	var areIn = [];
	for (var i=0; i<_usrSet.length; i++) {
		if (_numSet.includes(_usrSet[i])) {
			areIn.push(_usrSet[i]);
		}
	}
	console.log('areIn: '+areIn);
	var msg;
	if (areIn.length != 0) {
		if (areIn.length == _numSet.length) {
			msg = 'tutti!';
		} else {
			msg = areIn.length+', ovvero: '+areIn;
		}
	} else {
		msg = 'nessuno!';
	}
	$('.result_list').html(msg);
	$('.number_display').fadeIn(500);
	$('.result').fadeIn(500);
}

function getUsrNum(_numSet,_usrSet) {
	var usrNumberForm = document.getElementById('usr_number');
	usrNum = parseInt(usrNumberForm.value);
	if (!_usrSet.includes(usrNum)) {
		_usrSet.push(usrNum);
	} else {
		console.log(usrNum+' è già presente!');
	}
	usrNumberForm.value = '';
	if (_usrSet.length == _numSet.length ) {
		$('.input_form').fadeOut(500, getResult(_numSet,_usrSet));
	}
}

function askNum() {
	$('.input_form').fadeIn(500);
}

function numSetGen(_N,_maxN) {
	var numSet = [];
	for (var i=0; i<_N; i++) {
		numSet.push(randomNumber(1,_maxN));
	}
	return numSet;
}

function numShow(_arr,_time) {
	var html = '';
	for (var i=0; i<_arr.length; i++) {
		var sep = (i<(_arr.length-1)) ? ', ' : '';
		html += _arr[i]+sep;
	}
	$('.num_list').html(html);
	$('.number_display').fadeIn(500, function(){
		console.log('start');
		setTimeout(function() {
			console.log('stop');
			$('.number_display').fadeOut(500, askNum());
			;
		}, _time*1000);
	});
}

function randomNumber(_a,_b) {
	return Math.floor(Math.random()*(_b - _a + 1)) + _a;
}
