/**
 *   RPG Chart Maker source file template,
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
 *This is a stub instance class.
 */

function template(){

//constructor
this._constructor = function(){

	this._setupGenerate();
}

this._setupGenerate=function(){
	//generate click
	$('.generateButton').click(function(event){
		event.preventDefault();
		console.log('Clicked generate');
	});
}

//main
	this._constructor();

}
