/*
let controls1 = [
    'Press tab to continue listening to the directions. Or press escape to return to the instrument.',
    'Default keyboard control:',
    'To switch between drumsets, press Number 1, and then Q or A or W',
    'To navigate through layers, press Number 2 or 3 or 4'
];
*/
let controls1 = [
    'Press left and right to queue new directions.',
    'Press up to repeat the current instruction.',
    'Press tab to toggle between active elements including instructions, volume slider, and tempo slider.',
    'Press 1, and then Q, W, or A to selct an instrument set.',
    'Press 2, 3, or 4 to select an instrument or layer.',
    'When an instrument is selected, use the top row of letters, Q through I, to select odd-numbered beats.',
    'When an instrument is selected, use the middle row of letters, A through K, to select even-numbered beats.',
    'Press space to play or stop the music',
    'Press enter to toggle a beat, or hold shift while selecting a beat.',
    'While holding the function key, press up or down to change key mappings.'
];

/*
let controls1Iterator = 0;

// left/right arrow sets the iterator
function displayInstructions(val) {
	controls1Iterator += val;
	if (controls1Iterator <= 0){
		controls1Iterator = 0;
	}
	else if (controls1Iterator >= controls1.length-1){
		controls1Iterator = controls1.length-1;
	}
	return controls1[controls1Iterator];
}
*/

// Custom modulus function for iterating within the
// instructions list that supports negative numbers
function mod(n, m) {
  return ((n % m) + m) % m;
}