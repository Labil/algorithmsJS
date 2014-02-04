// Quickunion makes the union operation very fast, but the find function can be
// expensive if the tree structure gets deep (it has to recurse many times to find the root)
// See quickunionbetter.js for some solutions to this issue
.var Quickunion = function(size){
	this.nodes = []
	for(var i = 0; i < size; i++){
		var node = {};
		node.num = i;
		node.id = i;
		this.nodes.push(node);
		this.nodes[i].parentID = i;
	}
};

Quickunion.prototype.find = function(p, q){
	var pid = this.nodes[p].parentID;
	var qid = this.nodes[q].parentID;

	return this.getroot(pid) == this.getroot(qid);
};

Quickunion.prototype.getroot = function(p) {
	if(this.nodes[p].parentID == p) {
		console.log("root id: " + p)
		return p;
	}

	this.getroot(this.nodes[p].parentID);
};

Quickunion.prototype.union = function(p, q){
	//might not be worth checking if there already is a link, as find is more expensive than union (?)
	//if(this.find(p, q)) return;
	var pRoot = this.getroot(p);
	var qRoot = this.getroot(q);
	
	this.nodes[pRoot].parentID = qRoot;
};

var nodes = new Quickunion(10);