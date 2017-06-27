/**
 *   RPG Chart Maker source file Base,
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

function Base(animate){
	//data
	this.node = undefined;
	this.handleKeyName='listGroupName';
	this.animate=true;
}


/**
 *
 */
Base.prototype.setupBase=function(template){
	this._createNode(template);
	this.setupSortable();
	this._setupHandleColor();
	this._setupAlphabetize();
	this._setupRollCheckBox();
};


/**
 *
 */
Base.prototype.setupSortable=function(){};


/**
 * Get the html template and store it in a static template variable.
 * @private
 */
Base.prototype._resolveTemplate=function(classObject,name){
	if(classObject.template){
		this._setup(classObject.template);
	}else{
		return $.get('html/'+name+'.html',$.proxy(function(data){
			classObject.template=data;

			if(this._setup){
				this._setup(classObject.template);
			}
		},this));
	}
};


/**
 * Inserts the template into the page.
 * If animate is true applies an animation effect.
 * @private
 */
Base.prototype._createNode=function(template){
	this.node = $(template.trim()).appendTo('.listGroupContainer');
	$.data(this.node[0],'coreNode',this);

	if(this.animate===true){
		this.node.animateCss('zoomInLeft');
	}
};


/**
 * Sets the color of the list header drag handle based on the text input on the List Name input.
 * @private
 */
Base.prototype._setupHandleColor=function(){
	this.node.find('input[name="'+this.handleKeyName+'"]').on('input',$.proxy(function(hashCode,intToRGB,node,event){
		var color = '';
		var value = $(this).val();
		$(node).data('name',value);

		if(value!==''){
			var hash = hashCode($(this).val());
			color = '#'+intToRGB(hash);
		}
		node.find('.handle').css('background-color',color)
	},null,this._hashCode,this._intToRGB,this.node));
};


/**
 *
 */
Base.prototype._setupRollCheckBox=function(){
	this.node.find('input[name="roll"]').on('change',$.proxy(function(node,event){
	$(node).data('roll',this.checked);
	},null,this.node));
};


/**
 * Converts a string to an integer.
 * @param str {string}
 * @return {int}
 */
Base.prototype._hashCode=function(str) { // java String#hashCode
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
	hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
};


/**
 * Converts an integer to a hex code.
 * @param i {int}
 * @return {hex}
 */
Base.prototype._intToRGB=function(i){
	var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
	return "000000".substring(0, 6 - c.length) + c;
};


/**
 *
 */
Base.prototype.gatherData=function(){
	var obj = {};

	//get list name
	obj.name= this.node.find('input[name=listGroupName]').val();

	//get get roll checkbox
	obj.roll= this.node.find('input[name="roll"]').prop('checked');

	//initialize list entries
	obj.list=[];

	if(this.node.hasClass('listGroup')){
		//fill out type
		obj.type='ListGroup';

		//fill out list
		this.node.find('ol li span.nameText').each(function(index, item){
			obj.list.push($(item).text());
		});
	}else if(this.node.hasClass('objectGroup')){
		//fill out type
		obj.type='ObjectGroup';

		//fill out order
		obj.order=[];

		this.node.find('.objectForm .objectInput').each(function(index, item){
			var data ={};
			data.label = $(item).data('label');
			data.type = $(item).data('type');
			obj.order.push(data);
		});

		//fill out list
		this.node.find('ol li .object').each(function(index, item){
			obj.list.push($(item).data('json'));
		});
	}

	return obj;
};
