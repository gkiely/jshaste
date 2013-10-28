function echo(){
	var args, node = document.createElement('pre');
	function a(){
		document.body.appendChild(node);
	}
	if(arguments.length){
		if(typeof arguments[0] === 'object'){
			node.textContent = JSON.stringify(arguments[0], null, 4);
		}
		else node.textContent = Array.prototype.slice.call(arguments,0).join('');
	}
	else node.textContent = 'undefined';
	if(document.body) a();
	else gk.DOMready(a);
}

(function(){
	var w = window.parent;
	function $id(id){return document.getElementById(id);}
	w.gk.hide(w.Viewport._errorContainer);

/* Prints out errors */
window.onerror=function(a,b,c){
	var lineNum, e=b.slice(b.indexOf("/")+2), sc, scStr;
	w.gk.show(w.Viewport._errorContainer);

	if(~navigator.userAgent.indexOf('Chrome') || ~navigator.userAgent.indexOf('Safari')){
		
		//This is complex shyt
		//Chrome and saf only show the lineNumber of current script tag
		//So we need to find which script tag we are in
		//after error occurs, does a reverse search for jshScriptCounter
		//body then head, then overall window val
		//if present, its val is the num of the script tag 
		//We query obj._arrScript for the lineNum of that script tag
		//The last occurence of the script is our curren
		if(document.body && ~document.body.innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
			scStr = document.body.innerHTML;
			sc = scStr.lastIndexOf('_$jshScriptCounter$_=');
			sc = scStr.indexOf('=', sc);
			lineNum = w.Workspace.getCurrentProject()._arrScript[scStr.substr(sc+1,1) -1] + c-2;		
			//lineNum = scStr.substr(sc+1,1);
		}
		else if(~document.getElementsByTagName('head')[0].innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
			
			scStr = document.getElementsByTagName('head')[0].innerHTML;
			sc = scStr.lastIndexOf('_$jshScriptCounter$_=');
			sc = scStr.indexOf('=', sc);
			lineNum = w.Workspace.getCurrentProject()._arrScript[scStr.substr(sc+1,1) -1] + c-2;
			//w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');

		}
		else if(typeof(_$jshScriptCounter$_) !== 'undefined'){
			lineNum = w.Workspace.getCurrentProject()._arrScript[_$jshScriptCounter$_ -1] + c-2;
			//w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');
			//echo(document.body.innerHTML);
		}
		
		
		/*
		if(~document.getElementsByTagName('head')[0].innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
			
			scStr = document.getElementsByTagName('head')[0].innerHTML;
			sc = scStr.lastIndexOf('_$jshScriptCounter$_=');
			sc = scStr.indexOf('=', sc);
			lineNum = w.obj._arrScript[scStr.substr(sc+1,1) -1] + c-2;
			w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');

		}
		else if(~document.documentElement.innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
			
		}
		
		*/
		//echo(document.head.innerHTML);
	}
	else{
		lineNum = c;
		//w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');
	}
	if(~a.indexOf("Unexpected end of input") || ~a.indexOf("missing name after")){
		lineNum--;
	}

	function generateError(){
		var gkE = w.document.querySelector('.gkErrorObj');
		if(gkE)w.gk.removeNode(gkE);
		var d=w.document.createElement("div");d.className="gkErrorObj";
		d.innerHTML="<div style='font-family:calibri;background:pink; height:62px; padding:5px 10px;border-top:1px #999 solid;'><div style=float:left;>"+a+"<br>Source File: "+"<a href='"+b+"'>"+e+"</a>"+"<br>Line: "+lineNum+"</div><span style=\" display: none; float:left; margin:15px 0px 0px 15px; background:red;padding:4px 9px;border-radius:30px; text-align:center; color:#FFF;\"></span></div>";
		w.$id('errorContainer').appendChild(d);
		w.gkErrorObj={a:a,b:b,c:c,d:1};
	}
	if(!w.$id('errorContainer')){
		var div = w.document.createElement('div');div.id = 'errorContainer';
		div.style.overflowY = 'hidden';

		//div.style.height = '20px';
		div.style.cursor = 'pointer';
		div.onclick = function(){
			if(div.style.height === '20px'){
				div.style.height = '';
			}
			else div.style.height = '20px';
		};

		w.document.body.appendChild(div);	
	}
	if(!w.$id('errorContainer').hasChildNodes()){
		var div = w.$id('errorContainer');
		//div.innerHTML = '<span style="background:pink;">Runtime errors:</span>';
		div.style.overflowY = 'hidden';
		//div.style.height = '20px';
		div.style.cursor = 'pointer';
		div.onclick = function(){
			if(div.style.height === '20px'){
				div.style.height = '';
			}
			else div.style.height = '20px';
		};
	}
	//If there was no previous error
	if(typeof w.gkErrorObj == 'undefined'){
		generateError();
	}
	//Check against last, if they are the same
	else if(a === w.gkErrorObj.a && b === w.gkErrorObj.b && c === w.gkErrorObj.c){
		var gkObj = w.$id('errorContainer').lastChild;
		var spanTag = gkObj.getElementsByTagName('span')[0];
		spanTag.innerHTML = ++w.gkErrorObj.d;
		spanTag.style.display = '';
	}
	else{
		generateError();
	}
};

/*
//This is to catch f2,f3,f4
window.onkeydown = function(evt){
	var w = window.parent;
	if(evt.keyCode === 113){
		w.obj.showCode();
		evt.preventDefault();
	}
	else if(evt.keyCode === 114){
		w.obj.splitView();
		evt.preventDefault();
	}
	else if(evt.keyCode === 115){
		w.obj.showDesign();
		evt.preventDefault();
	}
};
*/

// window.onkeyup = function(e){
// 	//backspace
// 	if(e.keyCode === 8){
// 		e.preventDefault();
// 	}
// 	//This updates the editor, when making changes in designer
// 	var w = window.parent;
// 	if(w.opt.edit){
// 		w.gk.timer('designerEdit',function(){
// 			var str = document.firstChild.innerHTML;
// 			str = str.replace(/_[^a-z0-9]jshScriptCounter[^a-z0-9]_=[0-9]*\n/g, '');
// 			str = str.replace(/_[^a-z0-9]jshScriptCounter[^a-z0-9]_=[0-9]*/g, '');
// 			str = str.replace(/<script src="spritely.iframe.js"><\/script>\n/,'');
// 			var s1 = str.lastIndexOf('<br><br>');
// 			str = str.substring(0,s1) + str.substr(s1 + '<br><br>'.length);
// 			if(w.opt.edit)	w.editor.setValue('<html>\n' + str + '\n<\/html>');
			
// 			w.obj.resizeIframe(w.obj.iframe, document.body);
// 			w.gk.timer('refresh',w.editor.refresh(), 100);
			
// 		},300);
// 	}
// };

})();

