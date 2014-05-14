var Workspace = (function(){
	var currentEditor,
		currentViewport,
		currentProject,
		currentTab;
	return{
		omnibar:{},
		getCurrentEditor: function(){
			return currentEditor;
		},
		setCurrentEditor: function(ed){
			currentEditor = ed;
		},
		getEditors: function(){

		},
		setEditors: function(){

		},
		getCurrentProject: function(){
			return currentProject;
		},
		setCurrentProject: function(p){
			currentProject = p;
		},
		getCurrentViewport: function(){
			return currentViewport;
		},
		setCurrentViewPort: function(vp){
			currentViewport = vp;
		},
		setCurrentTab:function(tab){
			currentTab = tab;
		},
		getCurrentTab: function(){
			return currentTab;
		},
		init: function(){
			//Get all details from localStorage, then build them out
			this._addEventListeners();
			this.isFullScreen = this._fullScreenCheck();
		},
		resizer: $c('resizer')
	}
})();

Workspace._addEventListeners = function(){
	window.onkeydown = function(e){
		var k = e.keyCode;
		if(k===113){
			Workspace.getCurrentViewport().visible(false);
			e.preventDefault();
		}
		else if(k===114){
			Workspace.getCurrentViewport().visible('split');
			e.preventDefault();
		}
		else if(k===115){
			Workspace.getCurrentViewport().visible(true);
			e.preventDefault();
		}
		else if(e.ctrlKey && k === 80){
			Omnibar.toggleOmnibar();
			e.preventDefault(); 
		}
		else if(e.ctrlKey && k === 79) e.preventDefault();
		//Esc
		else if(k === 27){
			Omnibar.hideOmnibar();
		}
	}
	window.onkeyup = function(e){
		
	};

	//localStorage onchange event
	window.onstorage = function(){
		var code, ed;
		if(window.self === window.top){
			code = window.localStorage['code'];
			ed = Workspace.getCurrentEditor();
			if(window.localStorage['saved'] === 'true'){
				Workspace.getCurrentViewport().render(window.localStorage['code']);
				window.localStorage['saved'] = false;
			}
		}
	}

	//====== Resize bars ======//
	var rInterval, pc, resizing, posX, lblTimer, lsTimer;
	window.onmousemove = function(e){
		if(resizing){posX = e.clientX;}
	};

	window.onmousedown = function(e){
		var vp = Workspace.getCurrentViewport(), 
			res = Workspace.resizer;

		if(e.target.className === 'resizer'){
			resizing = true;
			gk.removeClass(vp.sizeLabel,'opaque');
			gk.addClass(document.body, 'resizing');
			//gk.addClass(vp,'resizing');
			res.style.width = "230px";
			res.style.marginLeft = "-110px";
			//res.style.background = 'orange';


			rInterval = setInterval(function(){
				var pc = (window.innerWidth - posX +1) / window.innerWidth * 100;
				vp.cont.style.width = pc + '%';
				Workspace.getCurrentEditor().cont.style.width = (100 -pc + '%');
				res.style.left = posX / window.innerWidth * 100 + '%';
				//clog(posX);
				gk.text(vp.sizeLabel, vp.cont.offsetWidth + 'px x ' + vp.cont.offsetHeight + 'px');
			}, 5);
		} 
	};
	
	window.onmouseup = function(){
		var vp = Workspace.getCurrentViewport(), 
			ed = Workspace.getCurrentEditor(),
			res = Workspace.resizer;
		
		//addEventL local var
		resizing = false;
		
		res.style.marginLeft = "-1px";

		editor.resize();
		gk.removeClass(document.body, 'resizing');
		//gk.removeClass(vp,'resizing');
		
		res.style.width = "8px";
		gk.addClass(vp.sizeLabel, 'opaque');
		clearInterval(rInterval);
		//obj.viewport.style.width = obj.viewport.offsetWidth + 'px';
		
		clearTimeout(lsTimer);
		lsTimer = setTimeout(function(){
			var vpw = vp.cont.offsetWidth;
			if(vpw){
				localStorage['vpWidth'] = vpw;
			}
			vp.cont.style.width = vpw + 'px';
		},400);
	};

	window.onresize = function(){
		if(window.self === window.top){
			var vp = Workspace.getCurrentViewport(), ed = Workspace.getCurrentEditor(),
			res = Workspace.resizer;
			gk.removeClass(vp.sizeLabel,'opaque');
			gk.text(vp.sizeLabel, vp.cont.offsetWidth + 'px x ' + vp.cont.offsetHeight + 'px');
			ed.cont.style.width = (window.innerWidth - vp.cont.offsetWidth) / window.innerWidth * 100 + '%';
			res.style.left = ed.cont.offsetWidth + 'px';
			clearTimeout(lblTimer)
			lblTimer = setTimeout(function(){
				gk.addClass(vp.sizeLabel, 'opaque');
			},600);
		}
	};
	//=========== end of resize ==============
}; //addEventListeners

Workspace._fullScreenCheck = function(){
	var t, str, opts;
	if(window.self === window.top){
		str = window.location.href;
		opts = gk.getLocalObj('opts');
		//Double check allows for just one setting or multiple for unknown future use cases.
		if( (t = /\?viewport=full/.test(str)) || (t = /\?viewport$/.test(str)) || (t = /\?design$/.test(str)) || opts && opts.display === 'vp'){
			gk.addClass(document.body, 'fsViewport');
			gk.delay([
				Workspace.getCurrentViewport(),
				function(){
					Workspace.getCurrentViewport().visible(true);
				}
			]);
		}
		else if( (t = /\?editor=full/.test(str) ) || (t = /\?editor$/.test(str) ) || opts && opts.display === 'ed'){
			gk.addClass(document.body, 'fsEditor');
			gk.delay([
				Workspace.getCurrentViewport(),
				function(){
					Workspace.getCurrentViewport().visible(false);
				}
			]);
		}
	}
	return t;
}



