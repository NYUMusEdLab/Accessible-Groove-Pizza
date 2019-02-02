function Pizza(pizzaX, pizzaY, innerSize, sizeRatio, numSlices, colorPalette) {
    this.innerSize = innerSize; // radius in pixels of the inner circle
    this.sizeRatio = sizeRatio; // ratio for increasing the size of circles
    // position of center of pizza
    this.pizzaX = pizzaX;
    this.pizzaY = pizzaY;
    this.numSlices = numSlices;
    this.colorPalette = colorPalette;

    // have an array to store all the pizza slices to access later
    this.pizzaSlicesArr = [];

    // draw the pizza!
    // outer circle
    this.pizzaSlicesArr.push(new PizzaSlices(4, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio * 3, this.colorPalette.outerRing));
    // middle circle
    this.pizzaSlicesArr.push(new PizzaSlices(3, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio * 2, this.colorPalette.middleRing));
    // inner circle
    this.pizzaSlicesArr.push(new PizzaSlices(2, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize * this.sizeRatio, this.colorPalette.innerRing));

    // call this function when change the slice number or something
    this.updatePizza = function(){
        for (let i=0; i< this.pizzaSlicesArr.length; i++){
            this.pizzaSlicesArr[i].numSlices = this.numSlices;
            this.pizzaSlicesArr[i].updatePizzaSlices();
            //this.pizzaSlicesArr[i].increaseAngle = 2 * Math.PI / this.pizzaSlicesArr[i].numSlices;
        }
    }

    this.drawPizza = function() {
        push();
        // draw the slices of pizza
        this.pizzaSlicesArr.forEach(function(slice) {
            slice.drawPizzaSlices();
        });

        // inner circle of pizza
        fill(this.colorPalette.pizzaCenter.r, this.colorPalette.pizzaCenter.g,this.colorPalette.pizzaCenter.b);
        ellipse(this.pizzaX, this.pizzaY, this.innerSize, this.innerSize);

        push()
        // show type text
        fill(0);
        noStroke();
        text(currentInst.name, this.pizzaX-this.innerSize/3, this.pizzaY);
        pop();

        // outer numbers
        this.pizzaSlicesArr[2].drawNum = true;
        pop();
    }

    // Function that gets called whenever the pizza has been clicked on
    // Check if a node has been clicked on
    // If true - update the node and return its array indices
    this.clickPizza = function(clickX, clickY) {
        let layerVal = this.determineLayer(clickX, clickY);
        if (!layerVal) {return false;}
        if (layerVal == 1) {
            this.changeCenter();
            return false;
        }

        let layerIndex = 2 - (layerVal - 2);
        return (this.pizzaSlicesArr[layerIndex].clickSlice(clickX, clickY));
    }

    // Returns the layer that was clicked on
    // If the mouse was outside of the pizza - returns false
    this.determineLayer = function(clickX, clickY) {
        let clickDistance = dist(clickX, clickY, this.pizzaX, this.pizzaY);
        let distanceRatio = (clickDistance - (this.innerSize / 2)) / (this.sizeRatio * (this.innerSize / 2));
        if (distanceRatio > 3) {return false;} // Assuming pizza has 3 layers
        else {return floor(distanceRatio + 2);}
    }

    this.changeCenter = function() {
        console.log('Center was clicked');
        return false;
    }

    this.updateColor = function(colorPalette) {
        this.colorPalette = colorPalette;
        this.pizzaSlicesArr.forEach(function(slice) {
            slice.updateColor(colorPalette);
        });
    }
}

