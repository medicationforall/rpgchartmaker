/**
 *   RPG Chart Maker source file ObjectGroup,
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
 * An oject list where each node was created via a user defined template form.
 * The template form allows adding, removing, editing, and re-ordering of form inputs.
 * The List supports adding, and re-ordering of list entries.
 * @see Base.js
 * @see html/objectGroup.html
 */
function ObjectGroup(animate){
	Base.call(this,animate);
	HasNow.call(this);
	HasObjectGroupLoad.call(this);

	this.orderList=undefined;
	this.form=undefined;
	this.overrideSelector=['.list','.menu'];

	/**
	 * constructor
	 */
	this._constructor = function(){
		if(animate!==undefined){
			this.animate=animate;
		}
		this._resolveTemplate(ObjectGroup,'ObjectGroup');
	};


	/**
	 * Sets up the html node, click handlers, sort handlers, and other controls.
	 * @private
	 */
	this._setup=function(template){
		this.setupBase(template);

		HasObjectGroupAddInput.call(this);
		HasObjectGroupAddEntry.call(this);

		HasObjectGroupEditInput.call(this);
		HasObjectGroupEditEntry.call(this);

		HasListMenu.call(this);

		$(this).trigger('loaded');
	};


	/**
	 * Sets the internal ol tag tag to sortable also allows dragging list entries between lists.
	 * @private
	 */
	this.setupSortable=function(){
		this.orderList = this.node.find('ol');
		this.form = this.node.find('.objectForm');

		this.orderList.sortable({connectWith: ".list ol"});
		this.form.sortable();
	};


	/**
	 * Sets the click hanlder for clicking on the alphabetize button.
	 * Also defines what the sort logic is.
	 * @private
	 */
	this._setupAlphabetize=function(){
		this.node.find('.alphabetizeButton').click($.proxy(function(event){
			event.preventDefault();
			var list = this.node.find('ol li');

			list.sort(function(a,b){
				aText = $(a).find('span.value').first().text();
				bText = $(b).find('span.value').first().text();

				if(aText > bText){
					return 1;
				}

				if(aText < bText){
					return -1;
				}

				return 0;
			});

			list.detach().appendTo(this.node.find('ol'));
		},this));
	};


	//main
	this._constructor();
}

Object.setPrototypeOf(ObjectGroup.prototype, Base.prototype);
