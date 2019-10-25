# Accessible Groove Pizza
**The current version of this prototype is available free online. It works best in Chrome.**
 * https://nyumusedlab.github.io/Accessible-Groove-Pizza/

## Overview
This project is a prototype version of the [NYU Groove Pizza](https://apps.musedlab.org/groovepizza) that supports keyboard input with customizable key mappings, text-to-speech/sonification output, swappable color palettes, and more. It is meant to be usable with limited or no vision.

## Keyboard Mappings

### Constants
fn + UP_ARROW / DOWN_ARROW - Switch between different mappings

TAB - Toggle between interface elements (instructions, tempo, number of slices) and use ARROW keys on selected element.

SPACE - Start/Stop

'+' / '-' - Iterate through audio settings.
* Practice Mode - Screenreader (text-to-speech) is turned on and music volume is lowered.
* Sonification - Most text-to-speech is replaced with tones.
* Performance - All non-music sounds silenced and music turned to full volume.

### Default Mapping
This mapping makes it easy to differentiate between eighth notes and sixteenth-note offbeats.

1 - Switch drum sets
* Q - 16-bit
* A - Rock Drums
* W - Bongos

***
2 - Toggle inner layer (Usually high-pitched drum)

3 - Toggle middle layer (Usually middle-pitched drum)

4 - Toggle outer layer (Usually low-pitched drum)

* Q to I - Odd number slice (quarter/eigth notes)
* A to K - Even number slice (sixteenth notes)
* ENTER - Toggle on/off a node
* Hold SHIFT to select and toggle

### 16th (In progress)
This mapping makes it easy to control notes relative to the position in the measure.

1 - 16th grouping 1
* D F G H - 1 2 3 4 ("1-ee-and-ah")

2 - 16th grouping 2
* D F G H - 5 6 7 8 ("1-ee-and-ah")

3 - 16th grouping 3
* D F G H - 9 10 11 12 ("1-ee-and-ah")

4 - 16th grouping 4
* D F G H - 13 14 15 16

### Run locally
After downloading, simply navigate to the source directory and fire up an HTML server.
```
$ python -m SimpleHTTPServer
Serving HTTP on 0.0.0.0 port 8000 ...
```

## Dependencies
This prototype is built on top of the following libraries:
* [p5.js](https://p5js.org)
  * [p5.dom.js](https://p5js.org/reference/#/libraries/p5.dom)
  * [p5.speech.js](http://ability.nyu.edu/p5.js-speech/)
* [Tone.js](https://tonejs.github.io)

## Physical Groove Pizza
We have begun working on a tangible version of the instrument using [Reactivision](http://reactivision.sourceforge.net). Code is stored in the tangible folder.
