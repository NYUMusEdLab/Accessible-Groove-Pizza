// todo
// Figure out cleaner way of converting layers to beat array indices
// Look at inheritance and how the various classes are declared
// Refactor when possible

let bpm = 120;
Tone.Transport.bpm.value = bpm;
let beatDur = '16n'; // should be constant
let numBeats = 16; // controls the pizza slices
let numBeatsArr = [...Array(numBeats).keys()];

// all the sliders to control pizza
let bpm_slider;
let numSlices_slider;

// all the sound sources
let kick = new Tone.Player('audio/Kick.wav').toMaster();
let snare = new Tone.Player('audio/Snare.wav').toMaster();
let hat = new Tone.Player('audio/HH.mp3').toMaster();

let kick_beats = new Array(numBeats).fill(0);
let snare_beats = new Array(numBeats).fill(0);
let hat_beats = new Array(numBeats).fill(0);
let beats = [kick_beats, snare_beats, hat_beats];

// an arr to store all types of sounds
let soundArr = [{name: 'Some Name', sounds: [hat, snare, kick]},
                {name: 'Other Name', sounds: [hat, snare, kick]}]
let currentInst = soundArr[0]; // default

// Visuals
let colorPalette = pinkAndGreen;

let myPizza = new Pizza(1920 / 2.5, 1080 / 3, 100, 1.5, numBeats, colorPalette);
let myVoice;

function preload() {
    // audio cues
    myVoice = new p5.Speech();
    myVoice.onLoad = voicesLoaded;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // show the pizza nodes objects
    console.log(myPizza.pizzaSlicesArr);

    bpm_slider = createSlider(50, 180, bpm, 1);
    bpm_slider.changed(changeBPM);
    bpm_slider.position(150, windowHeight/2);
    bpm_slider.style('width', '100px');

    numSlices_slider = createSlider(2, 16, numBeats, 1);
    numSlices_slider.changed(changeNumSlices);
    numSlices_slider.position(150, windowHeight/2+50);
    numSlices_slider.style('width', '100px');
}

function voicesLoaded() {
    myVoice.interrupt = true;
    myVoice.setRate(2);
}

/////////////////////////////////////////// Audio Stuff ////////////////////////////////////////////////////////////////////////////////
let loop = new Tone.Sequence(function(time, col){
    let column = getBeatColumn(beats, col);
    //console.log(col);
    for(let i = 0; i < column.length; i++) {
        if (column[i]) {
            playSound(currentInst.sounds[i], time);
        }
    }
}, numBeatsArr, beatDur);
loop.start();

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
function changeBPM(){
    Tone.Transport.bpm.rampTo(bpm_slider.value(), 0.5);
}

function changeNumSlices(){
    myPizza.numSlices = numSlices_slider.value();
    myPizza.updatePizza();
    myPizza.drawPizza();

    numBeats = numSlices_slider.value(); // controls the pizza slices
    numBeatsArr = [...Array(numBeats).keys()] // array from 0 to n

    // redo loop
    loop.stop();
    loop.dispose();
    loop = new Tone.Sequence(function(time, col){
        let column = getBeatColumn(beats, col);
        //console.log(col);
        for(let i = 0; i < column.length; i++) {
            if (column[i]) {
                playSound(currentInst.sounds[i], time);
            }
        }
    }, numBeatsArr, beatDur);
    console.log(loop.length);
    loop.start();

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
    text('BPM', 80, height/2+10);
    text(bpm_slider.value(), 250, height/2+10);
    text('Slices', 80, height/2+60);
    text(numSlices_slider.value(), 250, height/2+60);
    pop();

    // indication on which layer and slice
    push();
    noStroke();
    fill(0);
    text('Current Layer: ' + currentLayer + '   Current Slice: ' + currentSlice, 80, height/2+110);
    pop();
}

function updateColorPalette(newColorPalette) {
    colorPalette = newColorPalette;
    myPizza.updateColor(colorPalette);
}

///////////////////////////////// End of Draw Stuff ///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// Mouse Stuff /////////////////////////////////////////////////////////////////////////////
// change the activeness of each node
function mouseReleased(){
    // Click on the pizza
    // If the function returns false, the user did not click on a node
    // Otherwise, update the beatsArray with the node that change
    let positionAndState = myPizza.clickPizza(mouseX, mouseY);
    if (!positionAndState) {return false;} // If clicking did not do anything

    let layerVal = positionAndState[0] - 2; // layers range from 2 to 4
    let sliceVal = positionAndState[1] - 1; // slices begin at 1
    let stateVal = positionAndState[2];
    beats[layerVal][sliceVal] = stateVal;
}
//////////////////////////////////////////// End of Mouse Stuff /////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// Keyboard Stuff //////////////////////////////////////////////////////////////////

let isPlaying = false; // These should be defined at the top...
let currentLayer = 2;
let currentSlice = 1;
let currentNode;

