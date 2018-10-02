/*
Things to consider with colors:
http://www.colourblindawareness.org/colour-blindness/types-of-colour-blindness/
*/
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(210);              																										// color light grey
}

function draw() {
	pizza(width/2, height/2, 100, 1.5);
	nodeGrid(50, 100, 400, 200, 16);
}

function pizza(pizzaX, pizzaY, innerSize, sizeRatio){
	this.innerSize = innerSize; // radius in pixels of the inner circle
	this.sizeRatio = sizeRatio; // ratio for increasing the size of circles
	// position of center of pizza
	this.pizzaX = pizzaX;
	this.pizzaY = pizzaY;
	
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
	
	// draw the slices of pizza
	// outer circle
	pizzaSlices(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*3, 250, 140, 141) // color peachy pink
	// middle circle
	pizzaSlices(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio*2, 62, 173, 93); // color green
	// inter circle
	pizzaSlices(this.pizzaX, this.pizzaY, this.innerSize + this.innerSize*this.sizeRatio, 173, 80, 80);   // color dark peachy pink
	// inner circle of pizza
	fill(140, 250, 170);                                                                  								// color light green
	ellipse(this.pizzaX, this.pizzaY, this.innerSize, this.innerSize);
}

function pizzaSlices(sliceX, sliceY, sliceSize, r, g, b){
	this.sliceX = sliceX;
	this.sliceY = sliceY;
	this.sliceSize = sliceSize;
	this.r = r;
	this.g = g;
	this.b = b;
	
	// change angle mode to degrees!
	angleMode(DEGREES);
	// draw 16 slices
						stroke(200);      																																	// stroke color light grey
	fill(r, g, b); 
	this.startAngle = 0;
	this.increaseAngle = 360/16; // 22.5
	// ????????????????????? angles are kind of wrong??????????????????????
	// why i <17 instead of 16?
	for (var i=0; i<17; i++){
		arc(this.sliceX, this.sliceY, this.sliceSize, this.sliceSize, this.startAngle, this.increaseAngle, PIE);
		let nodeAngle = this.startAngle+this.increaseAngle/2;
		this.startAngle += this.increaseAngle;
		// draw the nodes on each slice!
		// wish i could access pizze.innerSize here
		let nodeX = this.sliceX + (((this.sliceSize-100)/2)*cos(nodeAngle));
		let nodeY = this.sliceY + (((this.sliceSize-100)/2)*sin(nodeAngle));
		pizzaNode(nodeX, nodeY);
	}
}

// this function would probably draw shapes
function pizzaNodes(){
}

// !!!!!!!!!!!this code needs to be improved as to create new object instances & store in a list!!!!!!!!!!!!!
function pizzaNode(nodeX, nodeY){
	this.nodeX = nodeX;
	this.nodeY = nodeY;
	this.nodeSize = 15;
	this.fillColor = 255;
	this.clicked = false;
	//console.log(this.clicked);
	
	// draw the node!
	push();
	noStroke();
	fill(fillColor);
	ellipse(this.nodeX, this.nodeY, this.nodeSize, this.nodeSize);
	pop();
	
	// check if node is clicked
	if (mouseIsPressed && (this.nodeX-this.nodeSize < mouseX && mouseX < this.nodeX+this.nodeSize) && (this.nodeY-this.nodeSize < mouseY && mouseY < this.nodeY+this.nodeSize)){
		this.clicked = true;
	}
	// if node is clicked, change it to a different color
	if (this.clicked === true){
		this.fillColor = 0;
	}
}

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