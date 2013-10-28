var Project = (function(){
	return {
		_arrScript: [],
		_files: {},
		projectName:"Starter",
		init: function(){
			Workspace.setCurrentProject(this);
		}
	}
})();

//Get all localStorage details
Project.startup = function(){

}

Project.compile = function(){

};

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