//=== Editor ===//
// Spawns a new editor
// An editor instance contains all the tabs currently in that editor
// Handles all editor shortcuts

var Editor = (function(){
	function settings(){
		
	}
	return {
		_tabs:1,
		_theme: 'ace/theme/monokai',
		_mode: 'ace/mode/html',
		code: '',
		_id: 'editor',
		_size: '',
		setCode: function(code){
			this._code = code;
		},
		setTheme: function(val){
			this.inst.setTheme(val);
			this._theme = val;
		},
		init: function(){
			window.editor = this.inst = ace.edit(this._id);
			this._settings();
			this._addEventListeners();
			Workspace.setActiveEditor(this);
		}
	}
})();


Editor._settings = function(){
	this.inst.setTheme(this._theme);
	this.inst.session.setMode(this._mode);
	this.inst.session.setUseSoftTabs(false);
	//editor.session.setUseWrapMode(true);
	this.inst.setShowPrintMargin(false);
	this.inst.setHighlightActiveLine(false);
	this.inst.setBehavioursEnabled(false);
	//editor.moveCursorTo(obj.curs.row, obj.curs.column);
	this.inst.focus();
};

//Event listeners
Editor._addEventListeners = function(){
	//Event listeners
	var that = this;
	this.inst.commands.addCommand({
		name: "save",
		bindKey: {win: "Ctrl-S", mac: "Command-Option-Ss"},
		exec: function(editor){
			that.code = editor.getValue();

			if(false){}
			//if(obj.inceptionOn) obj.inception();
			else Workspace.getCurrentViewport().render(that.code);
			window.localStorage['code'] =  that.code;
			gk.saveLocalObj('curs', editor.getCursorPosition());
		}
	});

	var runTimer, codeTimer;
	/*
	this.inst.session.on('change', function() {
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
};