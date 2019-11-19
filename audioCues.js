// Sonification Mode
// This file is not currently being used
let noteArr = ['E3', 'F3', 'G3', 'A3', 'B3',
			   'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
			   'C5', 'D5', 'E5', 'F5'];


function playSliceAudio(onSynth, offSynth, numSlices, slice, sliceIsActive){
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
