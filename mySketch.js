// todo
// Make sure that an out-of-range slice can't be selected
let inExploreMode = false;

let audioModeArr = ["speech", "sound", "none"];
let audioMode = audioModeArr[1];

let bpm = 120;
Tone.Transport.bpm.value = bpm;
let beatDur = '16n'; // should be constant
let numBeats = 16; // controls the pizza slices
let numBeatsArr = [...Array(numBeats).keys()];

// all the sliders to control pizza
let bpm_slider;
let numSlices_slider;

// Instruction Text
let instructions;

// all the sound sources
// TODO - Automate how these are loaded
let kick16 = new Tone.Player('audio/16-bit/Kick.wav').toMaster();
let snare16 = new Tone.Player('audio/16-bit/Snare.wav').toMaster();
let hat16 = new Tone.Player('audio/16-bit/HH.wav').toMaster();

let kickReal = new Tone.Player('audio/drumset/Kick.wav').toMaster();
let snareReal = new Tone.Player('audio/drumset/Snare.wav').toMaster();
let hatReal = new Tone.Player('audio/drumset/HH.wav').toMaster();

let bongo1 = new Tone.Player('audio/bongos/bongo1.wav').toMaster();
let bongo2 = new Tone.Player('audio/bongos/bongo2.wav').toMaster();
let bongo3 = new Tone.Player('audio/bongos/bongo3.wav').toMaster();

let kick_beats = new Array(numBeats).fill(0);
let snare_beats = new Array(numBeats).fill(0);
let hat_beats = new Array(numBeats).fill(0);
let beats = [kick_beats, snare_beats, hat_beats];

// an arr to store all types of sounds
let soundArr = [{
        name: '16 Bit',
        sounds: [hat16, snare16, kick16],
        instrumentNames: ['Hi Hat', 'Snare Drum', 'Kick Drum']
    },
    {
        name: 'Drum Set',
        sounds: [hatReal, snareReal, kickReal],
        instrumentNames: ['Hi Hat', 'Snare Drum', 'Kick Drum']
    },
    {
        name: 'Bongos',
        sounds: [bongo1, bongo2, bongo3],
        instrumentNames: ['Bongo 1', 'Bongo 2', 'Bongo 3']
    }
];
let currentInst = soundArr[0]; // default

// Visuals
let colorPaletteArr = [colors1, colors2, colors4];
let colorPalette = colorPaletteArr[0];
let currentKeyMapIndex = 0;
let currentKeyMap = keymapArray[0];

let myPizza = new Pizza(1920 / 2.5, 1080 / 3, 100, 1.5, numBeats, colorPalette);
let myVoice;
let myRec;

function preload() {
    // audio cues
    myVoice = new p5.Speech();
    myVoice.onLoad = voicesLoaded;

    // audio detection
    /*
    myRec = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
    myRec.continuous = true; // do continuous recognition
    myRec.onResult = showResult; // bind callback function to trigger when speech is recognized
    myRec.start(); // start listening
    */
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // show the pizza nodes objects
    console.log(myPizza.pizzaSlicesArr);

    instructions = createElement('textarea');
    instructions.elt.rows = 8;
    instructions.elt.cols = 28;
    instructions.elt.value = 'test';
    // instructions.elt.disabled = true;
    instructions.id('instructions');
    instructions.position(150 - 50, windowHeight / 2 - 150);

    bpm_slider = createSlider(50, 180, bpm, 1);
    bpm_slider.id('bpm_slider');
    bpm_slider.changed(changeBPM);
    bpm_slider.position(150, windowHeight / 2);
    bpm_slider.style('width', '100px');

    numSlices_slider = createSlider(2, 16, numBeats, 1);
    numSlices_slider.id('numSlices_slider');
    numSlices_slider.changed(changeNumSlices);
    numSlices_slider.position(150, windowHeight / 2 + 50);
    numSlices_slider.style('width', '100px');
}

function voicesLoaded() {
    myVoice.interrupt = true;
    myVoice.setRate(2);
}

/////////////////////////////////////////// Audio Stuff ////////////////////////////////////////////////////////////////////////////////
let loop = new Tone.Sequence(function(time, col) {
    let column = getBeatColumn(beats, col);
    cleanHighlights(numBeatsArr.length);
    for (let i = 0; i < column.length; i++) {
        if (column[i]) {
            hightlightNode(i, col);
            playSound(currentInst.sounds[i], time);
        }
    }
}, numBeatsArr, beatDur);

loop.start(0);

function playSound(samp, time) {
    if (samp.loaded) {
        samp.start(time, 0, '4n');
    }
}

function getBeatColumn(arr, col) {
    return arr.map(function(row) {
        return row[col];
    });
}

// change according to slider values
function changeBPM() {
    myVoice.speak(this.value());
    Tone.Transport.bpm.rampTo(bpm_slider.value(), 0.5);
}

