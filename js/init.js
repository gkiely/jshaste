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
	
	-better startup load
	-live update for html and css
	-viewport stays same size when resizing horiz
	-when script is loaded, store reference and load it from the parent, replace iframe vers by accessing parent (get each load time under 20ms)
	-cdn js drop down or search
	-settings: code wrap
	
	-store last 10 iframe load times in array, when load time starts to get above 100ms, increase setTimeout
	Experimental feature later:
	-editor to dom mapping. Insane speed but not as reliable.
*/








window.editor = new Editor({
	id: 'editor',
	theme: "ace/theme/monokai",
	mode: "ace/mode/html"
});
var vp = new Viewport($id('viewport'), editor.getValue());

var WS = new Workspace(editor, vp);


//Lets get the basics down first
//Spawn and editor and a viewport
//Then render a viewport












})(window, undefined);