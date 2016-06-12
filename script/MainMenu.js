/**
 *   RPG Chart Maker source file MainMenu,
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

function MainMenu(){
//data
this.node;

//constructor
this._constructor = function(){
	this._setup();
}

//methods
this._setup=function(){
	this.node = $('.menuBar');
	this._setupAddListGroup();
	this._setupAddObjectGoup();
	this._setupExport();
	this._setupImport();
	this._setupLoadTemplate();
	this._setupDeleteAllLists();
}


/**
 *
 */
this._setupAddListGroup=function(){
	//add list group click
	this.node.find('.addListGroupButton').click(function(event){
		event.preventDefault();
		var listGroup = new ListGroup();
	});
}


/**
 *
 */
this._setupAddObjectGoup=function(){
	//add object group click
	this.node.find('.addObjectGroupButton').click(function(event){
		event.preventDefault();
		var objectGroup = new ObjectGroup();
	});
}


/**
 *
 */
this._setupExport=function(){
	//export button click
	this.node.find('.exportButton').click($.proxy(function(event){
		event.preventDefault();

		var listNameInput =this.node.find('input[name=listName]'); 

		if(listNameInput.val()!==''){
			data = this.gatherData();
			console.log('clicked export',data);
			this.saveAsFile(JSON.stringify(data),listNameInput.val()+'.json',"text/plain;charset=utf-8");
		} else{
			listNameInput.addClass('error');
		}
	},this));

}


/**
 *
 */
this._setupImport=function(){
	//import file selector change
	this.node.find('.importFile').change($.proxy(function(event){
		event.preventDefault();

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			//do your stuff!

			//clear existing lists check
			this.clearLists();
			
			var file = this.node.find('.importFile')[0].files[0];
			var reader = new FileReader();
			
			reader.onload = $.proxy(function(e) {
				var text = reader.result;
				var data = jQuery.parseJSON(text);

				this.loadData(data);
			},this);
			reader.readAsText(file);
		} else {
			alert('The File APIs are not fully supported by your browser.');
		}
	},this));	
}


/**
 *
 */
this._setupLoadTemplate=function(){
	//load template button
	$('.loadTemplateButton').click($.proxy(function(menu,event){
		event.preventDefault();
		var file = $(this).data('file');
		//console.log('loadTemplateButton',file);	

		//clear lists check
		menu.clearLists();

		$.getJSON('template/'+file,$.proxy(function(data){
			this.loadData(data);
		},menu));
	},null,this));
}


/**
 *
 */
this._setupDeleteAllLists=function(){
	//Delete All Lists Button
	$('.deleteAllButton').click(function(event){
		event.preventDefault();
		$('.list').remove();
	});
}


/**
 *
 */
this.gatherData=function(){
	var data = {};
	data.name=this.node.find('input[name=listName]').val();
	data.lists=[];
		
	$('.listGroupContainer .list').each(function(index, item){
		var obj = {};

		//get list name
		obj.name= $(item).find('input[name=listGroupName]').val();

		//get get roll checkbox
		obj.roll= $(item).find('input[name="roll"]').prop('checked');

		//initialize list entries
		obj.list=[];

		if($(item).hasClass('listGroup')){
			//fill out type
			obj.type='ListGroup';
	
			//fill out list
			$(this).find('ol li span.nameText').each(function(index, item){
				obj.list.push($(item).text());
			});
		}else if($(item).hasClass('objectGroup')){
			console.log('found object group to export');

			//fill out type
			obj.type='ObjectGroup';

			//fill out order
			obj.order=[];

			$(this).find('.objectForm .objectInput').each(function(index, item){
				var data ={};
				data.label = $(item).data('label');
				data.type = $(item).data('type');
				obj.order.push(data);
			});

			//fill out list
			$(this).find('ol li .object').each(function(index, item){
				obj.list.push($(item).data('json'));
			});
		}
			
		data.lists.push(obj);
	});
			
	return data;
}


/**
 *
 */
this.saveAsFile=function(t,f,m) {
	try {
		var b = new Blob([t],{type:m});
		saveAs(b, f);
	} catch (e) {
		window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
	}
}


/**
 *
 */
this.loadData=function(data){
	//console.log('load data');

	//set chart name
	this.node.find('input[name=listName]').val(data.name).trigger('input');
				
	//go through each list in the data object
	for(var i=0,list;list=data.lists[i];i++){
		//console.log('moving over list',i,list);

		//placeholder
		var listGroup;
					
		if(list && list.type == 'ListGroup'){
			listGroup = new ListGroup();
		}else if(list && list.type == 'ObjectGroup'){
			listGroup = new ObjectGroup();
		}else if(list){
			//for older lists import
			listGroup = new ListGroup();
		}

		if(listGroup.node){
			listGroup.fillOutList(list);
		}else{
			$(listGroup).on('loaded',function(list){
				console.log('filling out list on load');
				this.fillOutList(list);
			}.bind(listGroup,list));
		}
	}
}

this.clearLists=function(){
	if($('.hamburger input[name="clearList"]')[0].checked){
		$('.list').remove();
	}
};

//main
	this._constructor();

}
