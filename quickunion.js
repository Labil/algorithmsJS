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

	var pRoot = this.getroot(pid);
	var qRoot = this.getroot(qid);

	if(pRoot == qRoot)
		return true;
	else
		return false;
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

	//Attaches directly to q. Will be changed in refactoring of this algorithm to avoid deep tree structures
	this.nodes[p].parentID = q;
};

var nodes = new Quickunion(10);