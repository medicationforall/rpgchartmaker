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

/**
 * Core Class framework.
 */
//'use strict';
function Core(){
	this.parent=null;
	this.children=[];
}


//METHODS
/**
 * Runs the given method against all of the children of this node.
 * @param {string} methodName String
 * @param {Object} params
 * @return {Array} An arraylist of the deferreds returned by the child method calls.
 */
Core.prototype.each=function(methodName,params){
	var list = [];
	for(var i=0,child;(child=this.children[i]);i++){
		list = list.concat(child[methodName](params));
		if(params && params.killUpdate){
			break;
		}
	}
	return list;
};


/**
 * Adds a child node to this object, and sets the childs parent to this node.
 * @param {Object} child
 * @return {Object} Core Object The child node that was just added this node.
 */
Core.prototype.add=function(child){
	child.setParent(this);
	this.children.push(child);
	return child;
};


/**
 * Remove a child of this object.
 * @param {Object} rChild
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
 * @param {Object} child
 * @return {Object}
 */
Core.prototype.prepend=function(child){
	child.setParent(this);
	this.children.unshift(child);
	return child;
};


/**
 * @param {Object} classObject
 * @return {Object} the parent of the node.
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
 * @param {Object} parent
 */
Core.prototype.setParent=function(parent){
	this.parent=parent;
};


/**
 *@return {Array} the children of the node
 */
Core.prototype.getChildren=function(){
	return this.children;
};


//SEARCH
/**
 * @param {Object} classObject
 * @return {Object} the core object closest to this node. Traverses up the tree never down.
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
 * @param {string} key
 * @param {Object} value
 * @return {Object}
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
 * @param {Object} classObject
 * @return {Object} the child of this node that matches the given classObject.
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
 * @param {string} key
 * @param {Object} value
 * @return {Object}
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
