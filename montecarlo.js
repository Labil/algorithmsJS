////////////////////////// Node //////////////////////////////

var Node = function(root, isOpen){
	this.root = root;
	this.neighbours = [];
	this.isOpen = isOpen || false;
	//size of tree, 1 at beginning as every node is in separate tree
	this.size = 1;
};

Node.prototype.setNeighbours = function(neighbours){
	for(var i = 0; i < neighbours.length; i++){
		this.neighbours.push(neighbours[i]);
	}
};

////////////////////////// Percolation ///////////////////////////////

var Percolation = function(size){
	this.size = size * size;
	this.gridwidth = size;
	this.nodes = [];
	this.setupGrid();

	// this.topRootNode = new Node(100, true);
	// this.bottomRootNode = new Node(200, true);
};

Percolation.prototype.openNode = function(id){
	console.log("Opening");
	var n = this.nodes[id];
	this.nodes[id].isOpen = true;
	for(var i = 0; i < n.neighbours.length; i++){
		if(n.neighbours[i].isOpen){
			console.log("connecting nodes: " + this.nodes[id].root + "/" + id + " and " + n.neighbours[i].root);
			this.union(this.nodes[id].root, n.neighbours[i].root);
		}
	}
};

Percolation.prototype.find = function(p, q){
	var pid = this.nodes[p].root;
	var qid = this.nodes[q].root;

	var result = (this.getRoot(pid) == this.getRoot(qid));
	console.log("The reslt of find was: " + result);

	return result;
};

Percolation.prototype.getRoot = function(id) {
	if(this.nodes[id].root == id) {
		console.log("root id: " + id)
		return id;
	}

	//path compression
	var parent = this.nodes[id].root;
	var parentRoot = this.nodes[parent].root;
	this.nodes[id].root = parentRoot;
	//recurse up the path structure
	this.getRoot(parent);
	//alternative:
	//while(this.nodes[p].parentID != p) p = this.nodes[p].parentID;
	//return p;
};

Percolation.prototype.union = function(p, q){
	if(this.find(p, q)) return;

	var pRoot = this.getRoot(p);
	var qRoot = this.getRoot(q);

	if(this.nodes[pRoot].size < this.nodes[qRoot].size){
		console.log(qRoot + " is in bigger tree.");
		this.nodes[qRoot].size += this.nodes[pRoot].size;
		this.nodes[pRoot].root = qRoot;
	}
	else{
		console.log(pRoot + " is in bigger tree.");
		this.nodes[pRoot].size += this.nodes[qRoot].size;
		this.nodes[qRoot].root = pRoot;
	}
};

Percolation.prototype.checkPercolation = function(){

};

Percolation.prototype.findNeighbours = function(pos){
	var neighbours = [];
	var w = this.gridwidth;
	//top row
	if(pos < w){
		if(pos % w == 0){
			neighbours.push(this.nodes[pos + 1]);
			neighbours.push(this.nodes[pos + w]);
		}
		else if(pos % w == 1){
			neighbours.push(this.nodes[pos + 1]);
			neighbours.push(this.nodes[pos - 1]);
			neighbours.push(this.nodes[pos + w]);
		}
		else if(pos % w == 2){
			neighbours.push(this.nodes[pos - 1]);
			neighbours.push(this.nodes[pos + w]);
		}
	}
	//Bottom row
	else if(pos >= this.size - w){
		if(pos % w == 0){
			neighbours.push(this.nodes[pos + 1]);
			neighbours.push(this.nodes[pos - w]);
		}
		else if(pos % w == 1){
			neighbours.push(this.nodes[pos + 1]);
			neighbours.push(this.nodes[pos - 1]);
			neighbours.push(this.nodes[pos - w]);
		}
		else if(pos % w == 2){
			neighbours.push(this.nodes[pos - 1]);
			neighbours.push(this.nodes[pos - w]);
		}
	}
	//Left col
	else if(pos % w == 0){
		neighbours.push(this.nodes[pos - w]);
		neighbours.push(this.nodes[pos + w]);
		neighbours.push(this.nodes[pos + 1]);
	}
	//right col
	else if(pos % w == 2){
		neighbours.push(this.nodes[pos - w]);
		neighbours.push(this.nodes[pos + w]);
		neighbours.push(this.nodes[pos - 1]);	
	}
	else{
		neighbours.push(this.nodes[pos - w]);
		neighbours.push(this.nodes[pos + w]);
		neighbours.push(this.nodes[pos + 1]);
		neighbours.push(this.nodes[pos - 1]);
	}

	/*if(this.nodes[i][j - 1] != null) neighbours.push(this.nodes[i][j - 1]);	
	if(this.nodes[i][j + 1] != null) neighbours.push(this.nodes[i][j + 1]);
	if(this.nodes[i + 1] != null) neighbours.push(this.nodes[i + 1][j]);
	if(this.nodes[i - 1] != null) neighbours.push(this.nodes[i - 1][j]);*/	
	return neighbours;
};

Percolation.prototype.setupGrid = function(){

	for(var i = 0; i < this.size; i++){
		this.nodes.push(new Node(i));
	}
	//connecting neightbours
	for(var i = 0; i < this.size; i++){
		var neighbours = this.findNeighbours(i);
		this.nodes[i].setNeighbours(neighbours);
	}
	
};

var per = new Percolation(3);
//console.log(per.nodes);

