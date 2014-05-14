var Omnibar = (function(){
	return {
		inst: $c('omnibar'),
		cont: $c('omniContainer'),
		cover: $c('modalCover'),
		results: $c('results'),
		init: function(){
			Workspace.omnibar = this;
		}
	}
})();

(function(){

function trueRound(value, digits){
    return (Math.round((value*Math.pow(10,digits)).toFixed(digits-1))/Math.pow(10,digits)).toFixed(digits);
}

function getAll(type){
	var doc = Workspace.getCurrentViewport().getDoc(), arr=[], n;
	var at = doc.getElementsByTagName('*');
	for(var i=0, l=at.length; i<l; i++){
		if( (n = at[i][type]) ) arr.push(n);
	}
	return arr;
}

function selectElementContents(el) {
    var range;
    if (window.getSelection && document.createRange) {
        range = document.createRange();
        var sel = window.getSelection();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.body && document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
}
function clearSelection() {
    if (window.getSelection) window.getSelection().removeAllRanges();
    else if (document.selection) document.selection.empty();
}


//Move into omnibar file, init last thing.
Omnibar.toggleOmnibar = function(){
	gk.toggleClass(Omnibar.cover, 'hide');
	gk.toggleClass(Omnibar.cont, 'hide');

	if(!gk.hasClass(Omnibar.cont, 'hide')){
		Omnibar.inst.focus();
	}
	else{
		gk.addClass(Omnibar.results, 'hide');
		gk.removeClass(Omnibar.inst, 'active');
		Omnibar.inst.value = '';
		Workspace.getCurrentEditor().inst.focus();
	}
};
Omnibar.hideOmnibar = function(){
	gk.addClass(Omnibar.cover, 'hide');
	gk.addClass(Omnibar.cont, 'hide');
	gk.addClass(Omnibar.results, 'hide');
	gk.removeClass(Omnibar.inst, 'active');
	Workspace.getCurrentEditor().inst.focus();
	Omnibar.inst.value = '';
}

Omnibar.inst.onkeydown = function(e){
	var k = e.keyCode;
	if(k===9){
		e.preventDefault();
	}
	if(k===67 && e.ctrlKey){
		selectElementContents(Omnibar.results);

		setTimeout(function(){
			gk.addClass($ca('ace_cursor'), 'no-border');
			Workspace.getCurrentEditor().inst.focus();
			setTimeout(function(){
				Omnibar.inst.focus();
				gk.removeClass($ca('ace_cursor'), 'no-border');
			},0)
		},200)
		
		
	}
}

Omnibar.inst.onkeyup = function(e){
	var k = e.keyCode;
	var val, dec, s, i, c=0, orig, re = /\./g, txt = this.value.trim(), evald;
	//console like
	//try{evald = Workspace.getCurrentViewport().getWindow().eval(this.value);}catch(e){}
	
	if(txt.length > 2 && txt.substr(0,2) === "em"){
		if(txt.substr(0,3) === "em:" && txt.length > 3) val = (+txt.substr(3) /16) *10;
		else if(txt.substr(0,4) === "em: ") val = (+txt.substr(4) /16) *10;
		else if(txt.substr(0,3) === "em ") val = (+txt.substr(3) /16) *10;
		else if(txt.charAt(2)!== ":") val = (+txt.substr(2) /16) *10;
	}
	//very contrived version to show off omni cmds
	else if( txt.charAt(0) === 'f' || txt.charAt(0)=== 'F'){
		val = 'full screen editor'
		//Enter
		if(k === 13){
			Workspace.getCurrentViewport().visible(false);
			Omnibar.hideOmnibar();
		}
	}
	else if( txt.charAt(0) === 's' || txt.charAt(0)=== 'S'){
		val = 'split view'
		//Enter
		if(k === 13){
			Workspace.getCurrentViewport().visible('split');
			Omnibar.hideOmnibar();
		}
	}
	else if( txt.charAt(0) === 'v' || txt.charAt(0)=== 'V'){
		val = 'Viewport'
		//Enter
		if(k === 13){
			Workspace.getCurrentViewport().visible(true);
			Omnibar.hideOmnibar();
		}
	}
	else if( txt.charAt(0) === 'l' || txt.charAt(0)=== 'L'){
		val = 'live view'
		//Enter
		if(k === 13){
			Workspace.getCurrentViewport().liveRender(true);
			Omnibar.hideOmnibar();
		}
	}
	//else if(txt.substr(0,2) === "em") val = (+txt.substr(2) /16) *10;
							  //Stop it running twice for shift keyup
	else if(txt[0] === "#" && e.keyCode !== 16){
		var arr = getAll('id');
		clog(arr);
	}
	else if(txt[0] === "."){
		var arr = getAll('className');
		clog(arr);
	}
	//Also detect if there is a space
	else if( !isNaN(txt[0]) ){
		try{
			//js parser for calculator
			val = eval(this.value);

			if( val !== undefined && val !== null && val.toString().indexOf('.') ){
				val = +trueRound(val,10);
			}

			/*
			//This handles decimals
			if( val !== undefined && val !== null && ~val.toString().indexOf('.') ){
				//when we find a ., get every numeric value after it.
				while(s = re.exec(this.value)){
					i = s.index;
					for(; i< this.value.length; i++){
						if(+this.value[i+1]){
							c++
						}
						else break;
					}
				}
			}
			if(c){
				val = this.value.replace('.', '');
				val = eval(val).toString();
				val = val.substr(0, val.length -c) + '.' + val.substr(val.length -c);
			}
			*/
			//End of decimal calc
		}
		catch(e){}

		
	}
	//else if(evald){val = evald;}
	//More likely to be a query selector
	else if(~txt.indexOf(" ") || ~txt.indexOf("[") || ~txt.indexOf("<") || ~txt.indexOf(">")){

	}

	if(val !== undefined && val !== null){
		val = val.toString();
		gk.text(Omnibar.results, val);
		gk.addClass(Omnibar.inst, 'active');
		gk.removeClass(Omnibar.results, 'hide');
	}
	else if(false){
		//check for files
	}
	else{
		gk.removeClass(Omnibar.inst, 'active');
		gk.addClass(Omnibar.results, 'hide');
	}
}
})();

Omnibar.init();