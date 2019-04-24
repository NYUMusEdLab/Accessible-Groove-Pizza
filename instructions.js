let controls1 = [
    'Press tab to continue listening to the directions. Or press escape to return to the instrument.',
    'Test 1',
    'Test 2'
];

let controls1Iterator = 0;

// left/right arrow sets the iterator
function displayInstructions() {

    controls1Iterator++;
}

function removeInstructions() {
    window.alert = function() {};
}
