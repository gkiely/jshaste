//Spritely setup functions and readme 
/*
Coding style: Modular OO with prototypal benefits
-All code is defined in modules, with a return object
-Started objects are created w/ default vals
-Create new objects with create method, anything currently in the parent obj will be accesible on the prototype & will inherit from parent.
 Any new defined vals or methods, are attached to that object and will be passed down to prototype of children.
-To create a tab with different data, or new val/methods:
	var tab = new create(tab, {
		name: "tab2"
	})
-This will create a new obj with Object.Create, adds all the properties, and runs the init function if it
finds one in the object.

-You may ask, why not just create object literals, and the answer is: private object-wide properties
	Still working on the name, but basically you can set a private variable that is accessible/writable 
	to all objects of that module.
	var test (function(){
		var privVar = 5;
		return {
		}
	})();
	It makes it much easier when dealing w/ things as an api, you just query the parent module
	Workspace.getCurrentProject();

//// Style Rules ////
-Private object-wide props declared in module. Needs a getter in return.
-Object properties, getters & setters & the init function go in the return statement.
	-Any vals intended to be private should start with a _
-All Other functions get declared outside the module
	-If only being used by this module, start it with a _
	
*/


if(!Object.create){
	Object.create = function (o) {
		 function F() {}
		 F.prototype = o;
		 return new F();
	};
}
function addProps(child, o){
	for(var i in o){
		child[i] = o[i];
	}
}
function create(parent, obj){
	var child = Object.create(parent);
	if(obj) addProps(child, obj);
	if(typeof child.init === "function") child.init();
	return child;
}
