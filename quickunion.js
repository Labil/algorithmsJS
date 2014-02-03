var Quickunion = function(size){
	this.nodes = []
	for(var i = 0; i < size; i++){
		var node = {};
		node.num = i;
		node.id = i;
		this.nodes.push(node);
		this.nodes[i].rootID = i;
	}
};

Quickunion.prototype.find = function(p, q){

};

Quickunion.prototype.union = function(p, q){
	if(this.find(p, q)) return;

	var id = this.nodes[p].rootID;
};