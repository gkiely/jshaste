//=== Viewport ===//
var Viewport = (function(){
	var inception=false;
	return {
		cont: $id('viewport'),
		_errorContainer: $id('errorContainer'),
		_iframe:{},
		_inception: false,
		_liveRender: false,
		_isVisible: true,
		liveRender: function(flag){
			if(typeof flag !== "undefined") this._liveRender = flag;
			return this._liveRender;
		},
		init: function(){
			this._iframe = this.cont.querySelector('iframe');
			this.render(Workspace.getCurrentEditor().inst.getValue());
			Workspace.setCurrentViewPort(this);
			if(window.self !== window.top){
				window.parent.Viewport._inception = true;
			}
		},
		sizeLabel: $c('sizeLabel')
	}
})();

//Public
Viewport.render = function(str){
	if(this._isVisible){
		if(this._inception){
			this._replaceIframe();
		}
		this._runIframe(str);
	}
};
Viewport.getDoc = function(){
	return this._iframe.contentDocument ||  this._iframe.contentWindow.document;
}
Viewport.getWindow = function(){
	return this._iframe.contentWindow;
}
Viewport.visible = function(flag){
	if(typeof flag === "undefined") return this._isVisible;
	else if(flag === 'split'){
		gk.removeClass(document.body, 'fsViewport');
		gk.removeClass(document.body, 'fsEditor');
		gk.saveLocalObj('opts', 'display', 'sp');
		this._isVisible = true;
		editor.resize();

	}
	//if truthy, make visible
	else if(flag){
		gk.removeClass(document.body, 'fsEditor');
		//gk.saveLocalObj('opts', 'display', 'vp');
		gk.addClass(document.body, 'fsViewport');
		this._isVisible = true;
	}
	//if falsy, hide
	else{
		gk.removeClass(document.body, 'fsViewport');
		gk.addClass(document.body, 'fsEditor');
		Workspace.getCurrentEditor().inst.resize();
		gk.saveLocalObj('opts', 'display', 'ed');
		this._isVisible = false;
	}
};


//Internal
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
	gk.remove(this._iframe);
	this.cont.appendChild(i);
	this._iframe = i;
}

