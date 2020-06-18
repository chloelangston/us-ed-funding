

var isInView = function(el){
  var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height, 
    el = el.parentNode;
  do {
    rect = el.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;
    // Check if the element is out of view due to a container scrolling
    if ((top + height) <= rect.top) return false
    el = el.parentNode;
  } while (el != document.body);
  // Check its within the document viewport
  return top <= document.documentElement.clientHeight;
};

// Stuff only for the demo
function attachEvent(element, event, callbackFunction) {
    if (element.addEventListener) {
        element.addEventListener(event, callbackFunction, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, callbackFunction);
    }
};

var highlightUpMap = function(states) {
	for (var i = 0; i < states.length; i++) {
		let state = document.getElementById(states[i]);
    	state.setAttribute("fill", "black");
    }
}

var highlightDownMap = function(states) {
	for (var i = 0; i < states.length; i++) {
		let state = document.getElementById(states[i]);
    	let origColor = state.getAttribute("data-color");
		state.setAttribute("fill", origColor);
    }
}

var update = function(){
	document.getElementById("map-overlay").classList.remove("hide");

	const statesA = ["Utah", "NewYork"];
	const statesB = ["Utah", "Idaho", "Arizona", "Oklahoma"];
	const statesC = ["Vermont", "NewJersey", "Connecticut", "DistrictofColumbia", "NewYork"];
	const statesD = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','DistrictofColumbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','NewHampshire','NewJersey','NewMexico','NewYork','NorthCarolina','NorthDakota','Ohio','Oklahoma','Oregon','Pennsylvania','RhodeIsland','SouthCarolina','SouthDakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','WestVirginia','Wisconsin','Wyoming'];

	let highlightedStates = [];

    if (isInView(document.getElementById('elementA'))) {
    	console.log("element A is in view")
    	highlightedStates = statesA;
    } else if (isInView(elementB)) {
    	console.log("element B is in view")
    	highlightedStates = statesB;
    } else if (isInView(elementC)) {
    	console.log("element C is in view")
    	highlightedStates = statesC;
    } else if (isInView(elementD)) {
    	console.log("element E is in view")
    	highlightedStates = statesD;
    } else if (isInView(elementE)) {
    	console.log("element E is in view")
    	highlightedStates = statesD;
    	document.getElementById("map-overlay").classList.add("hide");
    } else {
    	
    }

    var stateElements = document.getElementsByClassName("state-path");

	for (var i = 0; i < stateElements.length; i++) {
		
		let elementId = stateElements[i].getAttribute("id");

		if (highlightedStates.includes(elementId)) {
			stateElements[i].setAttribute("fill", stateElements[i].getAttribute("data-color"));
		} else {
			stateElements[i].setAttribute("fill", "grey");
		}
	}
};

// attachEvent(document.getElementById('element1'), "scroll", update);
// attachEvent(window, "resize", update);