function changeNumSlices() {
    myVoice.speak(this.value());
    myPizza.numSlices = this.value();
    myPizza.updatePizza();
    myPizza.drawPizza();

    numBeats = numSlices_slider.value(); // controls the pizza slices
    numBeatsArr = [...Array(numBeats).keys()] // array from 0 to n

    // redo loop
    loop.stop();
    loop.dispose();

    loop = new Tone.Sequence(function(time, col) {
        let column = getBeatColumn(beats, col);
        cleanHighlights(numBeatsArr.length);
        for (let i = 0; i < column.length; i++) {
            if (column[i]) {
                hightlightNode(i, col);
                playSound(currentInst.sounds[i], time);
            }
        }
    }, numBeatsArr, beatDur);
    console.log(loop.length);
    loop.start(0);

    console.log(myPizza);
}
////////////////////////////////////////////End of Audio Stuff ////////////////////////////////////////////////////////////////////

/////////////////////////////////// Draw Stuff ///////////////////////////////////////////////////////////////////////////////////////

function draw() {
    // color light grey
    background(colorPalette.background.r, colorPalette.background.g, colorPalette.background.b);
    // nodeGrid(50, 100, 400, 200, 16);
    myPizza.drawPizza();

    // slider text
    push();
    noStroke();
    fill(0);
    textStyle(BOLD);
    textSize(18);
    text('BPM', 80, height / 2 + 10);
    text(bpm_slider.value(), 250, height / 2 + 10);
    text('Slices', 80, height / 2 + 60);
    text(numSlices_slider.value(), 250, height / 2 + 60);
    pop();

    // indication on which layer and slice
    push();
    textStyle(BOLD);
    textSize(18);
    noStroke();
    fill(0);
    text('Current Layer: ' + currentLayer + '   Current Slice: ' + currentSlice, 80, height / 2 + 110);
    pop();
}

function updateColorPalette(newColorPalette) {
    colorPalette = newColorPalette;
    myPizza.updateColor(colorPalette);
    console.log(colorPalette)
}

///////////////////////////////// End of Draw Stuff ///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// Mouse Stuff /////////////////////////////////////////////////////////////////////////////
// change the activeness of each node
function mouseReleased() {
    if (inExploreMode) {
    }
    else {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
            console.log('just resumed');
        }
        // Click on the pizza
        // If the function returns false, the user did not click on a node
        // Otherwise, update the beatsArray with the node that change
        let positionAndState = myPizza.clickPizza(mouseX, mouseY);
        if (!positionAndState) { return false; } // If clicking did not do anything

        let layerVal = positionAndState[0] - 2; // layers range from 2 to 4
        let sliceVal = positionAndState[1] - 1; // slices begin at 1
        let stateVal = positionAndState[2];
        beats[layerVal][sliceVal] = stateVal;
    }

}
//////////////////////////////////////////// End of Mouse Stuff /////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// Keyboard Functions //////////////////////////////////////////////////////////////////

function selectInst(val) {
    currentLayer = val;
    if (currentLayer === 1) {
            myVoice.speak('Instrument.');
    }
    else {
        if (audioMode === "sound") {
            // play the actual sound
            playSound(currentInst.sounds[currentLayer - 2]);
        }
        else {
            myVoice.speak(currentInst.instrumentNames[currentLayer - 2]);
        }
    }
}

function selectSlice(val) {
    if (currentLayer === 1) {
        if (val - 1 < 3) { // val[1] - but, that breaks
            updateColorPalette(colorPaletteArr[val - 1]);
            currentInst = soundArr[val - 1];
            myVoice.speak(currentInst.name);
        }
    }
    else {
        currentSlice = val;
        if (audioMode === "sound") {
            let beatState = beats[currentLayer - 2][currentSlice - 1];
            playSliceAudio(myPizza.numSlices, currentSlice, beatState);
        }
        else {
            myVoice.speak('Slice ' + currentSlice);
        }
    }
}

function play() {
    if (!isPlaying) {
        console.log('start playing');
        Tone.Transport.start();
        isPlaying = true;
    } else {
        console.log('stop playing');
        cleanHighlights(numBeatsArr.length);
        Tone.Transport.stop();
        isPlaying = false;
    }
}

function toggleSlice() {
    // if at center layer
    if (currentLayer === 1) {} else {
        // make sure we are within limit to adjust nodes
        if (currentSlice <= myPizza.numSlices) {
            // loop through pizzaSlicesArr
            for (let i = 0; i < myPizza.pizzaSlicesArr.length; i++) {
                // if layer number match
                if (currentLayer === myPizza.pizzaSlicesArr[i].layer) {
                    currentNode = myPizza.pizzaSlicesArr[i].pizzaNodesArr[currentSlice - 1];
                    // turn it around
                    let positionAndState = currentNode.changeState();
                    let layerVal = positionAndState[0] - 2;
                    let sliceVal = positionAndState[1] - 1;
                    let stateVal = positionAndState[2];
                    beats[layerVal][sliceVal] = stateVal;
                }
            }
            if (currentNode.isActive) {
                myVoice.speak('On.');
            } else {
                myVoice.speak('Off.')
            }
        }
    }
}

