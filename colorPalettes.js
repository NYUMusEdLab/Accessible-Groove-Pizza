// This file simply holds objects that set the colors for the Interface
// Make sure in mySketch.js that the global colorPalette variable

/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
https://venngage.com/blog/color-blind-friendly-palette/
*/

/*
Avoid bad color combinations that may present an issue for color blind people,
such as red & green, green & brown, green & blue, blue & grey, blue & purple, green & grey and green & black.
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

// shades of red
const colors3 = {
    background: {r: 190, g: 180, b: 170}, //
    outerRing: {r: 94, g: 19, b: 14}, //
    middleRing: {r: 255, g: 77, b: 57}, //
    innerRing: {r: 127, g: 39, b: 29}, //
    pizzaCenter: {r: 229, g: 68, b: 50}, //
    nodeOn: {r: 0, g: 0, b: 0}, //
    nodeOff: {r: 255, g: 212, b: 208} //
}

const colors4 = {
  background: {r: 153, g: 51, b: 0}, //
  outerRing: {r: 204, g: 107, b: 0}, //
  middleRing: {r: 40, g: 60, b: 90}, //
  innerRing: {r: 112, g: 140, b: 172}, //
  pizzaCenter: {r: 192, g: 186, b: 196}, //
  nodeOn: {r: 0, g: 0, b: 0}, //
  nodeOff: {r: 255, g: 212, b: 208} //



}
