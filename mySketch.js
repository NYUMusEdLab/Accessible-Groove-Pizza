/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
*/
let bpm = 120;
Tone.Transport.bpm.value = bpm;
let beatDur = '16n'; // should be constant
let numBeats = 16; // controls the pizza slices
let numBeatsArr = generateBeatsArr(numBeats);

// all the sliders to control pizza
let bpm_slider;
let numSlices_slider;

// all the sound sources
let kick = new Tone.Player('audio/Kick.wav').toMaster();
let snare = new Tone.Player('audio/Snare.wav').toMaster();
let hat = new Tone.Player('audio/HH.mp3').toMaster();

let kick_beats; //= mapBeats(myPizza.pizzaSlicesArr[0].pizzaNodesArr);
let snare_beats; //= mapBeats(myPizza.pizzaSlicesArr[1].pizzaNodesArr);
let hat_beats; //= mapBeats(myPizza.pizzaSlicesArr[2].pizzaNodesArr);
let beats; //= [kick_beats, snare_beats, hat_beats];

// an arr to store all types of sounds
let soundArr = [{name: 'Some Name', sounds: [kick, snare, hat]},
                {name: 'Other Name', sounds: [hat, snare, kick]}]
let currentInst = soundArr[0]; // default

let myPizza = new pizza(1920 / 2.5, 1080 / 3, 100, 1.5, numBeats);

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
// give it an array of pizzaNode objects
function mapBeats(pizzaNodesArr) {
    this.pizzaNodesArr = pizzaNodesArr;
    this.beatMap = [];
    // loop through the array and creates a beat map
    for (let i = 0; i < this.pizzaNodesArr.length; i++) {
        let currentNodeBeat = this.pizzaNodesArr[i].isActive;
        this.beatMap.push(currentNodeBeat);
    }
    return this.beatMap
}

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

function generateBeatsArr(numBeats){
    let numBeatsArr = [];
    for (let i=0; i<numBeats; i++){
        numBeatsArr.push(i);
    }
    return numBeatsArr;
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
    numBeatsArr = generateBeatsArr(numBeats);

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
    background(210);
    //nodeGrid(50, 100, 400, 200, 16);
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

    // renew beats in draw
    kick_beats = mapBeats(myPizza.pizzaSlicesArr[0].pizzaNodesArr);
    snare_beats = mapBeats(myPizza.pizzaSlicesArr[1].pizzaNodesArr);
    hat_beats = mapBeats(myPizza.pizzaSlicesArr[2].pizzaNodesArr);
    beats = [kick_beats, snare_beats, hat_beats];
}

///////////////////////////////// End of Draw Stuff ///////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////// Mouse Stuff /////////////////////////////////////////////////////////////////////////////
// change the activeness of each node
function mouseReleased(){
    // loop through all nodes
    for (let i=0; i<myPizza.pizzaSlicesArr.length;i++){
        for (let j=0; j<myPizza.pizzaSlicesArr[i].pizzaNodesArr.length; j++){
            let currentNode = myPizza.pizzaSlicesArr[i].pizzaNodesArr[j];
            if (dist(mouseX, mouseY, currentNode.nodeX, currentNode.nodeY) <= currentNode.nodeSize) {
                currentNode.isActive = !currentNode.isActive;
            } 
        }
    }
}
//////////////////////////////////////////// End of Mouse Stuff /////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// Keyboard Stuff //////////////////////////////////////////////////////////////////

let startPlaying = false;
let currentLayer = 2;
let currentSlice = 1;
let currentNode;

