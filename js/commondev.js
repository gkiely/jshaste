/*Execution timing*/if(typeof Tstart === 'undefined'){window.Tstart=(new Date).getTime()}
window.onload=function(){var a=(new Date).getTime();var b=a-window.Tstart;clog('page load time: ' + b + 'ms')}
//var node = document.createElement('div');node.innerHTML ='<span style="background-color:yellow;">Execution time: '+b+"ms</span>";if(document.body)document.body.appendChild(node);};

window.onerror=function(a,b,c){
	var w = window;
	function generateError(){
		var e, d=w.document.createElement("div");d.className="gkErrorObj";
		if(b) e=b.slice(b.indexOf("/")+2);
		d.innerHTML="<div style='font-family:calibri;background:pink; padding:0.4em 2.7% 0.8em 2.7%;border-top:1px #999 solid;'><div><strong>Spritely Core Error</strong><br>"+a+"<br>Source File: "+"<a href='"+b+"'>"+e+"</a>"+"<br>Line: "+c+"</div><span style=\" display: none; float:left; margin:15px 0px 0px 15px; background:red;padding:4px 9px;border-radius:30px; text-align:center; color:#FFF;\"></span></div>";
		w.$id('errorContainer').appendChild(d);
		w.gkErrorObj={a:a,b:b,c:c,d:1};
	}
	if(!$id('errorContainer')){
		var div = w.document.createElement('div');div.id = 'errorContainer';
		w.document.body.appendChild(div);
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
	if(w.Viewport)gk.addClass(w.Viewport._errorContainer, "showI");
	//gk.show(w.Viewport._errorContainer);
};

function echo(){
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
		else node.textContent = Array.prototype.slice.call(arguments,0).join('');
	}
	else node.textContent = 'undefined';
	if(document.body) a();
	else gk.DOMready(a);
}

function $id(id){return document.getElementById(id);}
function $c(cl){return document.getElementsByClassName(cl);}
function $tag(tag){return document.getElementsByTagName(tag);}
var clog = (function(){if(window.console) return function clog(val){console.log(val);};else return function clog(){};})();
//------------------ The gk Framework ------------------//
var gk = {
//http://dustindiaz.com/smallest-domready-ever
DOMready: function(func){/in/.test(document.readyState)?setTimeout('gk.DOMready('+func+')',0):func()},



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
hasClass: function(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
},

addClass: function(ele,cls) {
	if (!gk.hasClass(ele,cls)) ele.className += " "+cls;
},
removeClass: function(ele,cls) {
  if (gk.hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,'');
  }
},

removeParentKeepChild: function(nodeToBeRemoved){
	while (nodeToBeRemoved.firstChild){
    	nodeToBeRemoved.parentNode.insertBefore(nodeToBeRemoved.firstChild, nodeToBeRemoved);
	}
	nodeToBeRemoved.parentNode.removeChild(nodeToBeRemoved);
},

toggleClass: function(ele,cls){
	if (!gk.hasClass(ele,cls)) ele.className += " "+cls;
	else{
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      	ele.className=ele.className.replace(reg,'');
	}
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
removeNode: function(node){
	node.parentNode.removeChild(node);
},
getLocalObj: function(id){
	var val = localStorage[id];
	if(val)	return JSON.parse(val);
},
saveLocalObj: function(id, obj){
	if(id && obj)
		localStorage[id] = JSON.stringify(obj);
},
setTextContent: function(element, text) {
	element.innerHTML = '';
    element.appendChild(document.createTextNode(text));
},
getTextContent: function(elem){
	if(elem.textContent){
		return elem.textContent;
	}
	else if(elem.innerText){
		return elem.textContent;
	}
},
removeLocalObj: function(id){
	if(localStorage[id])
		localStorage.removeItem(id);
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
show: function(node){
	if(node)node.style.display = '';
},
toggleDisplay: function(node){
	if(node){
		if(gk.isVisible(node))
			node.style.display = 'none';
		else{
			node.style.display = '';
		}
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
	if(gk.timer[name]) clearTimeout(gk.timer[name]);
	gk.timer[name] = setTimeout(code,time);
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
}
};

gk.DOMready(function(){
//Does init test, returns appropriate function
gk.text = (function(el, str){
	//Init test of textContent or innerText
	var t = document.createElement('i');
	t.appendChild(document.createTextNode('1'));
	document.body.appendChild(t);
	if(t.textContent){
		document.body.removeChild(t);
		return function(el, str){
			if(str) el.textContent = str;
			else return el.textContent;
		}
	}
	else if(t.innerText){
		document.body.removeChild(t);
		return function(el, str){
			if(str) el.innerText = str;
			else return el.innerText;
		}
	}
})();
});

//This is how we should be able to write code
gk.addEvent = (function () {
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
})();

//Always runs, Detects IE: https://gist.github.com/527683
gk.ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
}());
gk.isChrome = (function(){
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(window.chrome && is_chrome) return true;
}());

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

//------------------- End of gk framework --------------------//


