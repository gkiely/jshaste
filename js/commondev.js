/*Execution timing*/if(typeof Tstart === 'undefined'){window.Tstart=(new Date).getTime()}
if(window.location.host === "localhost"  || window.location.host === "192.168.1.241"){
	(function(){
		
		//--- Script for live.js ---//
		var scr = document.createElement('script');scr.src = '../js/live.js';document.body.appendChild(scr);
		var logging =0;
		if(logging){
			var scr2 = document.createElement('script'); scr2.src = '//cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.6.0/stacktrace.min.js'; document.body.appendChild(scr2);
			setTimeout(function(){
				var p = new printStackTrace.implementation();
				p.instrumentFunction(this, '_q', logStackTrace);
			}, 3000);
			function logStackTrace(stack) {
	    		clog(stack.join('\n'));
			}
		}
		

		//Click tester
		window.addEventListener('click', function(e){clog(e.srcElement);}, false);

		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded", function(e) {
				var a=(new Date).getTime();var b=a-window.Tstart;
				clog("DOMContentLoaded: "+ b + 'ms');
		  });
		}
		window.onload=function(){var a=(new Date).getTime();var b=a-window.Tstart;window.self === window.top ? clog('Page Load: ' + b + 'ms') : clog('frame load time: ' + b + 'ms')}
		//var node = document.createElement('div');node.innerHTML ='<span style="background-color:yellow;">Execution time: '+b+"ms</span>";if(document.body)document.body.appendChild(node);};

		window.onerror=function(a,b,c){

			var w = window;
			if(gk && !gk.generateError){
				gk.generateError = function generateError(){
					var e, d=w.document.createElement("div");d.className="gkErrorObj", lineNum=c;
					if(b) e=b.slice(b.indexOf("/")+2);

					//inception error
					if(window.self !== window.top){
						if(~navigator.userAgent.indexOf('Chrome') || ~navigator.userAgent.indexOf('Safari')){
							var scStr, sc;
							if(document.body && ~document.body.innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
								scStr = document.body.innerHTML;
								sc = scStr.lastIndexOf('_$jshScriptCounter$_=');
								sc = scStr.indexOf('=', sc);
								sc = scStr.substring(sc+1, scStr.indexOf(';', sc));
								//do a search through and get all scripts
								lineNum = window.parent.Workspace.getCurrentProject()._arrScript[sc -1] + c-2;
							}
						}
						else if(~document.getElementsByTagName('head')[0].innerHTML.lastIndexOf('_$jshScriptCounter$_=')){
							
							scStr = document.getElementsByTagName('head')[0].innerHTML;
							sc = scStr.lastIndexOf('_$jshScriptCounter$_=');
							sc = scStr.indexOf('=', sc);
							sc = scStr.substring(sc+1, scStr.indexOf(';', sc));
							lineNum = window.parent.Workspace.getCurrentProject()._arrScript[sc -1] + c-2;
							//w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');

						}
						else if(typeof(_$jshScriptCounter$_) !== 'undefined'){
							lineNum = window.parent.Workspace.getCurrentProject()._arrScript[_$jshScriptCounter$_ -1] + c-2;
							//w.gk.addClass(w.$c('CodeMirror-gutter-text')[0].childNodes[lineNum-1],  'runtimeError');
							//echo(document.body.innerHTML);
						}
						d.innerHTML = "<div style='font-family:calibri;background:pink; padding:0.4em 2.7% 0.8em 2.7%;border-top:1px #999 solid; position: fixed; bottom:0; width: 98%;'><div>"+a+"<br>Source File: "+"<a href='"+b+"'>"+e+"</a>"+"<br>Line: "+lineNum+"</div><span style=\" display: none; float:left; margin:15px 0px 0px 15px; background:red;padding:4px 9px;border-radius:30px; text-align:center; color:#FFF;\"></span></div>";
					}
					else{
						d.innerHTML="<div style='font-family:calibri;background:pink; padding:0.4em 2.7% 0.8em 2.7%;border-top:1px #999 solid;'><div><strong>Spritely Core Error</strong><br>"+a+"<br>Source File: "+"<a href='"+b+"'>"+e+"</a>"+"<br>Line: "+lineNum+"</div><span style=\" display: none; float:left; margin:15px 0px 0px 15px; background:red;padding:4px 9px;border-radius:30px; text-align:center; color:#FFF;\"></span></div>";
					}
					w.$id('errorContainer').appendChild(d);
					w.gkErrorObj={a:a,b:b,c:c,d:1};
				}
			}
			if(!$id('errorContainer')){
				var div = w.document.createElement('div');div.id = 'errorContainer';
				w.document.body.appendChild(div);
			}
			//If there was no previous error
			if(typeof w.gkErrorObj == 'undefined'){
				gk.generateError();
			}
			//Check against last, if they are the same
			else if(a === w.gkErrorObj.a && b === w.gkErrorObj.b && c === w.gkErrorObj.c){
				var gkObj = w.$id('errorContainer').lastChild;
				var spanTag = gkObj.getElementsByTagName('span')[0];
				spanTag.innerHTML = ++w.gkErrorObj.d;
				spanTag.style.display = '';
			}
			else{
				gk.generateError();
			}
			if(w.Viewport){ gk.addClass(w.Viewport._errorContainer, "showI");}
			//gk.show(w.Viewport._errorContainer);
		};
	})()
	var echo = function echo(){
		var args, node = document.createElement('pre');
		function a(){
			document.body.appendChild(node);
		}
		if(arguments.length){
			if(typeof arguments[0] === 'object'){
				try{
				node.textContent = JSON.stringify(arguments[0], null, 4);
				}
				catch(e){
					node.textContent = arguments[0];
				}
			}
			else if (arguments.length ===1 && arguments[0]=== undefined){
				node.textContent = "undefined"
			}
			else node.textContent = Array.prototype.slice.call(arguments,0).join('');
		}
		else node.textContent = 'undefined';
		if(document.body) a();
		else gk.DOMready(a);
	}
}





