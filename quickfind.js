// Quickfind makes the find operation inexpensive, but the union
// is too expensive. Takes N^2 array accesses to process the 
// sequence of N union commands on N objects.
// Quadratic time is much too slow for larger problems because
// they don't scale with technology.
var Quickfind = function(size){
	this.nodes = []
	for(var i = 0; i < size; i++){
		var node = {};
		node.num = i;
		node.id = i;
		this.nodes.push(node);
		this.nodes[i].id = i;
	}
};

Quickfind.prototype.find = function(p, q){
	console.log("id: " + this.nodes[p].id);

	return this.nodes[p].id == this.nodes[q].id;
};

Quickfind.prototype.union = function(p, q){
	if(this.find(p, q)){
		console.log("These nodes are already connected.");
		return;
	}
	//id has to be outside loop duh:p
	var id = this.nodes[p].id;
	for(var i = 0; i < this.nodes.length; i++){
		if(this.nodes[i].id == id){
			this.nodes[i].id = this.nodes[q].id;
			console.log("Changed a node");
		}
	}

};

var nodes = new Quickfind(10);