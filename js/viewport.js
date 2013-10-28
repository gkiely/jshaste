//=== Viewport ===//
var Viewport = (function(){
	return {
		_vp: $id('viewport'),
		_errorContainer: $id('errorContainer'),
		iframe:{},
		init: function(){
			this.iframe = this._vp.querySelector('iframe');
			this.render();
			Workspace.setCurrentViewPort(this);
		}
	}
})();

Viewport._runIframe = function(str){
	var doc =  this.iframe.contentDocument ||  this.iframe.contentWindow.document;
	doc.open();
	str = Project.handleJSErrors(str);
	doc.write('<script src="js/spritely.iframe.js"></script>' + str);
	doc.close();
};

Viewport.render = function(){
	var str = Workspace.getActiveEditor().inst.getValue();
	this._runIframe(str);
};