//Main querier
//Allows _('.test').click(...)
function _q(f, i){
	var ict;
	if (window === this) {
  		return new _q(f, i);
	}

	
	if(typeof f === 'string'){
		ict = gk.strDomCheck(f);
		if(ict){
			if(ict === 'class'){
				this.nodes = Array.prototype.slice.call(
					document.getElementsByClassName(f.slice(1))
				);
			}
			else if(ict === 'id'){
				this.nodes = [document.getElementById(f.slice(1))];
			}
			else if(ict === 'tag'){
				this.nodes = Array.prototype.slice.call(
					document.getElementsByTagName(f)
				);
			}

			if(i===0) this.nodes = [this.nodes[i]];
		}
		else if(i === 0){
			this.nodes = [document.querySelector(f)];
		}
		else{
			this.nodes = Array.prototype.slice.call(
				document.querySelectorAll(f)
			);
		}

		//handle no elems found, and i
		if(this.nodes.length === 0){clog('no nodes found');return 0;}
		if(i !== undefined && i!== 0){
			if(this.nodes[i] !== undefined) this.nodes = [this.nodes[i]];
			else clog('No node found at index ' + i);
		}
		this.length = this.nodes.length;
		return this;
	}
	else if(f.nodeType ===1){
		this.nodes = [f];
		this.length = this.nodes.length;
		return this;
	}
	else if(f.length){
		this.nodes = Array.prototype.slice.call(f);
		this.length = this.nodes.length;
		return this;
	}
}