function PizzaSlices(layer, numSlices, sliceX, sliceY, sliceSize, color) {
    this.layer = layer;
    this.numSlices = numSlices;

    this.sliceX = sliceX;
    this.sliceY = sliceY;

    this.sliceSize = sliceSize;

    this.color = color;
    this.drawNum = false; // set to true on outer layer
    // to draw
    this.increaseAngle = 2 * Math.PI / this.numSlices;
    // this.startAngle = (270 * Math.PI/180)  - (this.increaseAngle / 2);
    this.startAngle = 0; // 22.5 if 16 slices
    // have an array to store all the pizza nodes to access later
    this.pizzaNodesArr = [];

    // this create the initial slices
    for (var i = 0; i < this.numSlices; i++) {
        let nodeAngle = this.startAngle + this.increaseAngle / 2;
        this.startAngle += this.increaseAngle;
        // create the nodes on each slice!
        let nodeX = this.sliceX + (((this.sliceSize - 100) / 2) * Math.cos(nodeAngle));
        let nodeY = this.sliceY + (((this.sliceSize - 100) / 2) * Math.sin(nodeAngle));
        let currentPizzaNode = new PizzaNode(i + 1, this.layer, nodeX, nodeY, colorPalette);
        this.pizzaNodesArr.push(currentPizzaNode);
    }

    // call update when slices num is changed or something
    this.updatePizzaSlices = function(){
        this.increaseAngle = 2 * Math.PI / this.numSlices;

        // updating pizza nodes here
        for (var i = 0; i < this.numSlices; i++) {
            let nodeAngle = this.startAngle + this.increaseAngle / 2;
            this.startAngle += this.increaseAngle;

            // update the nodes position!
            let nodeX = this.sliceX + (((this.sliceSize - 100) / 2) * Math.cos(nodeAngle));
            let nodeY = this.sliceY + (((this.sliceSize - 100) / 2) * Math.sin(nodeAngle));
            this.pizzaNodesArr[i].nodeX = nodeX;
            this.pizzaNodesArr[i].nodeY = nodeY;
        }
    }

    this.drawPizzaSlices = function() {
        // reset angles
        // this.increaseAngle = 2 * Math.PI / this.numSlices;
        //this.startAngle = (270 * Math.PI/180)  - (this.increaseAngle / 2);
        this.startAngle = 0;

        push();
        // change angle mode to RADIANS!
        angleMode(RADIANS);

        // stroke color light grey
        stroke(200);
        fill(this.color.r, this.color.g, this.color.b);

        // draw num slices
        for (var i = 0; i < this.numSlices; i++) {
            arc(this.sliceX, this.sliceY, this.sliceSize, this.sliceSize, this.startAngle, this.startAngle + this.increaseAngle, PIE);

            let nodeAngle = this.startAngle + this.increaseAngle / 2;

            // if it's layer 4 and we draw the numbers around
            if (this.drawNum === true) {
                push();
                noStroke();
                fill(0);
                let textX = this.sliceX + ((this.sliceSize + 50) * Math.cos(nodeAngle));
                let textY = this.sliceY + ((this.sliceSize + 50) * Math.sin(nodeAngle));
                text(this.pizzaNodesArr[i].slice, textX, textY);
                pop();
            }
            this.startAngle += this.increaseAngle;
            // draw the nodes on each slice!
            this.pizzaNodesArr[i].drawPizzaNode();
        }
        pop();
    }

    // If a node is clicked, it will call its chageState function and return
    // the results
    // Otherwise, it will return false
    this.clickSlice = function(clickX, clickY) {
        for (let i = 0; i < this.pizzaNodesArr.length; i++) {
            let currentNode = this.pizzaNodesArr[i];
            if (dist(clickX, clickY, currentNode.nodeX, currentNode.nodeY) < currentNode.nodeSize) {
                return currentNode.changeState();
            }
        }
        return false;
    }

    this.updateColor = function(colorPalette) {
        if (this.layer == 4) { this.color = colorPalette.outerRing; }
        else if (this.layer == 3) { this.color = colorPalette.middleRing; }
        else if (this.layer == 2) { this.color = colorPalette.innerRing; }

        this.pizzaNodesArr.forEach(function(node) {
            node.updateColor(colorPalette);
        });

    }
}

// this function would probably draw shapes
function PizzaNodes() {}

function PizzaNode(slice, layer, nodeX, nodeY, colorPalette) {
    this.slice = slice;
    this.layer = layer;

    this.nodeX = nodeX;
    this.nodeY = nodeY;

    this.nodeSize = 15;
    this.fillColor = {
      true: colorPalette.nodeOn,
      false: colorPalette.nodeOff
    };
    this.isActive = false;

    this.drawPizzaNode = function() {
        // draw the node!
        push();
        noStroke();
        fill(this.fillColor[this.isActive].r, this.fillColor[this.isActive].g, this.fillColor[this.isActive].b);
        ellipse(this.nodeX, this.nodeY, this.nodeSize, this.nodeSize);

        pop();
    }

    // Swaps the isActive variable of the node
    // Returns the node's layer, slice, and new state of isActive - this is
    // used for updating the beats array
    this.changeState = function() {
      this.isActive = !this.isActive;
      return ([this.layer, this.slice, this.isActive]);
    }

    this.updateColor = function(colorPalette) {
        this.fillColor = {
            true: colorPalette.nodeOn,
            false: colorPalette.nodeOff
        }
    }
}
