// weighted quick union keeps the tree structure flatter, by
// ensuring that the smalles node-cluster gets attached to the bigger
// find takes time proportional to depth of p and q
// union takes constant time, given roots

//compressing paths - when going up path to find root, set the items to point to root
// keeps the tree almost completely flat

//weighted quick w/ path compression is quick enough for large problems. I practice almost linear speed.
//Faster computer wouldn't have helped much, it's the design of algorithm that makes it possible.
var Quickunion = function(size){
	this.nodes = []
	for(var i = 0; i < size; i++){
		var node = {};
		node.num = i;
		node.id = i;
		node.size = 1; //single nodes at init
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
	//alternative:
	//while(this.nodes[p].parentID != p) p = this.nodes[p].parentID;
	//return p;
	var parent = this.nodes[this.nodes[p].parentID].parentID;
	this.getroot(this.nodes[p].parentID);
	//path compression
	this.nodes[p].parentID = parent;

};

Quickunion.prototype.union = function(p, q){
	if(this.find(p, q)) return;

	var pRoot = this.getroot(p);
	var qRoot = this.getroot(q);

	if(this.nodes[pRoot].size < this.nodes[qRoot].size){
		console.log(qRoot + " is in bigger tree.");
		this.nodes[qRoot].size += this.nodes[pRoot].size;
		this.nodes[pRoot].parentID = qRoot;
	}
	else{
		console.log(pRoot + " is in bigger tree.");
		this.nodes[pRoot].size += this.nodes[qRoot].size;
		this.nodes[qRoot].parentID = qRoot;
	}
};

var nodes = new Quickunion(10);

/* Many uses for union-find algorithm:
 * 
 * - Percolation 
 * - Games (Go, Hex)
 * - Dynamic connectivity
 * - Least common ancestor
 * - Equivalence of finite state automata (uh..?)
 * - Hoshen-Kopelman algorithm in physics
 * - Hinley-Milner polymorphic type inference
 * - Krushal's minimum spanning tree algorithm
 * - Compiling equivalence statements in Fortran
 * - Morphological attribute opening and closings (?)
 */