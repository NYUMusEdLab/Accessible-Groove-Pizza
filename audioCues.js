// play current instrument sound when turn the node on
// play it in reverse when turn the node off

// when navigate through pizza slices, synthesize a pitch

let offSynth = new Tone.PolySynth (4, Tone.Synth).chain(controlsVol, Tone.Master);
let onSynth = new Tone.PolySynth (4, Tone.Synth).chain(controlsVol, Tone.Master);
offSynth.set({"oscillator":{"type":"triangle"}}, {"volume":{"value":-6}});
onSynth.set({"oscillator":{"type":"square"}});
onSynth.volume.value = -10;

let noteArr = ['E3', 'F3', 'G3', 'A3', 'B3',
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5'];


function playSliceAudio(numSlices, slice, sliceIsActive){
	console.log(numSlices+' '+slice);
	for (let i=0; i<numSlices; i++){
		if (slice == i+1){
			let noteSet = new Set([noteArr[0], noteArr[i]]);
			if (sliceIsActive) {
				onSynth.triggerAttackRelease([...noteSet], '8n');
			}
			else {
				offSynth.triggerAttackRelease([...noteSet], '8n');
			}

		}
	}
}
