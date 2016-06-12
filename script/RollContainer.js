/**
 *   RPG Chart Maker source file RollContainer,
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

function RollContainer(animate){

//data
this.node;
this.animate=true;



//constructor
this._constructor = function(){
	this._resolveTemplate(ListGroup,'rollContainer');

	if(animate!==undefined){
		this.animate=animate;
	}

	this._setup=function(template){
		this._createNode(template);
	}
}


//main
	this._constructor();

}

var inheritsFrom = function (child, parent) {
   	child.prototype = Object.create(parent.prototype);
};

//setup inheritance from Base
inheritsFrom(RollContainer, Base);