_q.prototype = {
	add: function(f){
		var n;
		if(typeof f === "string"){
			n = document.createElement('div');
			n.innerHTML = f;
			for (var i = 0; i < this.nodes.length; i++) {
				for (var j = 0; j < n.childNodes.length; j++) {
					this.nodes[i].appendChild(n.childNodes[j]);
				};
				
			};
		}
		else if(f.nodeType === 1){
		}
		return this;
	},
	addClass:function(){
		for(var l = arguments.length, j=0; j<l; j++){
			for (var i = 0; i < this.nodes.length; i++) {
				gk.addClass(this.nodes[i], arguments[j]);
			}
		}
		return this;
	},
	click: function(f){
		var l, that;
		l = this.nodes.length;
		if(!f && l===1) this.nodes[0].click();
		else{
			that = this;
			for(var i=0; i<l; i++){
				(function(i){
					that.nodes[i].onclick = function(e){
						//returns click evt, target, and node the click evt is on
						//Sooooo handy.
						if(that.nodes.length === 1) 
							f(e, e.target || e.srcElement, that);
						else f(e, e.target || e.srcElement, _q(that.nodes[i]));
					}
				})(i);
			}
		}
		return this;
	},
	
	css: function(obj){
		var l = this.nodes.length;
		for(var i=0; i<l; i++){
			for(var p in obj){
				this.nodes[i].style[p] = obj[p];
			}
		}
		return this;
	},
	data:function(prop, val){
		if(val){
			this.nodes[0].getAttribute('data-' + prop, val);
			return this;
		}
		return this.nodes[0].getAttribute('data-' + prop);
	},
	find: function(q, i){
		var l = this.nodes.length,
			nodes = [];
		if(l > 1){
			for(var i=0; i<l; i++){
				if(gk.matches(this.nodes[i], q)){
					nodes.push(this.nodes[i]);
					if(i===0) return _q(nodes);
				}
			}
			return _q(nodes);
		}
		return _q(this.nodes[0].querySelectorAll(q));
	},
	prev: function(){
		//gets prev sibling excl whitespace || text nodes
		var x=this.nodes[0].previousSibling;
		while (x && x.nodeType!==1){
		  	x=x.previousSibling;
		}
		if(x){
			return _q(x);
		}
		return this;
	},
	next: function(){
		//gets next sibling excl whitespace || text nodes
		var x=this.nodes[0].nextSibling;
		while (x && x.nodeType!==1){
		  		x=x.nextSibling;
		}
		if(x){
			return _q(x);
		}
		return this;
	},
	hasClass: (function() {
		if ("classList" in document.documentElement) {
			return function(cls){
				for (var i = 0; i < this.nodes.length; i++) {
					if(!this.nodes[i].classList.contains(cls)) return false;
				};
				return true;
			}
		}
		return function(el, cls){
			return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		} 
	})(),
	height: function(i){
		return this.nodes[i || 0].getBoundingClientRect().height;
	},
	hover: function(f, fout){
		var l = this.nodes.length,
			that = this;
		for(var i=0; i<l; i++){
			(function(i){
				that.nodes[i].onmouseover = function(e){
					
						//returns click evt, target, and node the click evt is on
						//Sooooo handy.
						if(that.nodes.length === 1) 
							f(e, e.target || e.srcElement, that);
						else f(e, e.target || e.srcElement, _q(that.nodes[i]));
				
				}
				that.nodes[i].onmouseout = function(e){
					if(that.nodes.length === 1) 
						fout(e, e.target || e.srcElement, that);
					else fout(e, e.target || e.srcElement, _q(that.nodes[i]));
				}
			})(i);
		}
		return this;
	},
	i: function(i){
		return _q(this.nodes[i]);
	},
	matches: function(rule){
		return gk.matches(this.nodes[0],rule);
	},
	node: function(i){
		return this.nodes[i || 0];
	},
	parent: function(){
		return _q(this.nodes[0].parentNode);
	},
	pos:function(i){
		var node = this.nodes[i || 0],
			pos = node.getBoundingClientRect();
		return {x: pos.left, y: pos.top, width: pos.width, height: pos.height};
	},
	remove: function(cls){
		for (var i = 0; i < this.nodes.length; i++) {
			gk.remove(this.nodes[i]);
		};
	},
	removeClass: function(cls){
		for (var i = 0; i < this.nodes.length; i++) {
			gk.removeClass(this.nodes[i], cls);
		}
		return this;
	},

	style: function(s, p){
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].style[s] = p;
		}
		return this;	
	},
	text: (function(){
		if("textContent" in document.documentElement){
			return function(str){
				if(str) this.nodes[0].textContent = str;
				else return this.nodes[0].textContent;
			}
		}
		return function(el, str){
			if(str) this.nodes[0].innerText = str;
			else return this.nodes[0].innerText;
		}

	})(),
	width: function(i){
		return this.nodes[i || 0].getBoundingClientRect().width;
	}

}

