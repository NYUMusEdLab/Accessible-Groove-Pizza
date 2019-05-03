const osc = require('osc');

class Pizza {
    constructor(udpPort) {
        this.centerID = 0;

        this.previousBeatList = [];
        this.radii = [0.2, 0.4, 1.01]; // Radius for each slice (range 0–1)
        this.numBeats = 8; // Number of slices or beats in the pizza

        this.arcs = Pizza.calculateArcs(this.numBeats);

        this.url = '127.0.0.1';
        this.port = 4444;
        this.address = '/pizza'
        this.udpPort = udpPort;
    }

    handleMessage(oscBundle) {
        let self = this;
        let numTags = oscBundle.packets.length - 3;

        // Do nothing if no tags present
        if (!numTags) { return false; }

        let tagsBundle = oscBundle.packets.slice(2, numTags + 2);
        let tagIDs = tagsBundle.map(t => t.args[2].value);
        // console.log(tagIDs);

        // Do nothing if the center of the pizza has not been detected
        let centerPresent = tagIDs.filter(id => id == self.centerID).length;
        if (!centerPresent) {return false; }
        // console.log(centerPresent);

        // Capture id, x, y from each tag
        let tagVals = tagsBundle.map(function(t) {
            return {
                id: t.args[2].value,
                x: t.args[3].value,
                y: t.args[4].value
            }
        });

        // Separate the center tag (center) from all other tags (beats)
        let centerNode = new Node(tagVals.filter(t => t.id == self.centerID)[0]);
        let otherTags = tagVals.filter(t => t.id != self.centerID);
        let newNodes = otherTags.map(t => new Node(t));

        // Figure out the angle and radius from the center position
        // Then figure out the beat and slice it must refers to
        let newBeatList = [];
        for (let n of newNodes) {
            n.calculateAngleAndRadius(centerNode);
            n.calculateBeat(self.numBeats);
            n.calculateSlice(self.radii);
            newBeatList.push(n.slice, n.beat);
        }

        // If nothing has changed, then do nothing
        if (newBeatList.toString() == self.previousBeatList.toString()) { return false; }

        self.sendOSCMessage(newBeatList);
        self.previousBeatList = newBeatList;

        return newBeatList;
    }

    // Sends osc message with list as a string
    sendOSCMessage(beatList) {
        let self = this;

        self.udpPort.send({
            address: self.address,
            args: [
                {
                    type: 's',
                    value: beatList.join(' ')
                }
            ]
        }, self.url, self.port);
    }

    // Determine the arc positions for predicting slices
    // Likely a simpler way, but this makes the most sense to me
    static calculateArcs(numBeats) {
        let arcSize = 360/numBeats;
        let arcOffset = 360/(numBeats * 2);
        let arcs = [];

        for (let b = 0; b < numBeats; b++) {
            let arcCenter = (arcSize * b);

            let arcLeft = arcCenter - arcOffset;
            if (arcLeft < 0) { arcLeft += 360; }
            let arcRight = arcCenter + arcOffset;
            if (arcRight >= 360) { arcRight -= 360; }

            arcs.push([arcLeft, arcRight]);
        }
        return arcs;
    }
}

class Node {
    constructor(tagInfo) {
        this.id = tagInfo.id;
        this.x = tagInfo.x;
        this.y = tagInfo.y;

        this.angle = -1;
        this.radius = 0;

        this.beat = 0;
        this.slice = 0;
    }

    calculateAngleAndRadius(cNode) {
        // Node coordinates relative to the center
        let xRel = this.x - cNode.x;
        let yRel = this.y - cNode.y;

        // Calculate angle between node and the y Axis
        // Ensure it ranges from 0 to 360
        let yAxis = {x:0, y:1};
        let angleInRadians = Math.atan2(yAxis.y, yAxis.x) - Math.atan2(yRel, xRel);
        let degreesNeg = 180 * (angleInRadians / Math.PI);
        this.angle = (360 + Math.round(degreesNeg)) % 360;

        // Calculate distance using Pythagorean theorem
        let aSquared = Math.pow(xRel, 2);
        let bSquared = Math.pow(yRel, 2);
        this.radius = Math.sqrt(aSquared + bSquared);

        return [this.angle, this.radius];
    }

    // seem to only be getting 0's - check on this function
    calculateBeat(arcs) {
        if (!(this.angle + 1)) { return false; }
        for (i in arcs) {
            // Case for first slice
            if (arcs[i][0] > arcs[i][1]) {
                if (this.angle > arcs[i][0] || this.angle <= arcs[i][1]) {
                    this.beat = i;
                }
            }
            else {
                if (this.angle > arcs[i][0] && this.angle <= arcs[i][1]) {
                    this.beat = i;
                }
            }
        }
        return this.beat;
    }

    // Should return 0, 1, or 2
    calculateSlice(radii) {
        if (!this.radius) { return false; }
        this.slice = (radii.filter(r => r <= this.radius)).length;

        return this.slice;
    }
}

let udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 3333,
    metadata: true
});

// Main...
udpPort.on('ready', function() {
    let pizza = new Pizza(udpPort);
    udpPort.on("bundle", function (oscBundle, timeTag, info) {
        pizza.handleMessage(oscBundle);
    });
});

udpPort.open();
