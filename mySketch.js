/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
*/
let myPizza = new pizza(1920/2.5, 1080/3, 100, 1.5, 16);

function preload(){
	//player = new Tone.synth.toMaster();
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	// color light grey
	background(210);
}

function draw() {
	nodeGrid(50, 100, 400, 200, 16);
	myPizza.drawPizza();
	
	// show the pizza nodes objects
	/*
	for (let i=0;i<myPizza.pizzaSlicesArr.length;i++){
		console.log(myPizza.pizzaSlicesArr[i].pizzaNodesArr);
	}
	*/

	// check keyboard
	console.log('layer: '+currentLayer+' slice: '+currentSlice);
}

let startPlaying = false;
let currentLayer = 1;
let currentSlice = 1;
let changeNode = false;

function keyPressed(){
	// press space, play beats
	if (keyCode === 32){
		startPlaying = true;
	}
	// press enter control the node
	else if (keyCode === ENTER){
		changeNode = true;
	}
	
	// press 1
	if (keyCode === 49){
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
	
}

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
	/*
	// outer circle
	fill(250, 140, 141);           // color peachy pink
	ellipse(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*3, this.innerSize + this.innerSize*this.sizeRatio*3);
	// middle circle
	fill(62, 173, 93);             // color green
	ellipse(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*2, this.innerSize + this.innerSize*this.sizeRatio*2);
	// inter circle
	fill(173, 80, 80);             // color dark peachy pink
	ellipse(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio, this.innerSize + this.innerSize*this.sizeRatio);
	// inner instrument circle
	*/
	/*
	?????? should we use the arc function instead of ellipse ??????
	?????? arc(x, y, w, h, start, stop, [mode])              ??????
	*/
	// outer circle
	this.pizzaSlicesArr.push(new pizzaSlices(this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*3, 250, 140, 141));// color peachy pink
	// middle circle
	this.pizzaSlicesArr.push(new pizzaSlices(this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*2, 62, 173, 93));// color green
	// inter circle
	this.pizzaSlicesArr.push(new pizzaSlices(this.numSlices, this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio, 173, 80, 80));  // color dark peachy pink
	
	
	this.drawPizza = function(){
		push();
		// draw the slices of pizza
		for (let i=0; i<this.pizzaSlicesArr.length; i++){
			this.pizzaSlicesArr[i].drawPizzaSlices();
		}
		// inner circle of pizza
		fill(140, 250, 170);                                                                  								// color light green
		ellipse(this.pizzaX, this.pizzaY, this.innerSize, this.innerSize);		
		pop();
	}

}

function pizzaSlices(numSlices, sliceX, sliceY, sliceSize, r, g, b){
	this.numSlices = numSlices;
	this.sliceX = sliceX;
	this.sliceY = sliceY;
	this.sliceSize = sliceSize;
	this.r = r;
	this.g = g;
	this.b = b;
	// to draw
	this.startAngle = 0;
	this.increaseAngle = 2*Math.PI/this.numSlices; // 22.5 if 16 slices
	// have an array to store all the pizza nodes to access later
	this.pizzaNodesArr = []; 
	

	// creating pizza nodes here
	for (var i=0; i<this.numSlices+1; i++){
		let nodeAngle = this.startAngle+this.increaseAngle/2;
		this.startAngle += this.increaseAngle;
		// create the nodes on each slice!
		let nodeX = this.sliceX + (((this.sliceSize-100)/2)*Math.cos(nodeAngle));
		let nodeY = this.sliceY + (((this.sliceSize-100)/2)*Math.sin(nodeAngle));
		let currentPizzaNode = new pizzaNode(nodeX, nodeY);
		this.pizzaNodesArr.push(currentPizzaNode);
	}	

	this.drawPizzaSlices = function(){
		// reset angles
		this.startAngle = 0;
		this.increaseAngle = 2*Math.PI/this.numSlices; // 2PI/16 slices
		
		push();
		// change angle mode to RADIANS!
		angleMode(RADIANS);
		// stroke color light grey
		stroke(200);      																																	
		fill(r, g, b); 
		
		// ????????????????????? angles are kind of wrong??????????????????????
		// why 17 instead of 16
		// draw 16 slices
		for (var i=0; i<this.numSlices+1; i++){
			arc(this.sliceX, this.sliceY, this.sliceSize, this.sliceSize, this.startAngle, this.increaseAngle, PIE);
		
			let nodeAngle = this.startAngle+this.increaseAngle/2;
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

function pizzaNode(nodeX, nodeY){
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