function _ls(id){
	var ls;
	if (window === this) {
  		return new _ls(id);
	}
	ls = localStorage[id];
	if(ls){
		this.ls = JSON.parse(localStorage[id]);
	}
	this.id = id;
	return this;
}

_ls.prototype = {
	get: function(){
		return this.ls;
	},
	set: function(obj){
		this.ls = obj;
		this._save();
		return this;
	},
	pop: function(){
		this.ls.pop();
		this._save();
		return this;
	},
	push: function(val){
		this.ls.push(val);
		this._save();
		return this;
	},
	_save: function(){
		localStorage[this.id] = JSON.stringify(this.ls);
		return this;
	}
}



var clog = (function(){if(window.console && window.location.host === "localhost") return function clog(val){console.log(val);};else return function clog(){};})();


//--- Deprecated ---//
//function $tag(tag){return document.getElementsByTagName(tag);}
function $q(q, n){n=n||0;if(n==0) return document.querySelector(q);if(n===true) return gk.nlToArr(document.querySelectorAll(q));return document.querySelectorAll(q)[n];}
//caches a node
//function $ca(cl, n){if(!(cl in gk.cachedNodes)){gk.cachedNodes[cl] = $c(cl,n);}return gk.cachedNodes[cl];}
function $id(id){return document.getElementById(id);}
function $c(cl, n){n=n||0;if(n===true)return gk.nlToArr(document.getElementsByClassName(cl));return document.getElementsByClassName(cl)[n];}


