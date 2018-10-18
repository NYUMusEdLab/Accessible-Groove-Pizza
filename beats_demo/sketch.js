let windowWidth = 400;
let windowHeight = 400;

let b_color = 100;
let active = false;

Tone.Transport.bpm.value = 120;

let kick = new Tone.Player('audio/Kick.wav').toMaster();
let snare = new Tone.Player('audio/Snare.wav').toMaster();
let hat = new Tone.Player('audio/HH.mp3').toMaster();
let kit = [kick, snare, hat];

let kick_beats = [1, 0, 0, 0, 1, 0, 0, 0];
let snare_beats = [0, 0, 0, 0, 0, 0, 0, 0];
let hat_beats = [0, 0, 0, 0, 0, 0, 0, 0];
let beats = [kick_beats, snare_beats, hat_beats];

let loop = new Tone.Sequence(function(time, col){
    let column = getBeatColumn(beats, col);
    for(let i = 0; i < column.length; i++) {
        if (column[i]) {
            playSound(kit[i], time);
        }
    }
}, [0, 1, 2, 3, 4, 5, 6, 7], "8n");
loop.start();

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(b_color);    																										// color light grey
}

function draw() {
	background(b_color);
}

function mouseReleased() {
    if (!active) {
        b_color = 200;
        Tone.Transport.start();
        active = true;
    }
    else {
        b_color = 100;
        Tone.Transport.stop();
        active = false;
    }
}

function keyTyped() {
    console.log(key);
    beats[1] = middle_row(key, beats[1]);
    beats[2] = top_row(key, beats[2]);

    return false;
}

function inRange() {
    if (mouseX <= width && mouseY <= height) {
        return true;
    }
    else {
        return false;
    }
}

function playSound(samp, time) {
    if (samp.loaded) {
        samp.start(time, 0, "8n");
    }
}

function getBeatColumn(arr, col) {
    return arr.map(function(row) {
        return row[col];
    });
}
