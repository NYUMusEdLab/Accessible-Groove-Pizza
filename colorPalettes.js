// This file simply holds objects that set the colors for the Interface
// Make sure in mySketch.js that the global colorPalette variable

/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
*/

const colors1 = {
    background: {r: 210, g: 210, b: 210}, // grey
    outerRing: {r: 250, g: 140, b: 141}, // peachy pink
    middleRing: {r: 62, g: 173, b: 93}, // green
    innerRing: {r: 173, g: 80, b: 80}, // dark peachy pink
    pizzaCenter: {r: 140, g: 250, b: 170}, // light green - may require multiple colors per instrument
    nodeOn: {r: 0, g: 0, b: 0}, // black
    nodeOff: {r: 250, g: 250, b: 250} // white
};

const colors2 = {
    background: {r: 255, g: 247, b: 173}, // beige
    outerRing: {r: 178, g: 9, b: 53}, // red
    middleRing: {r: 0, g: 138, b: 255}, // blue
    innerRing: {r: 204, g: 20, b: 68}, // rose red?
    pizzaCenter: {r: 255, g: 238, b: 0}, // yellow
    nodeOn: {r: 0, g: 0, b: 0}, // black
    nodeOff: {r: 250, g: 250, b: 250} // white
}