//------------------ The gk Framework ------------------//
var gk = {
	cachedNodes:{},
//Takes 3 args, test, func, & optional delay time
delay: function(arr){
	if(arr[0]){
		arr[1]();
	}
	else{
		arr[2] = arr[2] || 500;
		setTimeout(function(){
			gk.delay(arr);
		},arr[2]);
	}

},
//http://dustindiaz.com/smallest-domready-ever
DOMready: function(func){/in/.test(document.readyState)?setTimeout('gk.DOMready('+func+')',0):func()},

nlToArr: function(nl){var arr=[];for(var i=0, l = nl.length; i!=l; arr.push(nl[i++]));return arr;},
insertAfter: function(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
},
insertBefore: function(referenceNode, newNode){
	referenceNode.parentNode.insertBefore(newNode, referenceNode);
},
//returns true/false for localStorage support
xLocal: function(){
	try{return'localStorage'in window&&window['localStorage']!==null;}
	catch(e){return false;}
},
nthOccurence:function (str, ch, n){
	var pos = str.indexOf(ch);
	while(n-- > 1 && pos!=-1){
		pos=str.indexOf(ch, pos+1);
	}
	return pos;
},
//Classlist much faster browser api
hasClass: (function() {
	if ("classList" in document.documentElement) {
		return function(el, cls){
			return el.classList.contains(cls);
		}
	}
	return function(el, cls){
		return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	} 
})(),
addClass: (function() {
	if ("classList" in document.documentElement) {
		return function(el, cls){
			var arr;
			cls = cls.trim();
			if(/ /.test(cls)){
				arr = cls.split(' ');
				for (var i = 0; i < arr.length; i++) {
					el.classList.add(arr[i]);
				}
			}
			else el.classList.add(cls);
		}
	}
	return function (el, cls){
		var arr;
		if(el.className.length===0) el.className = cls;
		else if(/ /.test(cls)){
			arr = cls.split(' ');
			for (var i = 0; i < arr.length; i++) {
				el.className += " "+arr[i];
			}
		}	
		else if (!gk.hasClass(el,cls)) el.className += " "+cls;
	}
})(),
removeClass: (function() {
	if ("classList" in document.documentElement) {
		return function(el, cls){
			var arr;
			cls = cls.trim().replace('.','');
			if(/ /.test(cls)){
				arr = cls.split(' ');
				for (var i = 0; i < arr.length; i++) {
					el.classList.remove(arr[i]);
				}
			}
			else el.classList.remove(cls);
		}
	}
	return function (el, cls){
		var reg;
		cls = cls.trim().replace('.','');
		if(/ /.test(cls)){
			arr = cls.split(' ');
			for (var i = 0; i < arr.length; i++) {
				if (gk.hasClass(el,arr[i])) {
					reg = new RegExp('(\\s|^)'+arr[i]+'(\\s|$)');
	  				el.className=el.className.replace(reg,'');
  				}
			}
		}
		else{
			reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			el.className=el.className.replace(reg,'');
		}
	} 
})(),
toggleClass: (function(){
	if ("classList" in document.documentElement) {
		return function(el, cls){
			el.classList.toggle(cls);
		}
	}
	return function(el, cls){
		if (!gk.hasClass(el,cls)) el.className += " "+cls;
		else{
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	      	el.className=el.className.replace(reg,'');
		}
	}
})(),
removeParentKeepChild: function(nodeToBeRemoved){
	while (nodeToBeRemoved.firstChild){
    	nodeToBeRemoved.parentNode.insertBefore(nodeToBeRemoved.firstChild, nodeToBeRemoved);
	}
	nodeToBeRemoved.parentNode.removeChild(nodeToBeRemoved);
},
getPrevSib: function(n){
	//gets prev sibling excl whitespace || text nodes
	var x=n.previousSibling;
	while (x && x.nodeType!==1){
	  	x=x.previousSibling;
	}
	return x;
},
getNextSib: function(n){
	//gets next sibling excl whitespace || text nodes
	var x=n.nextSibling;
	while (x && x.nodeType!==1){
	  		x=x.nextSibling;
	}
	return x;
},
removeAllChildren: function(pnode){
	if(pnode.hasChildNodes()){
		while(pnode.firstChild){
			pnode.removeChild(pnode.firstChild);
		}
	}
},
remove: function(node){
	node.parentNode.removeChild(node);
},
getLocalObj: function(id){
	var val = localStorage[id];
	if(val)	return JSON.parse(val);
},
saveLocalObj: function(id, obj, val){
	//This func is overloaded. Allows for saving of single prop or entire  obj
	if(typeof val !== "undefined"){
		var o = gk.getLocalObj(id) || {};
		o[obj] = val;
		gk.saveLocalObj(id, o);
	}
	else if(typeof id !== "undefined" && obj){
		localStorage[id] = JSON.stringify(obj);
	}
},
removeLocalObj: function(id){
	if(localStorage[id])
		localStorage.removeItem(id);
},
strDomCheck:function(s){
	//This method checks for single class, id or tag
	if(s.charAt(0) === '.'){

	}
	if(!/^$|\s+|>|<|~|\+|\*|\[|:/.test(s))
	{
		if(/^\./.test(s) && !/\./.test(s.slice(1))){
			return 'class';
		}
		else if(/^\#/.test(s)){
			return 'id';
		}
		//make sure it is not elem.class
		else if(!/\.|#/.test(s)) return 'tag';
	}
},
createNode: function(type, value){
	var node = document.createElement(type);
	node.innerHTML = value;
},
createScript: function(src){
	var scr = document.createElement('script');
	scr.src = src;
	document.body.appendChild(scr);
},
isVisible: function(node){
	if(node.style.display !== 'none'){
		return true;
	}
	else return false;
},
hide: function(){
	for(var i=0; i< arguments.length; i++){
		arguments[i].style.display = 'none';
	}
	//if(node)node.style.display = 'none';
},
//use in script onError="loadScript('js/script.js')"
loadScript: function(src){
	var scr = document.createElement('script');
	scr.src = src;
	if(document.body){document.body.appendChild(scr);}
	else if(document.addEventListener){document.addEventListener("DOMContentLoaded", function(event){document.body.appendChild(scr);});}
	else{setTimeout(function(){scriptLoad(src);},20);}
},
show: function(node){
	if(node)node.style.display = '';
},
toggle: function(node){
	if(node){
		if(gk.isVisible(node))
			node.style.display = 'none';
		else{
			node.style.display = '';
		}
	}
},
mousePos: function(e){
	var x = e.pageX;
	if(x !== undefined){
		return {x:x, y: e.pageY}
	}
	//this is for IE
	else{
		return {x: e.clientX + document.body.scrollLeft, y: e.clientY + document.body.scrollTop}
	}
},
parent: function(node, id){
	//Returns number of iterations, 1 = parent, 2 = parent.parent
	if(typeof node === 'string') node = $id(node);
	var i=0;
	while(node.parentNode && node.id !== id){
		node = node.parentNode;
		i++;
	}
	if(node.parentNode) return i;
	else return 0;
},
reverseStr: function(str){
	return str.split('').reverse().join('');
},
detectSelection: function() {
	var html;
	if (typeof window.getSelection != "undefined") {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var container = document.createElement("div");
			container.appendChild(sel.getRangeAt(0).cloneContents());
			html = container.innerHTML;
		}
	} 
	else if (typeof document.selection != "undefined") {
		if (document.selection.type == "Text") {
			html = document.selection.createRange().htmlText;
		}
	}
	if(html)return true;
	else return false;
},
regexIndexOf:function(str, regex, startpos) {
    var io = str.substring(startpos || 0).search(regex);
    return (io >= 0) ? (io + (startpos || 0)) : io;
},
regexLastIndexOf:function(str, regex, startpos) {
    var li, nextStop, result;
	regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
    if(startpos) {
		str = str.substring(0, startpos + 1);
    } 
	else if(startpos < 0) {
        startpos = 0;
    }
	
    li = -1;
    nextStop = 0;
	while((result = regex.exec(str)) != null) {
        li = result.index;
        regex.lastIndex = ++nextStop;
    }
    return li;
},
timer: function(name, code, time){
	if(time !== undefined){
		if(gk.timer[name]) clearTimeout(gk.timer[name]);
		gk.timer[name] = setTimeout(code,time);
	}
	else{
		setTimeout(name, code);
	}
	return this;
},
cancelTimer: function(name){
	clearTimeout(gk.timer[name]);
},
//Fixes null, array being classed as object
'typeof': function(thing){
	var toType =(function(obj) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	})(thing);
	
	if(typeof thing === 'object'){
		if(thing === null){
			return 'null';
		}
		else if (gk.isNodeList(thing,toType)) {
    		return 'nodeList';
  		}
		else if(Object.prototype.toString.call(thing) === '[object Array]'){
			return 'array';
		}
		else if(toType === 'math' || toType === 'json' || toType === 'date' || toType === 'regexp')
			return toType;
		else if(thing === window)return 'windowObject';
		else if(thing === document)return 'documentObject';
		else{
			return 'object';
		}
		
	}
	else{
		return typeof thing;
	}
},
isObj: function (obj) {
   for(var i in obj) {
      if (obj.hasOwnProperty(i)){
		    return true;
	  }
	}
   return false;
},
isObjEmpty: function (obj) {
   for(var i in obj) {
      if (i.hasOwnProperty(i))
         return false;
	}
   return true;
},
objLength: function(obj, hasProp) {
    var i = 0, k;
	if(hasProp){
		for (k in obj) if(obj.hasOwnProperty(key)) i++;
	}
	else{
		for (k in obj) i++;
	}
    return i;
},
isNodeList: function(nodes,toType) {
  var result = Object.prototype.toString.call(nodes);
	//Initial check 
  	if (typeof nodes === 'object'
    	&&
    	/^\[object (HTMLCollection|NodeList|Object)\]$/.test(result)
    	&&
    	nodes.hasOwnProperty('length')
    	&& 
		(nodes.length == 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))){
    	return true;
	}
	//Secondary check http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	else if(toType === 'htmlcollection' || toType === 'nodeList'){
		return true;
	}
  return false;
},
prefix: (function(){
	var el = document.createElement('div'), 
		s;
	el.style.MozTransform = 'translate(100px)';
	el.style.WebkitTransform = 'translate(100px)';
	el.style.MsTransForm = 'translate(100px)';
	s = el.getAttribute('style');

	if(/moz/.test(s)) return "Moz";
	else if(/webkit/.test(s)) return "Webkit";
	else if(/ms/.test(s)) return "Ms";
	else return '';

})(),
//Allows get and set of text;
text: (function(el, str){
	//Init test of textContent or innerText
	if("textContent" in document.documentElement){
		return function(el, str){
			if(str) el.textContent = str;
			else return el.textContent;
		}
	}
	return function(el, str){
		if(str) el.innerText = str;
		else return el.innerText;
	}
})(),