function select_and_toggle(val) {
    selectSlice(val);
    toggleSlice();
}

function nextLayer() {
    if (currentLayer == 4) {
        selectInst(1);
    }
    else {
        selectInst(currentLayer + 1);
    }
}

function select16thGrouping(val) {
    km16thSlicegroup = val;
}

function select16thSlice(val){
  selectSlice(km16thSlicegroup * 4 + val);
}

function select16thSliceToggle(val){
  select16thSlice(val);
  toggleSlice();
}

///////////////////////////////////////////////////// Keyboard Stuff //////////////////////////////////////////////////////////////////

let isPlaying = false; // These should be defined at the top...
let currentLayer = 2;
let currentSlice = 1;
let currentNode;
let pressedKeyMap = new Set();
let lastKeyReleased = null;
let km16thSlicegroup = 0;

function checkHeldKeys(keyRequired) {
    // Return true if keyRequired matches pressedKeyMap
    if (keyRequired.length == pressedKeyMap.size) {
        for (var i = 0; i < keyRequired.length; i++) {
            if (!pressedKeyMap.has(keyRequired[i])) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function keyPressed() {
    pressedKeyMap.add(keyCode);
}

function keyReleased() {
    if (keyCode == 9){
        getTab();
    }

    // Switching the key map
    if (keyCode == KEY_PAGEUP) {
        currentKeyMapIndex = (currentKeyMapIndex + 1) % keymapArray.length;
        console.log("CurrentKeyMapIndex: " + currentKeyMapIndex);
        currentKeyMap = keymapArray[currentKeyMapIndex];
    }
    else if (keyCode == KEY_PAGEDOWN) {
        currentKeyMapIndex = (currentKeyMapIndex - 1) % keymapArray.length;
        console.log("CurrentKeyMapIndex: " + currentKeyMapIndex);
        currentKeyMap = keymapArray[currentKeyMapIndex];
    }


    pressedKeyMap.delete(keyCode);
    lastKeyReleased = keyCode;

    if (Object.keys(currentKeyMap).includes(keyCode.toString())) {
        console.log(currentKeyMap[keyCode]);

        for (var i = 0; i < currentKeyMap[keyCode].keyHeld.length; i++) {
            if (checkHeldKeys(currentKeyMap[keyCode].keyHeld[i])) {

                var type = currentKeyMap[keyCode].type[i];
                var val = currentKeyMap[keyCode].val[i];
                console.log('in selects', val);

                if (type === FUNC_SELECT_LAYER) {
                    selectInst(val);
                } else if (type === FUNC_SELECT_SLICE) {
                    selectSlice(val);
                } else if (type === FUNC_ROTATE) {

                } else if (type === FUNC_TOGGLE) {
                    toggleSlice();
                } else if (type === FUNC_PLAY) {
                    play();
                } else if (type === FUNC_SELECTTOGGLE) {
                    select_and_toggle(val);
                } else if (type == FUNC_NEXTLAYER) {
                    nextLayer();
                } else if (type == FUNC_SELECT16THGROUP) {
                    select16thGrouping(val);
                } else if (type == FUNC_SELECT16THSLICE) {
                    select16thSlice(val);
                } else if (type == FUNC_SELECT16THSLICETOGGLE) {
                    select16thSliceToggle(val);
                }
            }
        }
    }
}
///////////////////////////////////////////// End of Keyboard Stuff ////////////////////////////////////////////////////////////////////
function hightlightNode(layerIndex, slice) {
    let layer;
    if (layerIndex === 0) {
        layer = 2;
    } else if (layerIndex === 1) {
        layer = 1;
    } else {
        layer = 0;
    }
    let currentPlayingNode = myPizza.pizzaSlicesArr[layer].pizzaNodesArr[slice];
    currentPlayingNode.highlight();
}

function cleanHighlights(numSlices) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < numSlices; j++) {
            let thisNode = myPizza.pizzaSlicesArr[i].pizzaNodesArr[j];
            thisNode.notHighlight();
        }
    }
}

function rec() {

}


/////////////// TAB ////////////////
function getTab(){
    let controlNames = {
        'bpm_slider': 'Tempo Slider',
        'numSlices_slider': 'Number of Slices Slider',
        'instructions': "Instructions"
    }
    let element_speak = controlNames[document.activeElement.id] + " " + document.activeElement.value;
    myVoice.speak(element_speak);

}
