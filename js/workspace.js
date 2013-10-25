function Workspace(ed, vp){
	this.currentEditor = ed;
	this.currentViewPort = vp;
}
Workspace.prototype.reInit = function(ed){
	this.ed = ed;
}