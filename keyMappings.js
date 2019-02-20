// objects for mappings
// keyTyped use key, keyPressed&keyReleased use keyCode
// using keyCode
/*
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

// l-layer; s-slice
let keymap1 = {
	// layer
	49: {type:'l', val: 1}, // 1
	50: {type:'l', val: 2}, // 2
	51: {type:'l', val: 3}, // 3
	52: {type:'l', val: 4}, // 4

	// slice
	81: {type:'s', val: 1}, // q
	87: {type:'s', val: 3}, // w
	69: {type:'s', val: 5}, // e
	82: {type:'s', val: 7}, // r
	84: {type:'s', val: 9}, // t
	89: {type:'s', val: 11}, // y
	85: {type:'s', val: 13}, // u
	73: {type:'s', val: 15}, // i

	65: {type:'s', val: 2}, // a
	83: {type:'s', val: 4}, // s
	68: {type:'s', val: 6}, // d
	70: {type:'s', val: 8}, // f
	71: {type:'s', val: 10}, // g
	72: {type:'s', val: 12}, // h
	74: {type:'s', val: 14}, // j
	75: {type:'s', val: 16}, // k

	// shape
	90: {type:'shape', val: 0}, // z
	88: {type:'shape', val: 3}, // x
	67: {type:'shape', val: 4}, // c
	86: {type:'shape', val: 5}, // v
	66: {type:'shape', val: 6}, // b
	78: {type:'shape', val: 8}, // n

	// rotate
	189: {type: 'r', val: 'l'}, // -
	187: {type: 'r', val: 'r'}, // =

	32: {type:'play', val: null}, // SPACE
	13: {type:'toggle', val: null} // ENTER
}