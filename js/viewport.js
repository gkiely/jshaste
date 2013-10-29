//=== Viewport ===//
var Viewport = (function(){
	var inception=false;
	return {
		_vp: $id('viewport'),
		_errorContainer: $id('errorContainer'),
		_iframe:{},
		_inception: false,
		init: function(){
			this._iframe = this._vp.querySelector('iframe');
			this.render(Workspace.getActiveEditor().inst.getValue());
			Workspace.setCurrentViewPort(this);
			if(window.self !== window.top){
				window.parent.Viewport._inception = true;
			}
		}
	}
})();

Viewport._runIframe = function(str){
	var doc =  this._iframe.contentDocument ||  this._iframe.contentWindow.document;
	doc.open();
	str = Project.handleJSErrors(str);
	doc.write('<script src="js/spritely.iframe.js"></script>' + str);
	doc.close();
};

Viewport._replaceIframe = function(){
	var i = document.createElement('iframe');
	i.id= "iFrame";
	gk.removeNode(this._iframe);
	this._vp.appendChild(i);
	this._iframe = i;
}

Viewport.render = function(str){
	if(this._inception){
		this._replaceIframe();
	}
	this._runIframe(str);
};