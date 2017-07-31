/**
 *   RPG Chart Maker source file HasObjectGroupLoad,
 *   Copyright (C) 2017  James M Adams
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
 * Load Mixin.
 * @mixin
 */
function HasObjectGroupLoad(){
  /**
	 * Adds a list entry to the list based on the order and data objects passed to this method.
	 * @param {Array} order - The order in which the data object should be called
	 * @param {Object} data -  The raw data of the entry
	 * @private
	 */
	this._addJSONEntry=function(order,data){
		var counter =0;
		var template = '<li><div class="object">';

		for(var i=0;i<order.length;i++){
			var label = order[i].label;
			var type =  order[i].type;
			var value = data[label];
			var colorBlock = '';

			//set custom style
			if(type === "color"){
				colorBlock='<span class="colorBlock" style="background:'+value+'"></span>';
			}

			//make sure the value is not empty
			if(value !== undefined && value!==''){
				counter++;
				template+='<div><span class="title" data-label="'+label+'">'+label+':</span>'+
				' <span class="value" data-type="'+type+'">'+value+'</span> '+colorBlock+' </div>';
			}
		}

		template+='</div></li>';

		//if entries are present then add the form data to the list.
		if(counter>0){
			var node =  $(template).appendTo(this.node.find('ol'));
			node.find('.object').data('json',data);
		}
	};


	/**
	 * Load the name, the object template form, and ol list with data.
	 * @param {Object} list
	 */
	this.fillOutList=function(list){
		this.fillOutName(list);
		this.fillOutRoll(list);
		this.fillOutUnique(list);

		//fill out order
		if(list.order && list.order.length>0){
			for(var i=0;i<list.order.length;i++){
				this._addInput(list.order[i].label,list.order[i].type);
			}

			//fill out list
			if(list.list && list.list.length>0){
				for(var j=0,entry;(entry=list.list[j]);j++){
					this._addJSONEntry(list.order,entry);
				}
			}
		}
	};
}