function keyReleased() {
    // press space, play beats
    if (keyCode === 32) {
        if (!isPlaying){
            console.log('start playing');
            Tone.Transport.start();
            isPlaying = true;
        }
        else{
            console.log('stop playing');
            Tone.Transport.stop();
            isPlaying = false;
        }
    }

    // press enter control the node
    if (keyCode === ENTER) {
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
                    myVoice.speak('Beat on.');
                } else {
                    myVoice.speak('Beat off.')
                }
            }
        }
    }

    // MOVE AROUND LAYER
    // press 1
    if (keyCode === 49) {
        currentLayer = 1;
        myVoice.speak('Layer 1.');
    }
    // press 2
    else if (keyCode === 50) {
        currentLayer = 2;
        myVoice.speak('Layer 2.');
    }
    // press 3
    else if (keyCode === 51) {
        currentLayer = 3;
        myVoice.speak('Layer 3.');
    }
    // press 4
    else if (keyCode === 52) {
        currentLayer = 4;
        myVoice.speak('Layer 4.');
    }

    // if we are on instrument layer, qawse controls which type of music to play
    if (currentLayer === 1){
        // press Q
        if (keyCode === 81) {
            currentInst = soundArr[0];
            myVoice.speak(currentInst.name);
        }
        // press A
        else if (keyCode === 65) {
            currentInst = soundArr[1];
            myVoice.speak(currentInst.name);
        }
        // press W
        else if (keyCode === 87) {

        }
        // press S
        else if (keyCode === 83) {

        }
        // press E
        else if (keyCode === 69) {

        }
    }
    // if we are on nodes layers
    else{
        // MOVE AROUND NODES
        // press Q
        if (keyCode === 81) {
            currentSlice = 1
            myVoice.speak('Slice 1.');
        }
        // press A
        else if (keyCode === 65) {
            currentSlice = 2
            myVoice.speak('Slice 2.');
        }
        // press W
        else if (keyCode === 87) {
            currentSlice = 3
            myVoice.speak('Slice 3.');
        }
        // press S
        else if (keyCode === 83) {
            currentSlice = 4
            myVoice.speak('Slice 4.');
        }
        // press E
        else if (keyCode === 69) {
            currentSlice = 5
            myVoice.speak('Slice 5.');
        }
        // press D
        else if (keyCode === 68) {
            currentSlice = 6
            myVoice.speak('Slice 6.');
        }
        // press R
        else if (keyCode === 82) {
            currentSlice = 7
            myVoice.speak('Slice 7.');
        }
        // press F
        else if (keyCode === 70) {
            currentSlice = 8
            myVoice.speak('Slice 8.');
        }
        // press T
        else if (keyCode === 84) {
            currentSlice = 9
            myVoice.speak('Slice 9.');
        }
        // press G
        else if (keyCode === 71) {
            currentSlice = 10
            myVoice.speak('Slice 10.');
        }
        // press Y
        else if (keyCode === 89) {
            currentSlice = 11
            myVoice.speak('Slice 11.');
        }
        // press H
        else if (keyCode === 72) {
            currentSlice = 12
            myVoice.speak('Slice 12.');
        }
        // press U
        else if (keyCode === 85) {
            currentSlice = 13
            myVoice.speak('Slice 13.');
        }
        // press J
        else if (keyCode === 74) {
            currentSlice = 14
            myVoice.speak('Slice 14.');
        }
        // press I
        else if (keyCode === 73) {
            currentSlice = 15
            myVoice.speak('Slice 15.');
        }
        // press K
        else if (keyCode === 75) {
            currentSlice = 16
            myVoice.speak('Slice 16.');
        }
    }
}

///////////////////////////////////////////// End of Keyboard Stuff ////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////// The Pizza Part /////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////// End of Pizza Part ///////////////////////////////////////////////////////////////////

///////////////////////////////////////////The Other Stuff///////////////////////////////////////////////////////////////////

function nodeGrid(gridX, gridY, gridW, gridH, numSlice) {
    this.gridX = gridX;
    this.gridY = gridY;
    this.gridW = gridW;
    this.gridH = gridH;
    this.numSlice = numSlice;
    this.rectH = gridH / 4; // there should be four rows: numbers & pizza nodes
    this.rectW = gridW / numSlice;
    rectMode(CORNER); // this is default
    // draw the bg rectangle
    noStroke();
    fill(255);
    rect(this.gridX, this.gridY, this.gridW, this.gridH);

    // draw the layer rectangles
    stroke(0);
    fill(100);
    let rectY = this.gridY;
    // loop through y
    for (let i = 0; i < 4; i++) {
        let rectX = this.gridX;
        // loop through x
        for (let j = 0; j < this.numSlice; j++) {
            rect(rectX, rectY, this.rectW, this.rectH);
            rectX += this.rectW;
        }
        rectY += this.rectH;
    }
}

function gridNode(nodeX, nodeY) {

}

///////////////////////////////////////The End of Other Stuff//////////////////////////////////////////////////////////////////
