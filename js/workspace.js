var Workspace = (function(){
	var currentEditor,
		currentViewport,
		currentProject;
	return{
		getActiveEditor: function(){
			return currentEditor;
		},
		setActiveEditor: function(ed){
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
		init: function(){
			//Get all details from localStorage, then build them out
		}
	}
})();