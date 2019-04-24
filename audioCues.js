// play current instrument sound when turn the node on
// play it in reverse when turn the node off

// when navigate through pizza slices, synthesize a pitch

let offSynth = new Tone.PolySynth (4, Tone.Synth).toMaster();
let onSynth = new Tone.PolySynth (4, Tone.Synth).toMaster();
offSynth.set({"oscillator":{"type":"triangle"}}, {"volume":{"value":-6}});
onSynth.set({"oscillator":{"type":"square"}}, {"volume":{"value":-10}});

let noteArr = ['E3', 'F3', 'G3', 'A3', 'B3',
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5'];
		/*
let noteArr = [
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
			   'C6', 'D6'];
			   */
// console.log(noteArr);

function playSliceAudio(numSlices, slice, sliceIsActive){
	console.log(numSlices+' '+slice);
	for (let i=0; i<numSlices; i++){
		if (slice == i+1){
			//console.log(noteArr[i]);
			//synth.triggerAttackRelease(noteArr[i], '8n');
			//synth.triggerAttackRelease(noteArr[0], '8n', '+1');

			let noteSet = new Set([noteArr[0], noteArr[i]]);
			//console.log([...noteSet]);
			if (sliceIsActive) {
				onSynth.triggerAttackRelease([...noteSet], '8n');
			}
			else {
				offSynth.triggerAttackRelease([...noteSet], '8n');
			}

		}
	}
}
