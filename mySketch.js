/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
*/
let myPizza = new pizza(1920/2.5, 1080/3, 100, 1.5, 16);

function preload(){
	//let synth = new Tone.Synth().toMaster();
}
function setup() {
	createCanvas(windowWidth, windowHeight);

	// show the pizza nodes objects
	console.log(myPizza.pizzaSlicesArr);

}

function draw() {
	// color light grey
	background(210);
	nodeGrid(50, 100, 400, 200, 16);
	myPizza.drawPizza();
	
	push();
	noStroke();
	fill(0);
	text('Current Layer: '+currentLayer+' Current Slice: '+currentSlice, width-width/5, height/5);
	pop();
}

///////////////////////////////////////////////////// Keyboard Stuff //////////////////////////////////////////////////////////////////

let startPlaying = false;
let currentLayer = 1;
let currentSlice = 1;
let currentNode;

function keyPressed(){
	// press space, play beats
	if (keyCode === 32){
		startPlaying = true;
	}
	// press enter control the node
	else if (keyCode === ENTER){
		// if at center layer
		if (currentLayer === 1){
		}
		else{
			// make sure we are within limit to adjust nodes
			if (currentSlice<=myPizza.numSlices){
				// loop through pizzaSlicesArr
				for(let i=0; i<myPizza.pizzaSlicesArr.length;i++){
					// if layer number match
					if (currentLayer === myPizza.pizzaSlicesArr[i].layer){
						currentNode = myPizza.pizzaSlicesArr[i].pizzaNodesArr[currentSlice-1];
						console.log(currentNode);
						// turn it around
						currentNode.clicked = !currentNode.clicked;
					}
				}
			}
		}
	}
	
	// MOVE AROUND LAYER
	// press 1
	if (keyCode === 49){
		currentLayer = 1;
	}
	// press 2
	else if (keyCode === 50){
		currentLayer = 2;
	}
	// press 3
	else if (keyCode === 51){
		currentLayer = 3;
	}
	// press 4
	else if (keyCode === 52){
		currentLayer = 4;
	}
	
	// MOVE AROUND NODES
	// press Q
	if (keyCode === 81){
		currentSlice = 1
	}
	// press A
	else if (keyCode === 65){
		currentSlice = 2
	}
	// press W
	else if (keyCode === 87){
		currentSlice = 3
	}
	// press S
	else if (keyCode === 83){
		currentSlice = 4
	}
	// press E
	else if (keyCode === 69){
		currentSlice = 5
	}
	// press D
	else if (keyCode === 68){
		currentSlice = 6
	}
	// press R
	else if (keyCode === 82){
		currentSlice = 7
	}
	// press F
	else if (keyCode === 70){
		currentSlice = 8
	}
	// press T
	else if (keyCode === 84){
		currentSlice = 9
	}
	// press G
	else if (keyCode === 71){
		currentSlice = 10
	}
	// press Y
	else if (keyCode === 89){
		currentSlice = 11
	}
	// press H
	else if (keyCode === 72){
		currentSlice = 12
	}
	// press U
	else if (keyCode === 85){
		currentSlice = 13
	}
	// press J
	else if (keyCode === 74){
		currentSlice = 14
	}
	// press I
	else if (keyCode === 73){
		currentSlice = 15
	}
	// press K
	else if (keyCode === 75){
		currentSlice = 16
	}
}

///////////////////////////////////////////// End of Keyboard Stuff ////////////////////////////////////////////////////////////////////

/////////////////////////////////////////// Sound Stuff ////////////////////////////////////////////////////////////////////////////////

// give it an array of pizzaNode objects
function playLayerBeat(pizzaNodesArr){
	this.pizzaNodesArr = pizzaNodesArr;
	this.beatMap = [];
	// loop through the array and creates a beat map
	for (let i=0;i<this.pizzaNodesArr.length;i++){
		let currentNodeBeat = this.pizzaNodesArr[i].clicked;
		if (currentNodeBeat === true){
			this.beatMap.push('+');
		}
		else{
			this.beatMap.push('-');
		}
	}
}

////////////////////////////////////////////End of Sound Stuff ////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////// The Pizza Part /////////////////////////////////////////////////////////////////////////////

function pizza(pizzaX, pizzaY, innerSize, sizeRatio, numSlices){
	this.innerSize = innerSize; // radius in pixels of the inner circle
	this.sizeRatio = sizeRatio; // ratio for increasing the size of circles
	// position of center of pizza
	this.pizzaX = pizzaX;
	this.pizzaY = pizzaY;
	this.numSlices = numSlices;
	
	// have an array to store all the pizza slices to access later
	this.pizzaSlicesArr = [];
	
	// draw the pizza!
	// outer circle
	this.pizzaSlicesArr.push(new pizzaSlices(4, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*3, 250, 140, 141));// color peachy pink
	// middle circle
	this.pizzaSlicesArr.push(new pizzaSlices(3, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*2, 62, 173, 93));// color green
	// inter circle
	this.pizzaSlicesArr.push(new pizzaSlices(2, this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio, 173, 80, 80));  // color dark peachy pink
	
	
	this.drawPizza = function(){
		push();
		// draw the slices of pizza
		for (let i=0; i<this.pizzaSlicesArr.length; i++){
			this.pizzaSlicesArr[i].drawPizzaSlices();
		}
		// inner circle of pizza
		fill(140, 250, 170);                                                                  								// color light green
		ellipse(this.pizzaX, this.pizzaY, this.innerSize, this.innerSize);		
		// outer numbers
		this.pizzaSlicesArr[2].drawNum = true;
		pop();
	}

}

