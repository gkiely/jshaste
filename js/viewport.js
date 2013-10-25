//=== Viewport ===//
var Viewport = (function(){
	function Viewport(vp, str){
		this.vp = vp;
		this.iframe = vp.querySelector('iframe');
		if(str) this.init(str);
	}
	//Private methods
	Viewport.prototype._runIframe = function(str){
		//obj.loadTimer = (new Date).getTime();
		var doc =  this.iframe.contentDocument ||  this.iframe.contentWindow.document;
		doc.open();
		doc.write(str);
		doc.close();
	}


	//Public methods
	Viewport.prototype.init = function(str){
		//Initial check to see if viewport settings, else insert default
		var str = str || WS.currentEditor.getValue();
		this.render(str);
	}

	//This method kicks off project compile, then writes to render
	Viewport.prototype.render = function(str){
		//var str = Project.compile();
		this._runIframe(str);
	}


	return function(vp, str){ 
		return new Viewport(vp, str);
	}
})();