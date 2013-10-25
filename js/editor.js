
//=== Editor ===//
// Spawns a new editor
// An editor instance contains all the tabs currently in that editor
// Handles all editor shortcuts
var Editor = (function(o){
	function Editor(o){
		var ed;
		this.size = o.size;
		this.tabs = o.tabs;

		this.id = o.id;
		this.theme = o.theme;
		this.mode = o.mode;
		this.code='';

		ed = this._init();
		this._addEventListeners(ed);
		return ed;
	}

	Editor.prototype._init = function(){
		var that = this;
		this.ed = ace.edit(this.id);

		this.ed.setTheme(this.theme);
		this.ed.session.setMode(this.mode);
		this.ed.session.setUseSoftTabs(false);
		//editor.session.setUseWrapMode(true);
		this.ed.setShowPrintMargin(false);
		this.ed.setHighlightActiveLine(false);
		this.ed.setBehavioursEnabled(false);

		this.ed.commands.addCommand({
			name: "save",
			bindKey: {win: "Ctrl-S", mac: "Command-Option-Ss"},
			exec: function(editor){
				that.code = editor.getValue();
				if(false){}
				//if(obj.inceptionOn) obj.inception();
				else WS.currentViewPort.render(that.code);
				window.localStorage['code'] =  that.code;
				gk.saveLocalObj('curs', editor.getCursorPosition());
			}
		});
		return this.ed;
	};
	Editor.prototype._addEventListeners = function(editor){
		var runTimer, codeTimer, 
			that = this;
		/*
		editor.session.on('change', function() {
			that.code = editor.getValue();

			clearTimeout(runTimer);
			clearTimeout(codeTimer);
			runTimer = setTimeout(function(){
				if(window.self === window.top){
					//if(obj.inceptionOn) obj.inception();
					if(false){}
					else WS.currentViewPort.render(that.code);
					codeTimer = setTimeout(function(){
			    		window.localStorage['code'] =  that.code;
			    		gk.saveLocalObj('curs', editor.getCursorPosition());
			    	}, 500)
		    	}
			},100);
		});
		*/
	}
	Editor.prototype._addNewTab = function(name, data){

	};
	return function(o){ 
		return new Editor(o);
	}
})();