function pizzaSlices(layer, numSlices, sliceX, sliceY, sliceSize, r, g, b){
	this.layer = layer;
	this.numSlices = numSlices;
	this.sliceX = sliceX;
	this.sliceY = sliceY;
	this.sliceSize = sliceSize;
	this.r = r;
	this.g = g;
	this.b = b;
	this.drawNum = false; // set to true on outer layer
	// to draw
	this.startAngle = 0;
	this.increaseAngle = 2*Math.PI/this.numSlices; // 22.5 if 16 slices
	// have an array to store all the pizza nodes to access later
	this.pizzaNodesArr = []; 
	

	// creating pizza nodes here
	for (var i=0; i<this.numSlices; i++){
		let nodeAngle = this.startAngle+this.increaseAngle/2;
		this.startAngle += this.increaseAngle;
		// create the nodes on each slice!
		let nodeX = this.sliceX + (((this.sliceSize-100)/2)*Math.cos(nodeAngle));
		let nodeY = this.sliceY + (((this.sliceSize-100)/2)*Math.sin(nodeAngle));
		let currentPizzaNode = new pizzaNode(i+1, nodeX, nodeY);
		this.pizzaNodesArr.push(currentPizzaNode);
	}	

	this.drawPizzaSlices = function(){
		// reset angles
		this.startAngle = 0;
		this.increaseAngle = (2*Math.PI/this.numSlices); // 2PI/16 slices
		
		push();
		// change angle mode to RADIANS!
		angleMode(RADIANS);
		// stroke color light grey
		stroke(200);      																																	
		fill(r, g, b); 
		
		// draw 16 slices
		for (var i=0; i<this.numSlices; i++){
			arc(this.sliceX, this.sliceY, this.sliceSize, this.sliceSize, this.startAngle, this.startAngle+this.increaseAngle, PIE);
		
			let nodeAngle = this.startAngle+this.increaseAngle/2;
			
			// if it's layer 4 and we draw the numbers around
			if (this.drawNum === true){
				push();
				noStroke();      																																	
				fill(0); 
				let textX = this.sliceX + ((this.sliceSize+50)*Math.cos(nodeAngle));
				let textY = this.sliceY + ((this.sliceSize+50)*Math.sin(nodeAngle));
				text(this.pizzaNodesArr[i].slice, textX, textY);
				pop();
			}
			this.startAngle += this.increaseAngle;
			// draw the nodes on each slice!
			this.pizzaNodesArr[i].drawPizzaNode();
		}
		pop();
	}
}

// this function would probably draw shapes
function pizzaNodes(){
}

function pizzaNode(slice, nodeX, nodeY){
	this.slice = slice;
	this.nodeX = nodeX;
	this.nodeY = nodeY;
	this.nodeSize = 15;
	this.fillColor = 255;
	this.clicked = false;
	//console.log(this.clicked);
	
	this.drawPizzaNode = function(){
		// draw the node!
		push();
		noStroke();
		fill(this.fillColor);
		ellipse(this.nodeX, this.nodeY, this.nodeSize, this.nodeSize);
		
		//function mouseClicked()
		// check if node is clicked
		if (this.clicked === false 
				&& mouseIsPressed 
				&& dist(mouseX, mouseY, this.nodeX, this.nodeY)<=this.nodeSize){
			this.clicked = true;
		}
		else if (this.clicked === true 
				&& mouseIsPressed 
				&& dist(mouseX, mouseY, this.nodeX, this.nodeY)<=this.nodeSize){
			this.clicked = false;
		}
		// if node is clicked, change it to a different color
		if (this.clicked === true){
			this.fillColor = 0;
		}
		else{
			this.fillColor = 255;
		}
		
		pop();
	}
}

//////////////////////////////////////////////////////////////////// End of Pizza Part ///////////////////////////////////////////////////////////////////

///////////////////////////////////////////The Other Stuff///////////////////////////////////////////////////////////////////

function nodeGrid(gridX, gridY, gridW, gridH, numSlice){
	this.gridX = gridX;
	this.gridY = gridY;
	this.gridW = gridW;
	this.gridH = gridH;
	this.numSlice = numSlice;
	this.rectH = gridH/4; // there should be four rows: numbers & pizza nodes
	this.rectW = gridW/numSlice;
	rectMode(CORNER); // this is default
	// draw the bg rectangle
	noStroke();
	fill(255);
	rect(this.gridX, this.gridY, this.gridW, this.gridH);
	
	// draw the layer rectangles
	stroke(0);
	fill(100);
	let rectY = this.gridY;
	// loop through y
	for (let i=0; i<4; i++){
		let rectX = this.gridX;
		// loop through x
		for (let j=0; j<this.numSlice; j++){
			rect(rectX, rectY, this.rectW, this.rectH);
			rectX += this.rectW;
		}
		rectY += this.rectH;
	}
}

function gridNode(nodeX, nodeY){
	
}

///////////////////////////////////////The End of Other Stuff//////////////////////////////////////////////////////////////////


