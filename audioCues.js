// play current instrument sound when turn the node on
// play it in reverse when turn the node off

// when navigate through pizza slices, synthesize a pitch

let synth = new Tone.Synth().toMaster();
synth.oscillator.type = 'triangle';
synth.volume.value = -6;

// for testing purposes...
/*
synth.envelope.attack = 0.09;
synth.envelope.decay = 0.0795;
synth.envelope.sustain = 0;
synth.envelope.release = 0.02;
*/

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

let polySynth = new Tone.PolySynth (4, Tone.Synth).toMaster();
polySynth.set({"oscillator":{"type":"triangle"}}, {"volume":{"value":-6}});
/*
{
polyphony  : 4 ,
volume  : 0 ,
detune  : 0 ,
voice  : Tone.Synth
}
*/


let noteArr = ['E3', 'F3', 'G3', 'A3', 'B3',
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5'];
		/*	   
let noteArr = [
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
			   'C6', 'D6'];
			   */
console.log(noteArr);

function playSliceAudio(numSlices, slice){
	console.log(numSlices+' '+slice);
	for (let i=0; i<numSlices; i++){
		if (slice == i+1){
			//console.log(noteArr[i]);
			//synth.triggerAttackRelease(noteArr[i], '8n');
			//synth.triggerAttackRelease(noteArr[0], '8n', '+1');

			let noteSet = new Set([noteArr[0], noteArr[i]]);
			//console.log([...noteSet]);	
			polySynth.triggerAttackRelease([...noteSet], '8n');	
		}
	}
}