addEvent: (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          gk.addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          gk.addEvent(el[i], type, fn);
        }
      }
    };
  }
})()

}; //End of gk object

gk.matches = (function match(el){
	var arr = ['matches', 'matchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector','oMatchesSelector' ];
	var l = arr.length, str;
	for(var i=0; i<l; i++){
		if(el[arr[i]]){
			str = arr[i];
			return function(el, rule){
				return el[str](rule);
			}
		}
	}
})(Element.prototype);

//http://detectmobilebrowsers.com/
gk.isMobile = (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))){ 
    	return true;
    }
    return false;
})(navigator.userAgent || navigator.vendor || window.opera);

//http://stackoverflow.com/questions/7690676/javascript-the-best-way-to-detect-ie#answer-20201467
//Answer also has detection for versions if needed
gk.ie = document.documentMode !== undefined;


//-----------------------------
//------ polyfills/shims ------
//-----------------------------
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce(accumulator){
    if (this===null || this===undefined) throw new TypeError("Object is null or undefined");
    var i = 0, l = this.length >> 0, curr;
 
    if(typeof accumulator !== "function") // ES5 : "If IsCallable(callbackfn) is false, throw a TypeError exception."
      throw new TypeError("First argument is not callable");
 
    if(arguments.length < 2) {
      if (l === 0) throw new TypeError("Array length is 0 and no second argument");
      curr = this[0];
      i = 1; // start accumulating at the second element
    }
    else
      curr = arguments[1];
 
    while (i < l) {
      if(i in this) curr = accumulator.call(undefined, curr, this[i], i, this);
      ++i;
    }
 
    return curr;
  };
}

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  };
}
if(typeof String.prototype.reverse !== 'function'){
String.prototype.reverse=function(){return this.split("").reverse().join("");}
}
String.prototype.leftTrim = function() {
	return this.replace(/^\s+/,"");
}
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(search) {
    var d = document, elements, pattern, i, results = [];
    if (d.querySelectorAll) { // IE8
      return d.querySelectorAll("." + search);
    }
    if (d.evaluate) { // IE6, IE7
      pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
      elements = d.evaluate(pattern, d, null, 0, null);
      while ((i = elements.iterateNext())) {
        results.push(i);
      }
    } else {
      elements = d.getElementsByTagName("*");
      pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
      for (i = 0; i < elements.length; i++) {
        if ( pattern.test(elements[i].className) ) {
          results.push(elements[i]);
        }
      }
    }
    return results;
  }
}

//Array methods
//http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}

//console is undefined in IE
if(typeof console === 'undefined'){var console = {log:function(){},dir:function(){},time:function(){},timeEnd:function(){}};}

if(window.location.host === "localhost"  || window.location.host === "192.168.1.241"){
	gk.assert = function(outcome, outcome2){
		if(!$id('_assertTestTitle')){
			var h3 = document.createElement('h3');
			h3.id = '_assertTestTitle';
			h3.appendChild(document.createTextNode('Tests'));
			h3.style.marginBottom=0;
			document.body.appendChild(h3);
		}
		var li = document.createElement('li'),
			span = document.createElement('span');
	    if(outcome === outcome2){
			span.appendChild(document.createTextNode('Pass'));
			li.style.background = '#8AFF7D';
		}
		else{
			span.appendChild(document.createTextNode('Fail'));
			li.style.background = '#FF8080';
		}

	    var ul =document.createElement('ul');
		//Styling
		ul.style.marginTop=0;ul.style.marginBottom=0;
		ul.style.paddingLeft=0;li.style.paddingLeft=0;
		li.style.display = 'inline-block';
		li.appendChild(span);
		ul.appendChild(li);
		document.body.appendChild(ul);
	};
}

//------------------- End of gk framework --------------------//



