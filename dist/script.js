level = '88';
winner = loser = 0;

function elem(id){
  var e = document.getElementById(id);
  return e;
}

function activateLevelNum(inputValue){
	var spanNum;
	switch(inputValue){
		case "88": spanNum = 0; break;
		case "80": spanNum = 1; break;
		case "72": spanNum = 2; break;
		case "64": spanNum = 3; break;
		case "56": spanNum = 4; break;
		case "48": spanNum = 5; break;
		case "40": spanNum = 6; break;
		case "32": spanNum = 7; break;
		case "24": spanNum = 8; break;
		case "16": spanNum = 9; break;
		default  : spanNum = 0;
	}
	var spans = document.querySelectorAll('.levels span');
	for(var i = 0; i<spans.length; i++){spans[i].classList.remove('activeLevel');}
	spans[spanNum].classList.add('activeLevel');
	document.querySelector('.lights-container').className = 'lights-container';
	document.querySelector('.lights-container').classList.add('level'+ parseInt(spanNum+1));
}

function addDisable(){
	elem('level').setAttribute('disabled','disabled');
	elem('levelUp').setAttribute('disabled','disabled');
	elem('levelDown').setAttribute('disabled','disabled');
	document.querySelector('.levels').classList.add('disabled');
}

function removeDisable(){
	elem('level').removeAttribute('disabled');
	elem('levelUp').removeAttribute('disabled');
	elem('levelDown').removeAttribute('disabled');
	document.querySelector('.levels').classList.remove('disabled');
}


var btnStart = elem('startLights');
btnStart.addEventListener('click', function() {
	document.querySelector('.lights').classList.remove('loser','winner');
	addDisable();
	this.style.display='none';
	this.nextElementSibling.style.display='inline-block';
	elem('accuracy').style.display = 'none';
	
	if(level=='88')document.querySelector('.lights-container').classList.add('level1');
	
	timer = setInterval(function(){	
		var x = document.querySelector('li.ok');
		if(x.id=='last'){
			elem('first').classList.add('ok');
			x.classList.remove('ok');
		} else {
			x.nextElementSibling.classList.add('ok');
			x.classList.remove('ok');
		}
	}, level);
});

var btnStop = elem('stopLights');
btnStop.addEventListener('click', function() {
	document.querySelector('.lights').classList.remove('loser','winner');	
	removeDisable();
	this.style.display='none';
	this.previousElementSibling.style.display='inline-block';
	clearInterval(timer);	
	if(elem('first').classList == 'ok') {
		document.querySelector('.lights').classList.add('winner');
		winner++;
		elem('winner').innerHTML=winner;
		
		if(level == '16'){
			var total = parseInt(winner + loser);
			var percent = winner / total * 100;
			elem('accuracy').innerHTML = percent.toFixed() +'%';
			elem('accuracy').style.display = 'block';
		}
		
		levelSelector.stepDown(1);
		level = levelSelector.value;
		activateLevelNum(level);
		
	} else {
		document.querySelector('.lights').classList.add('loser');			
		loser++;
		elem('loser').innerHTML=loser;
	}
});

var levelSelector = elem('level');
levelSelector.addEventListener('change', function() {
	level = this.value;
	activateLevelNum(level);
});

var levelUpBtn = elem('levelUp');
levelUpBtn.addEventListener('click', function() {
	document.querySelector('.lights').classList.remove('loser','winner');
	levelSelector.stepDown(1);
	level = levelSelector.value;
	activateLevelNum(level);
});

var levelDownBtn = elem('levelDown');
levelDownBtn.addEventListener('click', function() {
	document.querySelector('.lights').classList.remove('loser','winner');
	levelSelector.stepUp(1);
	level = levelSelector.value;
	activateLevelNum(level);
});