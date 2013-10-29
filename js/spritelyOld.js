(function(window){
/*	Awesome todo
	-prototypal
	-seperate files for classes, init, events, hinting, etc
	-develop spritely in spritely
		-ability to save projects
		-seperate tabs that save to indexeddb (use framework w/ fallback)
		-in seperate window
	-save spritelys
		-ability to update core spritely online, so you can always dev on it.
	-new design

	-codehint
	-tag matching
	
	-better startup
	-live update for html and css
	-viewport stays same size when resizing horiz
	-when script is loaded, store reference and load it from the parent, replace iframe vers by accessing parent (get each load time under 20ms)
	-cdn js drop down or search
	-settings: code wrap
	
	-store last 10 iframe load times in array, when load time starts to get above 100ms, increase setTimeout
	Experimental feature later:
	-editor to dom mapping. Insane speed but not as reliable.
*/



window.editor = ace.edit("editor");
editor.setTheme('ace/theme/monokai');
editor.session.setMode('ace/mode/html');
editor.session.setUseSoftTabs(false);
//editor.session.setUseWrapMode(true);
editor.setShowPrintMargin(false);
editor.setHighlightActiveLine(false);
editor.setBehavioursEnabled(false);

//editor.moveCursorTo(obj.curs.row, obj.curs.column);
if(window.self === window.top){
editor.focus();
}


editor.commands.addCommand({
	name: "save",
	bindKey: {win: "Ctrl-S", mac: "Command-Option-Ss"},
	exec: function(editor){
		obj.code = editor.getValue();
		if(window.self === window.top){
			if(obj.inceptionOn) obj.inception();
			else obj.runIframe(obj.code);
    	}
		gk.saveLocalObj('curs', editor.getCursorPosition());

	}
});






//=== Viewport ===//
var Viewport = (function(){
	function Viewport(vp){
		//Public vars
		this.viewport = viewport;
		this.iframe = viewport.querySelector('iframe');
	}

	//Private methods
	function runIframe(){
		obj.loadTimer = (new Date).getTime();
		var doc =  this.iframe.contentDocument ||  this.iframe.contentWindow.document;
		doc.open();
		doc.write(str);
		doc.close();
	}

	//Public methods
	Viewport.prototype.init = function(){
		//Initial check to see if viewport settings, else insert default

	}

	//This method kicks off project compile, then writes to render
	Viewport.prototype.render = function(){
		var str = Project.compile();
		runIframe.call(this, str);
	}

	return function(){ 
		return new Viewport(vp)
	}
})();

//=== Editor ===//
// Spawns a new editor
// An editor instance contains all the tabs currently in that editor
// Handles all editor shortcuts
function Editor(size){
	this.size = size;
	this.tabs = tabs;
}

Editor.prototype._init = function(){

};

Editor.prototype._addNewTab = function(name, data){

};

//=== tab ===//
// Constructor to spawn new tab
function Tab(){

}








//////////////////
////// Init //////
//////////////////


window.obj = {
	code: '',
	editor: $id('editor'),
	iframe: $id('iFrame'),
	resizer: $c('resizer')[0],
	viewport: $id('viewport'),
	viewportSize: $c('viewportSize')[0],
	timer:{},
	inceptionOn: false,
	loadTimer:(new Date),
	scripts:{}
}
obj.runIframe = function(str){
	obj.loadTimer = (new Date).getTime();
	var doc =  obj.iframe.contentDocument ||  obj.iframe.contentWindow.document;
	
	//str = obj.saveScript(str);

	doc.open();
	doc.write(str);
	doc.close();
};

obj.iframe.onload = function(){
	var a=(new Date).getTime();
	var b=a-obj.loadTimer;
	clog("iframe load time: " +  b + 'ms');
}

obj.saveScript = function(str){
	//-- Non dynamic example of how this will work

	//Get script src from string w/ regex

	//Check if script already exists in obj
	//Else add to window, detect globals, give child gateway access to all globals

	if(!obj.scripts["//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"]){
		var scr = document.createElement('script');
		scr.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
		document.body.appendChild(scr);
		obj.scripts["//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"] = 1;
	}

	//Return all gateways in place of the original script tag
	return str.replace(/<script src\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e){
		var src = e.match(/src=[",'](.*?)[",']/)[0];
			src = e.match(/[",'](.*?)[",']/)[0].replace(/"/g,'').replace(/'/g,'').trim();

		//add it to dom
		//we then check globals
		//get new globals
		//then add the src to the obj along with its globals
		//build gateway string
		return '<script>$=window.parent.$</script>';
	});
};

obj.localStorageUpdate = function(){

};

var lsTimer;
window.onstorage = function(){
	clearTimeout(lsTimer);
	lsTimer = setTimeout(function(){
	}, 100);
};


//// Temporary Init event ////
if(window.self === window.top){
	obj.code = window.localStorage['code'];
	obj.curs = gk.getLocalObj('curs');

	if(obj.code){
		editor.setValue(obj.code, -1);
		obj.runIframe(editor.getValue());
	}
	if(obj.curs){
		editor.moveCursorTo(obj.curs.row, obj.curs.column);
		editor.focus();
	}
}
else{
	window.parent.obj.inceptionOn = true;
	obj.runIframe(editor.getValue());
}

//By removing and re-attaching the iframe we can dev spritely inside spritely
obj.inception = function(){
	var i = document.createElement('iframe');
	i.id= "iFrame";
	gk.removeNode(obj.iframe);
	obj.viewport.appendChild(i);
	obj.iframe = i;
	obj.runIframe(editor.getValue());
}


////////Editor Events
var runTimer, codeTimer;
if(false){
editor.session.on('change', function() {
	obj.code = editor.getValue();
	clearTimeout(runTimer);
	clearTimeout(codeTimer);

	runTimer = setTimeout(function(){
		
		if(window.self === window.top){
			if(obj.inceptionOn) obj.inception();
			else obj.runIframe(obj.code);
			codeTimer = setTimeout(function(){
	    		window.localStorage['code'] =  obj.code;
	    		gk.saveLocalObj('curs', editor.getCursorPosition());
	    	}, 500)
    	}
	},100);
});
}

//====== Resize bars ======//
var rInterval, pc, resizing, posX;
window.onmousemove = function(e){
	if(resizing){posX = e.clientX;}
};

window.onmousedown = function(e){
	if(e.target.className === 'resizer'){
		gk.removeClass(obj.viewportSize,'opac0');
		resizing = true;
		document.body.className = 'resizing';
		gk.addClass(obj.viewport,'resizing');
		obj.resizer.style.width = "230px";


		rInterval = setInterval(function(){
			var pc = (window.innerWidth - posX +1) / window.innerWidth * 100;
			obj.viewport.style.width = pc + '%';
			obj.editor.style.width = (100 -pc + '%');
			obj.resizer.style.left = posX / window.innerWidth * 100 + '%';
			//clog(posX);
			gk.text(obj.viewportSize, obj.viewport.offsetWidth + 'px x ' + obj.viewport.offsetHeight + 'px');
		}, 5);
	} 
};

window.onmouseup = function(){
	resizing = false;
	editor.resize();
	document.body.className = '';
	gk.removeClass(obj.viewport,'resizing');
	obj.resizer.style.width = "16px";
	gk.addClass(obj.viewportSize, 'opac0');
	clearInterval(rInterval);
	//obj.viewport.style.width = obj.viewport.offsetWidth + 'px';
};


window.onresize = function(){
	gk.removeClass(obj.viewportSize,'opac0');
	gk.text(obj.viewportSize, obj.viewport.offsetWidth + 'px x ' + obj.viewport.offsetHeight + 'px');

	clearTimeout(obj.timer)
	obj.timer = setTimeout(function(){
		gk.addClass(obj.viewportSize, 'opac0');
	},600);
};
//=========== end of resize ==============









})(window, undefined);