var Tabs = (function(){
	return {
		_tabs: [
			{id: '', name:'', code:'', active:'', saved:'', num:0}
		],
		_active:'',
		container: _q('.tabs'),
		init: function(){
			this._getLocalTabs();
			Workspace.setCurrentTab(this);
			this._addEventListeners();

			//Get ls list of project files
			//Get ls list of open tabs
			//createTabs

			this.createTab({
				name: 'Untitled',
				active: true,
				code: localStorage['code'],
				saved: false
			});
			_q('.addFile').removeClass('hidei');
		}
	}
})();

Tabs.createTab = function(tab){
	this._tabs.push(tab);
	var nodes = this._generateTab(tab);
	_q('.tabs .active').removeClass('active');
	gk.insertBefore($c('addFile'), nodes);
	if(tab.code !== undefined && tab.active){
		var ed = Workspace.getCurrentEditor();
		ed.setCode(tab.code);

		//get list of tabs
		//get active tab
		//get that tabs curs
		var curs = {row: 0, col: 5};
		ed.setCurs(curs);
	}
	//this.container.appendChild(nodes);
};

//Gets rid of tab from memory and ls
Tabs.deleteTab = function(id){
	var l = this._tabs.length;
	for(var i=0; i<l; i++){
		if(this.tabs[i].id === id){
			if(this.tabs[i].active){
				this.removeTabFromDom();
			}
			//todo: remove from ls
			//localStorage[this.tabs[i].id]
			delete this.tabs[i];
		}
	}
};

Tabs.removeTabFromDom = function(){
	
}

//Public methods
Tabs.setTabs = function(arr){
	this._tabs = arr;
	var l = arr.length,
		html;
	for(var i=0;i <l; i++){
		html += this._generateTab(arr[i])
	}
	//html append
};
Tabs.close = function(){

};

//Private Methods
Tabs._getLocalTabs = function(){
	var tabs = gk.getLocalObj('openTabs');
	if(tabs && tabs.length){
		this._setTabs(tabs);
	}
};
Tabs._generateTab = function(tab){
	var li = document.createElement('li');
	li.className= (tab.active ? 'active ' : '') + 't' + ++this._tabs.length;
	li.innerHTML = '<i class="lt"></i>' +
				'<i class="bg">' + tab.name +'</i>' +
				'<i class="rt"></i>' +
				'<i class="close" onClick="Tabs.evtClose(this)"></i>';
	li.onclick = function(e){
		Tabs.evtActive(e, this);
	}

	//div.innerHTML = '<li class="' + (tab.active ? 'active ': '') + 't' + ++this._tabs.length + '" onClick="Tabs.evtActive(this)">' +
				
	//			'</li>';
	return li;
};

//Event Listeners
Tabs._addEventListeners = function(){
	//Old quick way of adding evt
	var li = $q(".tabs li", true);
	var tabs = $c('tabs');
	li.forEach(function(el){
		el.onclick = function(e){
			Tabs.evtActive(e, this);
		}
	});
	

	//New awesomer way
	_q('.close').click(function(e, node){
		Tabs.evtClose(node);
	})

	_q('.addFile').click(function(){
		var tab = Tabs.createTab({
			name: 'Untitled',
			active: true,
			code: '',
			saved: false
		});
	});
};

//This handles click evt and dom onClick, !node is for dom click as it can't pass the click evt
Tabs.evtActive = function(e, node){
	if(!node || !gk.hasClass(e.srcElement, 'close')){
		if(!node)node = e;
		_q('.tabs .active').removeClass('active');
		//gk.removeClass(tabs.getElementsByClassName('active')[0], 'active');
		gk.addClass(node, 'active');
	}
}

Tabs.evtClose = function(node){
	var pn = _q(node.parentNode);
	if(pn.hasClass('active')){
		var node = pn.prev() || pn.next();
		node.addClass('active');
	}
	pn.remove();
}

//// Tabs
//Look for tabs in project ls
//Init tabs
//Setup event listener for 

/*
-each new file gets it's own entry in ls
-openTabs: name of tabs open in project
-get those in ls
-init those tabs

*/


