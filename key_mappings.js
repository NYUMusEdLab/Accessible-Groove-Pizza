// objects for mappings
// keyTyped use key, keyPressed&keyReleased use keyCode
// using keyCode
let layersMapping = {
    49: 1,
    50: 2,
    51: 3,
    52: 4
}

// q w e r t y u i o p
// a s d f g h j k l
let nodesMapping = {
	81: 1,
	65: 2,
	87: 3,
	83: 4,
	69: 5,
	68: 6,
	82: 7,
	70: 8,
	84: 9,
	71: 10,
	89: 11,
	72: 12,
	85: 13,
	74: 14,
	73: 15,
	75: 16
}

let actionMapping = {
	: 'play'
}

function figureOutPress(keyCode) {
    if (keyCode in layersMapping[keys]) {
        return 'layer';
    }
    if (keyCode in nodesMapping[keys]) {
        return 'node';
    }
}

function getLayer(keyCode) {
    return layersMapping[keyCode];
}

// in main code
// currentLayer = changeLayer(keyCode, layersMapping, voice, );

/*
function mapKeys1(keyCode, currentLayer, currentSlice, startPlaying){
	let currentInst = 0;
	let confirmChange = false;

	switch(keyCode){
		case 32:
		startPlaying = !startPlaying;
		break;

		// 1 2 3 4
		case 49:
		case 50:
		case 51:
		case 52:
		currentLayer = String.fromCharCode(keyCode);
		//sreturn currentLayer;
		break;

		// q w e r t y u i o p
		// a s d f g h j k l
		case :
		currentSlice = 1;

	}
}
*/
