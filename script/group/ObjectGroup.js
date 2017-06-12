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
 * @todo add support for editing and removing list entries.
 * @see Base.js
 * @see html/objectGroup.html
 */
function ObjectGroup(animate){
	Base.call(this,animate);

	/**
	 * constructor
	 */
	this._constructor = function(){
		if(animate!==undefined){
			this.animate=animate;
		}

		this._resolveTemplate(ObjectGroup,'objectGroup');
	};


	/**
	 * Sets up the html node, click handlers, sort handlers, and other controls.
	 * @private
	 */
	this._setup=function(template){
		this._createNode(template);
		this._setupSortable();
		this._setupHandleColor();
		this._setupAddInput();
		this._setupAddEntry();
		this._setupAlphabetize();
		this._setupEditInput();

		$(this).trigger('loaded');
	};


	/**
	 * Sets the internal ol tag tag to sortable also allows dragging list entries between lists.
	 * @private
	 */
	this._setupSortable=function(){
		this.node.find('ol').sortable({connectWith: ".list ol"});
		this.node.find('.objectForm').sortable();
	};


	/**
	 * Creates ad input click handler, for adding input to the template form.
	 * @private
	 */
	this._setupAddInput=function(){
		this.node.find('.addInputButton').click($.proxy(function(event){
			event.preventDefault();

			var labelInput=this.node.find('input[name="addInputLabel"]')
			var label = labelInput.val();
			var type = this.node.find('select[name="addInputType"]').val();

			//check for empty label
			if(label===''){
				labelInput.addClass('error');
				return;
			}

			//all is fine add the new input
			this._addInput(label,type);

			//clear the input
			labelInput.val('').focus();

			//clear error message if any
			this.node.find('.errorMessage').text('');
		},this));

		//clear the red border on input
		this.node.find('input[name="addInputLabel"]').on('input',function(){
			$(this).removeClass('error');
		});

		//label input enter key press - triggers add input button
		this.node.on('keypress','input[name="addInputLabel"]',$.proxy(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13') {
				this.node.find('.addInputButton').trigger('click');
			}
		},this));
	};


	/**
	 * Creates the edit controls for modifying existing form inputs in the template form.
	 * @private
	 */
	this._setupEditInput=function(){

		var form = this.node.find('.objectForm');

		//This is relatively ok
		form.on('click','.objectInput .label',function(event){
			event.preventDefault();

			var node = $(this).closest('.objectInput');
			var label = node.attr('data-label');
			var type = node.attr('data-type');
			var template = '<div class="editInput">'+
				'<input placeholder="Label" value="'+label+'" name="editInputLabel" /> '+
				'<select name="addInputType">'+
					'<option value="text">Text</option>'+
					'<option value="textarea">TextArea</option>'+
					'<option value="number">Number</option>'+
					'<option value="checkbox">Checkbox</option>'+
					'<option value="color">Color</option>'+
					'<option value="datetime-local">DateTime</option>'+
				'</select>'+
				'<a href="" class="applyEditButton" title="Apply">+</a>'+
				'<a href="" class="deleteEditButton" title="Delete">-</a>'+
			'</div>';

			var edit = $(template.trim()).insertAfter(node);
			edit.find('select').val(type);
			node.hide();
		});

		//This is extremely finnicky should be made something less state machine dependent.
		form.on('click','.applyEditButton',function(event){
			event.preventDefault();

			var editInput = $(this).closest('.editInput');
			var input = editInput.prev('.objectInput');

			var label = editInput.find('input[name="editInputLabel"]').val();
			var type = editInput.find('select[name="addInputType"]').val();
			var prevType = input.attr('data-type');
			var find = 'input[type="'+prevType+'"]';

			if(prevType === 'textarea'){
				find = 'textarea';
			}

			var node = input.find(find)
			var value = node.val();
			input.css('display','');

			var insert = '<input type="'+type+'" value="'+value+'" />';
			if(type === 'textarea'){
				insert = '<textarea>'+value+'</textarea>';
			}

			input.attr('data-label',label);
			input.find('.label').text(label);

			input.attr('data-type',type);
			node.after(insert);
			node.remove();

			editInput.remove();
		});

		//name input enter key press
		form.on('keypress','input[name="editInputLabel"]',function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13') {
				$(this).closest('.editInput').find('.applyEditButton').trigger('click');
			}
		});

		//works fine
		form.on('click','.deleteEditButton',function(event){
			event.preventDefault();
			$(this).closest('.editInput').remove();
		});
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


	/**
	 * Create the click handler and adding list entries derived from the object template form.
	 * @private
	 */
	this._setupAddEntry=function(){
		//add entry click
		this.node.find('.addObjectButton').click($.proxy(function(event){
			event.preventDefault();

			var form = this.node.find('.objectForm');
			var message = this.node.find('.errorMessage').text('');

			//check to see if the form has children
			if(form.children().length>0){
				this._addEntry(form);
			}else{
				message.text('No Inputs in object form.');
			}

		},this));
	};


	/**
	 * Adds an input to the object template form.
	 * @param label {string}
	 * @param type {string} valid types are text, number, checkbox, color, datetime-local, and textarea
	 * @private
	 */
	this._addInput=function(label,type){
		var form = this.node.find('.objectForm');
		var template='<div class="objectInput" data-label="'+label+'" data-type="'+type+'">';
		template+='<span class="label">'+label+'</span> ';

		if(type==='text' || type==='number' || type==='checkbox' || type==='color'){
			template+='<input type="'+type+'" />';
		}else if(type === "datetime-local"){
			template+='<input type="'+type+'" value="'+this._getNow()+'" />';
		}else if(type==='textarea'){
			template+='<textarea></textarea>';
		}

		template+='</div>';

		form.append(template);
	};

	/**
	 * @return The current system time for the user in a a format appropriate for a datetime input.
	 * @private
	 */
	this._getNow = function () {
		var now = new Date($.now());
		var year;
		var month
		var date
		var hours
		var minutes
		var seconds
		var formattedDateTime;

		year = now.getFullYear();
		month = now.getMonth().toString().length === 1 ? '0' + (now.getMonth() + 1).toString() : now.getMonth() + 1;
		date = now.getDate().toString().length === 1 ? '0' + (now.getDate()).toString() : now.getDate();
		hours = now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours();
		minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes();
		seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds().toString() : now.getSeconds();

		formattedDateTime = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds;

		return formattedDateTime;
	};


	/**
	 * Adds an object entry to the list based on the input fromt he passed in form object.
	 * @param form jquery objectForm node
	 * @private
	 */
	this._addEntry=function(form){
		//build data object
		var data ={};
		var counter =0;

		var template = '<li><div class="object">';

		form.find('.objectInput').each($.proxy(function(index,item){
			var label = $(item).attr('data-label');
			var type =  $(item).attr('data-type');
			var value;
			var input;
			var colorBlock='';

			if(type === "text" || type === "number" || type === "color"){
				input = $(item).find('input');
				value = input.val();

				//clear the input
				input.val('');

			}else if(type === "datetime-local"){
				input = $(item).find('input');
				value = input.val();

				//clear the input
				input.val(this._getNow());

			}else if(type === "checkbox"){
				input = $(item).find('input');
				value = input[0].checked;

				//clear the input
				input.val('');

			}else if(type === "textarea"){
				input = $(item).find('textarea')
				value = input.val();

				//clear the input
				input.val('');
			}

			//set custom style
			if(type === "color"){
				colorBlock='<span class="colorBlock" style="background:'+value+'"></span>';
			}

			//make sure the value is not empty
			if(value!==''){
				data[label]=value;
				counter++;
				template+='<div><span class="title">'+label+':</span> <span class="value">'+value+'</span> '+colorBlock+' ';
				template+='</div>';
			}
		},this));

		template+='</div></li>';

		//if entries are present then add the form data to the list.
		if(counter>0){
			var node =  $(template).appendTo(this.node.find('ol'));
			node.find('.object').data('json',data);
		}
	};


	/**
	 * Adds a list entry to the list based on the order and data objects passed to this method.
	 * @param order {JSON Array} The order in which the data object should be called
	 * @param data {JSON Object} The raw data of the entry
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
				template+='<div><span class="title">'+label+':</span> <span class="value">'+value+'</span> '+colorBlock+' </div>';
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
	 * @return jquery node of this ojects template.
	 */
	this.getNode=function(){
		return this.node;
	};


	/**
	 * Load the name, the object template form, and ol list with data.
	 * @param list {JSON Object}
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

		//fill out order
		if(list.order && list.order.length>0){
			for(var i=0;i<list.order.length;i++){
				this._addInput(list.order[i].label,list.order[i].type);
			}

			//fill out list
			if(list.list && list.list.length>0){
				for(var j=0,entry;entry=list.list[j];j++){
					this._addJSONEntry(list.order,entry);
				}
			}
		}
	};

	//main
	this._constructor();
}

Object.setPrototypeOf(ObjectGroup.prototype, Base.prototype);
