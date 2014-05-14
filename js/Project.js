var Project = (function(){
	return {
		_arrScript: [],
		_files: {},
		projectName:"Starter",
		init: function(){
			Workspace.setCurrentProject(this);
			this.startup();
		}
	}
})();

//Get all localStorage details
Project.startup = function(){
	if(window.self === window.top){
		
	}
}


Project.compile = function(){

};

//On project start
//Parse project in localStorage
//Bring in all resources

Project.handleJSErrors = function(str){
	//If chrome or safari, we need to do this, otherwise return str
	if(~navigator.userAgent.indexOf('Chrome') || ~navigator.userAgent.indexOf('Safari')){
		this._arrScript.length = 0;
		var arr =str.split('\n'), i=0;
		for(; i<arr.length; i++){
			if(~arr[i].indexOf('<script')){
				this._arrScript.push(i+2);	
			}
		}
		i =1;
		//This var gets injected into user code, so special var name used to prevent clash
		if(str.indexOf('_$jshScriptCounter$_')<0){
			var uKey = '_$jshScriptCounter$_';
		}
		
		str = str.replace(/<script/g, function(e){
			return '<script>' + uKey + '=' + i++ +';' + '<\/script><script'; //Have to add new line to stop "SyntaxError: Unexpected ILLEGAL token" when scripts on same line as tag
		});
		
		/*
		//Need to catch <script type="text/javascript">
		str = str.replace(/<script src*?>/, function(e){
			return '<script>' + uKey + i++ + '</script>\n' + e;
		});
		*/
		//str = str.replace(str.substr(str.indexOf('<script src')
		return str;
	}
	else return str;
}


Project.getScript = function(str){
	var i =0, j, k, scr, arr=[];
	while( ~(j = str.indexOf('<script', i)) ){
		j = str.indexOf('>', j) +1;
		k = str.indexOf('</script', j);
		scr = str.substring(j, k);
		arr.push(scr);	
		i=str.indexOf('>', k);
	}
	return arr;
}

//unfinished
Project.insideScript = function(str, i){
	var j,k, l, m;
	if( ~(j =str.indexOf('</script', i)) && ~(k=str.lastIndexOf('<script', i)) ){

	}
}