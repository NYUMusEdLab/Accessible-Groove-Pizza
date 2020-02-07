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

// One from Martin = 4

const colors1 = {
    background: {r: 210, g: 210, b: 210}, // grey

    outerRing: {r: 250, g: 140, b: 141}, // peachy pink
    outerShape: {r: 200, g: 100, b: 100},
    outerNodeOn: {r: 200, g: 100, b: 100},
    middleRing: {r: 62, g: 173, b: 93}, // green
    middleShape: {r: 10, g: 120, b: 50},
    middleNodeOn: {r: 10, g: 120, b: 50},
    innerRing: {r: 173, g: 80, b: 80}, // dark peachy pink
    innerShape: {r: 120, g: 30, b: 30},
    innerNodeOn:{r: 120, g: 30, b: 30},
    pizzaCenter: {r: 140, g: 250, b: 170}, // light green - may require multiple colors per instrument
    nodeOff: {r: 250, g: 250, b: 250}, // white

    text: {r: 0, g: 0, b: 0}, // black
    htmlText: 'black'
};

const colors2 = {
    background: {r: 255, g: 247, b: 173}, // beige
    outerRing: {r: 178, g: 9, b: 53}, // red
    outerShape: {r: 128, g: 0, b: 3},
    outerNodeOn:{r: 128, g: 0, b: 3},
    middleRing: {r: 0, g: 138, b: 255}, // blue
    middleShape: {r: 0, g: 90, b: 200},
    middleNodeOn: {r: 0, g: 90, b: 200},
    innerRing: {r: 204, g: 20, b: 68}, // rose red?
    innerShape: {r: 150, g: 0, b: 18},
    innerNodeOn:{r: 150, g: 0, b: 18},
    pizzaCenter: {r: 255, g: 238, b: 0}, // yellow
    nodeOff: {r: 250, g: 250, b: 250}, // white

    text: {r: 0, g: 0, b: 0}, // black
    htmlText: 'black'
}

// shades of red
const colors3 = {
    background: {r: 190, g: 180, b: 170}, //
    outerRing: {r: 94, g: 19, b: 14}, //
    outerShape: {r: 40, g: 0, b: 0},
    outerNodeOn:{r: 40, g: 0, b: 0},
    middleRing: {r: 255, g: 77, b: 57}, //
    middleShape: {r: 200, g: 27, b: 7},
    middleNodeOn:{r: 200, g: 27, b: 7},
    innerRing: {r: 127, g: 39, b: 29}, //
    innerShape: {r: 80, g: 0, b: 0},
    innerNodeOn: {r: 80, g: 0, b: 0},
    pizzaCenter: {r: 229, g: 68, b: 50}, //
    nodeOff: {r: 255, g: 212, b: 208}, //

    text: {r: 0, g: 0, b: 0}, // black
    htmlText: 'black'
}

const colors4 = {
  background: {r: 153, g: 51, b: 0}, //
  outerRing: {r: 204, g: 107, b: 0}, //
  outerShape: {r: 150, g: 50, b: 0},
  outerNodeOn:{r: 150, g: 50, b: 0},
  middleRing: {r: 40, g: 60, b: 90}, //
  middleShape: {r: 0, g: 10, b: 40},
  middleNodeOn:{r: 0, g: 10, b: 40},
  innerRing: {r: 112, g: 140, b: 172}, //
  innerShape: {r: 152, g: 180, b: 212},
  innerNodeOn:{r: 152, g: 180, b: 212},
  pizzaCenter: {r: 153, g: 51, b: 0}, //
  nodeOff: {r: 250, g: 250, b: 250}, //

  text: {r: 250, g: 250, b: 250}, // white
  htmlText: 'white'
}

const colors5 = {
  background: {r: 255, g: 255, b: 255}, //
  outerRing: {r: 240, g: 200, b: 170}, //
  outerShape: {r: 140, g: 100, b: 85},
  outerNodeOn:{r: 140, g: 100, b: 85},
  middleRing: {r: 40, g: 60, b: 90}, //
  middleShape: {r: 20, g: 30, b: 45},
  middleNodeOn:{r: 20, g: 30, b: 45},
  innerRing: {r: 120, g: 120, b: 140}, //
  innerShape: {r: 60, g: 60, b: 70},
  innerNodeOn:{r: 60, g: 60, b: 70},
  pizzaCenter: {r: 112, g: 140, b: 172}, //
  nodeOff: {r: 250, g: 250, b: 250}, //

  text: {r: 0, g: 0, b: 0}, // black
  htmlText: 'black'
}

// for the poster demo
// 51, 153, 255
const colors6 = {
  background: {r: 204, g: 204, b: 255}, // white

  outerRing: {r: 57, g: 28, b: 84},
  outerShape: {r: 39, g: 118, b: 138},
  outerNodeOn:{r: 39, g: 118, b: 138},

  middleRing: {r: 174, g: 133, b: 212},
  middleShape: {r: 61, g: 187, b: 219},
  middleNodeOn:{r: 61, g: 187, b: 219},

  innerRing: {r: 91, g: 44, b: 134},
  innerShape: {r: 71, g: 218, b: 255},
  innerNodeOn:{r: 71, g: 218, b: 255},

  pizzaCenter: {r: 127, g: 98, b: 155},

  nodeOff: {r: 250, g: 250, b: 250}, // white

  text: {r: 0, g: 0, b: 0}, // black
  htmlText: 'black'
}
