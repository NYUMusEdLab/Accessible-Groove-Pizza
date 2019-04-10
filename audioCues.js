// play current instrument sound when turn the node on
// play it in reverse when turn the node off

// when navigate through pizza slices, synthesize a pitch


let synth = new Tone.Synth().toMaster();
synth.oscillator.type = 'triangle';

/*
{
	oscillator  : {
	type  : triangle
	}  ,
	envelope  : {
	attack  : 0.005 ,
	decay  : 0.1 ,
	sustain  : 0.3 ,
	release  : 1
	}
}
*/
let startMidi = 60;
let noteArr = [];
for (let i=0; i<16; i++){
	let currentMidi = startMidi+i*2;
	let currentNote = Tone.Frequency(currentMidi, "midi").toNote();
	noteArr.push(currentNote);
}
console.log(noteArr);

function playSliceAudio(slice){
	for (let i=0; i<noteArr.length; i++){
		if (slice == i+1){
			console.log(noteArr[i]);
			synth.triggerAttackRelease(noteArr[i], '8n');			
		}
	}
}