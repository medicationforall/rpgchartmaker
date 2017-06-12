/**
 *   RPG Chart Maker source file ListGroup,
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
 * Simple list with controls for CRUD operations Create, Read, Update, and Delete.
 * @see Base.js
 * @see html/listGroup.html
 */
function ListGroup(animate){

	//data
	this.node=undefined;
	this.animate=true;

	/**
	 * constructor
	 */
	this._constructor = function(){
		if(animate!==undefined){
			this.animate=animate;
		}

		this._resolveTemplate(ListGroup,'listGroup');
	};


	/**
	 * Sets up the html node, click handlers, sort handlers, and other controls.
	 * @private
	 */
	this._setup=function(template){
		this._createNode(template);
		this._setupSortable();
		this._setupAddButton();
		this._setupEdit();
		this._setupAlphabetize();
		this._setupHandleColor();

		$(this).trigger('loaded');
	};


	/**
	 * Sets the internal ol tag tag to sortable also allows dragging list entries between lists.
	 * @private
	 */
	this._setupSortable=function(){
		this.node.find('ol').sortable({connectWith: ".list ol"});
	};


	/**
	 *
	 */
	this._setupAddButton=function(){
		//add name button click functionality
		this.node.on('click','.addNameButton',$.proxy(function(event){
			event.preventDefault();
			var nameInput = this.node.find('.nameInput');

			if(nameInput.val()!==''){
			this.node.find('ol').append('<li><span class="nameText">'+nameInput.val().trim()+'</span></li>');

			//reset note input
			nameInput.val('');
			nameInput.focus();
			}
		},this));

		//name input enter key press
		this.node.on('keypress','.nameInput',$.proxy(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13') {
				this.node.find('.addNameButton').trigger('click');
			}
		},this));
	};


	/**
	 *
	 */
	this._setupEdit=function(){

		//note edit functionality
		this.node.on('click','.nameText',function(event){
			var template = '<div class="inlineEdit">'+
			'<input class="noteEdit" type="text" value="'+$(this).text()+'" />'+
			'<div class="editControls">'+
			'<a href="" class="noteEditButton" title="Apply">+</a>'+
			'<a href="" class="noteDeleteButton" title="Delete">-</a>'+
			'</div>'+
			'</div>';

			//alert('clicked on nameText'+$(this).text());
			$(this).css('display','none');
			$(this).after(template);
		});

		//note apply click
		this.node.on('click','.noteEditButton',function(event){
			event.preventDefault();
			//alert('clicked note edit button');

			var inlineEdit = $(this).closest('.inlineEdit');
			var nameText = $(inlineEdit).prev('.nameText');
			var noteEdit = inlineEdit.find('.noteEdit');

			nameText.text(noteEdit.val()).css('display','block');
			inlineEdit.remove();
		});

		//name input enter key press
		this.node.on('keypress','.noteEdit',function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13') {
				$(this).closest('.inlineEdit').find('.noteEditButton').trigger('click');
			}
		});

		//note delete click
		this.node.on('click','.noteDeleteButton',function(event){
			event.preventDefault();

			var inlineEdit = $(this).closest('.inlineEdit');
			var nameText = $(inlineEdit).prev('.nameText');

			inlineEdit.remove();
			nameText.closest('li').remove();
		});
	};


	/**
	 * Sets the click hanlder for clicking on the alphabetize button.
	 * Also defines what the sort logic is.
	 *@private
	 */
	this._setupAlphabetize=function(){
		this.node.find('.alphabetizeButton').click($.proxy(function(event){
			event.preventDefault();

			var list = this.node.find('ol li');

			list.sort(function(a,b){
				aText = $(a).find('.nameText').text();
				bText = $(b).find('.nameText').text();

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


	/**
	 * @return jquery node of this ojects template.
	 */
	this.getNode=function(){
		return this.node;
	};


	/**
	 * Load list name, and ol list with data.
	 * @param list {JSON}
	 */
	this.fillOutList=function(list){

		//fill out name
		this.node.find('input[name=listGroupName]').val(list.name).trigger('input');

		//fill out roll
		if(list.roll!==undefined){
			if(list.roll=='true'){
				list.roll = true;
			}else if(list.roll=='false'){
				list.roll=false;
			}

			this.node.find('input[name="roll"]').prop('checked', list.roll);
		}

		//fill out List
		for(var j=0,item;(item=list.list[j]);j++){
			this.node.find('ol').append('<li><span class="nameText">'+item+'</span></li>')
		}
	};

	//main
	this._constructor();
}

var inheritsFrom = function (child, parent) {
   	child.prototype = Object.create(parent.prototype);
};

//setup inheritance from Base
inheritsFrom(ListGroup, Base);