function keyReleased() {
    // press space, play beats
    if (keyCode === 32) {
        startPlaying = !startPlaying;
        if (startPlaying){
            console.log('start playing');
            Tone.Transport.start();
        }
        else{
            console.log('stop playing');
            Tone.Transport.stop();
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
                        currentNode.isActive = !currentNode.isActive;
                    }
                }
                if (currentNode.isActive === true) {
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

function pizza(pizzaX, pizzaY, innerSize, sizeRatio, numSlices) {
    this.innerSize = innerSize; // radius in pixels of the inner circle
    this.sizeRatio = sizeRatio; // ratio for increasing the size of circles
    // position of center of pizza
    this.pizzaX = pizzaX;
    this.pizzaY = pizzaY;
    this.numSlices = numSlices;

    // have an array to store all the pizza slices to access later
    this.pizzaSlicesArr = [];

    // draw the pizza!
    // outer circle
    this.pizzaSlicesArr.push(new pizzaSlices(4, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio * 3, 250, 140, 141)); // color peachy pink
    // middle circle
    this.pizzaSlicesArr.push(new pizzaSlices(3, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio * 2, 62, 173, 93)); // color green
    // inter circle
    this.pizzaSlicesArr.push(new pizzaSlices(2, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio, 173, 80, 80)); // color dark peachy pink

    // call this function when change the slice number or something
    this.updatePizza = function(){
        for (let i=0; i< this.pizzaSlicesArr.length; i++){
            this.pizzaSlicesArr[i].numSlices = this.numSlices;
            this.pizzaSlicesArr[i].updatePizzaSlices();
            //this.pizzaSlicesArr[i].increaseAngle = 2 * Math.PI / this.pizzaSlicesArr[i].numSlices;
        }
    }

    this.drawPizza = function() {
        push();
        // draw the slices of pizza
        for (let i = 0; i < this.pizzaSlicesArr.length; i++) {
            this.pizzaSlicesArr[i].drawPizzaSlices();
        }

        // inner circle of pizza
        fill(140, 250, 170); // color light green
        ellipse(this.pizzaX, this.pizzaY, this.innerSize, this.innerSize);

        push()
        // show type text
        fill(0);
        noStroke();
        text(currentInst.name, this.pizzaX-this.innerSize/3, this.pizzaY);
        pop();

        // outer numbers
        this.pizzaSlicesArr[2].drawNum = true;
        pop();
    }

}

function pizzaSlices(layer, numSlices, sliceX, sliceY, sliceSize, r, g, b) {
    this.layer = layer;
    this.numSlices = numSlices;
    this.sliceX = sliceX;
    this.sliceY = sliceY;
    this.sliceSize = sliceSize;
    this.r = r;
    this.g = g;
    this.b = b;
    this.drawNum = false; // set to true on outer layer
    // to draw
    this.startAngle = 0;
    this.increaseAngle = 2 * Math.PI / this.numSlices; // 22.5 if 16 slices
    // have an array to store all the pizza nodes to access later
    this.pizzaNodesArr = [];

    // this create the initial slices
    for (var i = 0; i < this.numSlices; i++) {
        let nodeAngle = this.startAngle + this.increaseAngle / 2;
        this.startAngle += this.increaseAngle;
        // create the nodes on each slice!
        let nodeX = this.sliceX + (((this.sliceSize - 100) / 2) * Math.cos(nodeAngle));
        let nodeY = this.sliceY + (((this.sliceSize - 100) / 2) * Math.sin(nodeAngle));
        let currentPizzaNode = new pizzaNode(i + 1, nodeX, nodeY);
        this.pizzaNodesArr.push(currentPizzaNode);
    }

    // call update when slices num is changed or something
    this.updatePizzaSlices = function(){
        this.increaseAngle = 2 * Math.PI / this.numSlices;

        // updating pizza nodes here
        for (var i = 0; i < this.numSlices; i++) {
            let nodeAngle = this.startAngle + this.increaseAngle / 2;
            this.startAngle += this.increaseAngle;
            // update the nodes position!
            let nodeX = this.sliceX + (((this.sliceSize - 100) / 2) * Math.cos(nodeAngle));
            let nodeY = this.sliceY + (((this.sliceSize - 100) / 2) * Math.sin(nodeAngle));
            this.pizzaNodesArr[i].nodeX = nodeX;
            this.pizzaNodesArr[i].nodeY = nodeY;
        }
    }

    this.drawPizzaSlices = function() {
        // reset angles
        this.startAngle = 0;
        this.increaseAngle = (2 * Math.PI / this.numSlices); // 2PI/16 slices

        push();
        // change angle mode to RADIANS!
        angleMode(RADIANS);
        // stroke color light grey
        stroke(200);
        fill(r, g, b);

        // draw num slices
        for (var i = 0; i < this.numSlices; i++) {
            arc(this.sliceX, this.sliceY, this.sliceSize, this.sliceSize, this.startAngle, this.startAngle + this.increaseAngle, PIE);

            let nodeAngle = this.startAngle + this.increaseAngle / 2;

            // if it's layer 4 and we draw the numbers around
            if (this.drawNum === true) {
                push();
                noStroke();
                fill(0);
                let textX = this.sliceX + ((this.sliceSize + 50) * Math.cos(nodeAngle));
                let textY = this.sliceY + ((this.sliceSize + 50) * Math.sin(nodeAngle));
                text(this.pizzaNodesArr[i].slice, textX, textY);
                pop();
            }
            this.startAngle += this.increaseAngle;
            // draw the nodes on each slice!
            this.pizzaNodesArr[i].drawPizzaNode();
        }
        pop();
    }
}

// this function would probably draw shapes
function pizzaNodes() {}

function pizzaNode(slice, nodeX, nodeY) {
    this.slice = slice;
    this.nodeX = nodeX;
    this.nodeY = nodeY;
    this.nodeSize = 15;
    this.fillColor = 255;
    this.isActive = false;
    //console.log(this.isActive);

    this.drawPizzaNode = function() {
        // draw the node!
        push();
        noStroke();
        fill(this.fillColor);
        ellipse(this.nodeX, this.nodeY, this.nodeSize, this.nodeSize);

        // if node is isActive, change it to a different color
        if (this.isActive === true) {
            this.fillColor = 0;
        } 
        else {
            this.fillColor = 255;
        }

        pop();
    }
}

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