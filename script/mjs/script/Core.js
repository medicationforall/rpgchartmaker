/**
 *   Mjs source file Core,
 *   Copyright (C) 2016  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//'use strict';
function Core(){
	this.parent=null;
	this.children=[];
}


//LIFECYCLES
/**
 * init prior to load
 *@todo May not be needed
 */
Core.prototype.init=function(){
	//console.log('call load for '+ this.constructor.name);
	return this.each('init');
};


/**
 * Load lifecycle.
 *@see CoreTemplate
 */
Core.prototype.load=function(){
	//console.log('call load for '+ this.constructor.name);
	return this.each('load');
};


/**
 * Places the nodes content into the html page.
 */
Core.prototype.setup=function(){
	this.each('setup');
};


/**
 * Register user interation events after all setup lifecycle.
 */
Core.prototype.register=function(){
	this.each('register');
};


/**
 *
 */
Core.prototype.update=function(params){
	//console.log('call update for '+ this.constructor.name);
	return this.each('update',params);
};


/**
 *
 */
Core.prototype.create=function(params){
	//console.log('call update for '+ this.constructor.name);
	return this.each('create',params);
};


/**
 *
 */
Core.prototype.preload=function(params){
	//console.log('call preload for '+ this.constructor.name+' children',this.children);
	return this.each('preload',params);
};


/**
 *
 */
Core.prototype.destroy=function(params){
	//console.log('call preload for '+ this.constructor.name+' children',this.children);
	return this.each('destroy',params);
};


//METHODS
/**
 * Runs the given method against all of the children of this node.
 *@param methodName String
 *@return An arraylist of the deferreds returned by the child method calls.
 */
Core.prototype.each=function(methodName,params){
	var list = [];
	for(var i=0,child;(child=this.children[i]);i++){
		//console.log('core call '+methodName+ ' for',child);
		list = list.concat(child[methodName](params));
		if(params && params.killUpdate){
			break;
		}
	}
	return list;
};


/**
 * Adds a child node to this object, and sets the childs parent to this node.
 *@return Core Object The child node that was just added this node.
 */
Core.prototype.add=function(child){
	child.setParent(this);
	this.children.push(child);
	return child;
};


/**
 * Remove a child of this object.
 */
Core.prototype.remove=function(rChild){
	var newChildren = [];
	for(var i=0,child;(child=this.children[i]);i++){
		if(child !== rChild){
			newChildren.push(child);
		}
	}

	this.children=newChildren;
};


/**
 * Adds the child to this object list as children by placing it at the beginning of the children array.
 */
Core.prototype.prepend=function(child){
	child.setParent(this);
	this.children.unshift(child);
	return child;
};


/**
 *@return the parent of the node.
 */
Core.prototype.getParent=function(classObject){
	if(classObject!==undefined && this.parent!==null){
		if(this.parent.constructor === classObject){
			return this.parent;
		}else{
			return this.parent.findParent(classObject);
		}
	}else{
		return undefined;
	}
};


/**
 * Sets the parent of the node.
 */
Core.prototype.setParent=function(parent){
	this.parent=parent;
};


/**
 *@return the children of the node
 */
Core.prototype.getChildren=function(){
	return this.children;
};


//SEARCH
/**
 *@return the core object closest to this node. Traverses up the tree never down.
 */
Core.prototype.closest=function(classObject){
	var hit;
	//is the current element a hit
	if(this.constructor === classObject){
		return this;
	}

	//check children
	if((hit = this.find(classObject))){
		return hit;
	}

	//traverse up
	if(this.parent !== null){
		return this.parent.closest(classObject);
	}else{
		return undefined;
	}
};


/**
 *
 */
Core.prototype.closestByKey=function(key,value){
  var hit;
  //is the current element a hit
	if(this[key] === value){
		return this;
	}

  //check children
	if((hit = this.findByKey(key,value))){
		return hit;
	}

	//traverse up
	if(this.parent !== null){
		return this.parent.closestByKey(key,value);
	}else{
		return undefined;
	}

};


/**
 *
 *@return the child of this node that matches the given classObject.
 */
Core.prototype.find=function(classObject){
	var hit;
	if(this.children.length>0){
		for(var i=0,child;(child=this.children[i]);i++){
			if(child.constructor === classObject){
				hit = child;
				break;
			}
		}
	}
	return hit;
};


/**
 *
 */
Core.prototype.findByKey=function(key,value){
	var hit;
	if(this.children.length>0){
		for(var i=0,child;(child=this.children[i]);i++){
			if(child[key] === value){
				hit = child;
				break;
			}
		}
	}
	return hit;
};
