window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
	}
	
	document.querySelector("#novaBarva") 
		.addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var odstraniBarve = function (event) {
		var input = document.createElement('button');
		document.getElementById("barve").innerHTML=null;
		// body...
	}
	
	document.querySelector("#odstraniBarve").addEventListener('click',odstraniBarve);
	
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;//document.getElementById("min").value;
	var maxCas = 0;//document.getElementById("max").value;
	/*document.getElementById("min").value.onchange = function(){
		minCas=document.getElementById("min").value;
	};
	document.getElementById("max").value.onchange = function(){
		maxCas=document.getElementById("max").value;
	};*/
	var ustavi = false;
	
	console.log("minCas: "+minCas);
	
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			novId = (id+1) % vrednosti.length; //premik po barvah
			minCas = document.getElementById("min").value;
			maxCas = document.getElementById("max").value;
			timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas); //nastavi cas med premikom
			//console.log("minCas: "+minCas);
			//console.log("maxCas: "+maxCas);
			//console.log("timeout: "+timeout);
			setTimeout(function() {spremeniBarvo(novId)} , timeout); //izvede premik cez "timeout" ms
		}		
	}
	
	var stop = function(event) {
		ustavi = true;
		var start=document.querySelector("#start");
		start.innerHTML = "Zaženi stroboskop";
		start.removeEventListener('click',stop);
		start.addEventListener('click',zagon);
	}
	
	var zagon = function(event) {
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		
		minCas = 1000;
		maxCas = 1000;
		//minCas = document.getElementById("min").value;
		//maxCas = document.getElementById("max").value;
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
		//start.innerHTML = "Zaženi stroboskop";
		//var stop = document.querySelector("#stop");
		
		
		
	}
	
	document.querySelector("#start").addEventListener('click', zagon);
	
});