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

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


$(document).ready(function(){

/*Methods*/
	
	var gatherData=function(){
		var data = {};
		data.name=$('input[name=listName]').val();
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
	};

	
	var saveAsFile=function(t,f,m) {
		try {
		var b = new Blob([t],{type:m});
			saveAs(b, f);
		} catch (e) {
			window.open("data:"+m+"," + encodeURIComponent(t), '_blank','');
		}
	};


	var loadData=function(data){
		//console.log('load data');

		//set chart name
		$('input[name=listName]').val(data.name).trigger('input');
				
		for(var i=0,list;list=data.lists[i];i++){
			//console.log('moving over list',i,list);

			var listGroup;
					
			if(list && list.type == 'ListGroup'){
				listGroup = new ListGroup();
			}else if(list && list.type == 'ObjectGroup'){
				listGroup = new ObjectGroup();
			}else if(list){
				//for older lists import
				listGroup = new ListGroup();
			}


			//thi can still cause a race condition if the template isn't loaded. 
			//As is typically the case for object group.
			if(listGroup.node){
				listGroup.fillOutList(list);
			}else{
				$(listGroup).on('loaded',function(list){
					console.log('filling out list on load');
					this.fillOutList(list);
				}.bind(listGroup,list));
			}
		}
	}; 


	var clearLists=function(){
		if($('.hamburger input[name="clearList"]')[0].checked){
			$('.list').remove();
		}
	};


	//d40444 Demonkin d5 d6+1 d6/2 d4*10 d6-1
	//should have 6 matches d40444, d5, d6+1, d6/2, d4*10, and d6-1
	var findDice=function(text){
		var re = /\bd(\d+)([*+-/%]?)(\d+)?\b/gi;

		text = text.replace(re,function(match,number, operation, number2){
			//console.log(match,number,operation,number2,arguments);

			var n = parseInt(number);
			var roll = Math.floor(Math.random() * n);
			//normalize roll so that it's not 0 index
			roll++;

			//modify roll
			if(operation && number2 && operation !==''){
				//console.log('hit modify roll');
				var n2 = parseInt(number2);

				if(operation=='+'){
					roll = roll+n2;
				}else if(operation=='-'){
					roll = roll-n2;
				}else if(operation=='/'){
					roll = roll/n2;		
				}else if(operation=='*'){
					roll = roll*n2;
				}else if(operation=='%'){
					roll = roll%n2;
				}
			}
			return roll;
		});
		return text;
	};


	//d6 [Region](1,5) Orks - [Type]
	//Hits on Type, and Region subset 1, and 5.
	var findList=function(text){
		var re = /\[(.*?)\][\s]?\(?([\d,]*)\)?/gi

		text = text.replace(re,function(match,listName,qualifier){
			var returner = match;
			//console.log('hit list find',match,listName,qualifier)
			if(listName && listName!==''){
				var list = $('.list input[name="listGroupName"]').filter(function(){return this.value==listName}).closest('.list');
				return rollList(list,true,qualifier);
			}
			
			return returner;
		});
		return text;
	}


	/**
 	 * Potentially a recursive call, depending n how the user structured their data.
	 */
	var rollList=function(list,forceRoll,qualifier){
		//make sure it's not skipped
		if(forceRoll || $(list).find('input[name="roll"]').prop('checked')){

			var arr = [];

			if(qualifier && qualifier!==''){
				var sub  = qualifier.split(',');

				for(var i=0;i<sub.length;i++){
					var node = $(list).find('ol li:nth-child('+sub[i].trim()+')');
					//console.log('process sub array',sub[i],node.html());
					arr.push(node.html());
				}
			}else{
				//place list item contents into an array
				arr = $(list).find('ol li').map(function(i, el) {
					return $(el).html();
				}).get();
			}

			var roll = Math.floor(Math.random() * arr.length);
			var value = arr[roll];
			//lookup for dice
			value = findList(value);
			value = findDice(value);

			//animate the roll selection
			$(list).find('ol li:nth-child('+(roll+1)+')').animateCss('highlight');

			return value;
		}
	}

/*MAIN*/
	$('.javacriptWarning').remove();
	
	//sortable for lists in groupcontainer
	$('.listGroupContainer').sortable({tolerance: "pointer",handle: ".handle"});
	$('.listGroupContainer .list').find('ol').sortable({connectWith: ".list ol"});
	

	//add list group click
	$('.addListGroupButton').click(function(event){
		event.preventDefault();
		var listGroup = new ListGroup();
	});

	//add object group click
	$('.addObjectGroupButton').click(function(event){
		event.preventDefault();
		var objectGroup = new ObjectGroup();
	});
	
	
	//delete list group click
	$('.listGroupContainer').on('click','.deleteListButton',function(event){
		event.preventDefault();
		$(this).closest('.list').remove();
	});
	


	//add name button click functionality
	$('.listGroupContainer').on('click','.addNameButton',function(event){
		event.preventDefault();
		var listGroup =  $(this).closest('.listGroup');
		var nameInput = listGroup.find('.nameInput');
		
		if(nameInput.val()!==''){
		listGroup.find('ol').append('<li><span class="nameText">'+nameInput.val().trim()+'</span></li>');
				
		//reset note input
		nameInput.val('');
		nameInput.focus();
		}
	});
	
	
	//name input enter key press
	$('.listGroupContainer').on('keypress','.nameInput',function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			//console.log('pressed enter');
			$(this).closest('.listGroup').find('.addNameButton').trigger('click');  
		}
	});
	
	
	//note edit functionality
	$('.listGroupContainer').on('click','.nameText',function(event){
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
	$('.listGroupContainer').on('click','.noteEditButton',function(event){
		event.preventDefault();
		//alert('clicked note edit button');
		//var listGroup = $(this).closest('.listGroup');

		var inlineEdit = $(this).closest('.inlineEdit');
		var nameText = $(inlineEdit).prev('.nameText');
		var noteEdit = inlineEdit.find('.noteEdit');

		
		nameText.text(noteEdit.val()).css('display','block');
		inlineEdit.remove();		
	});
	
	//name input enter key press
	$('.listGroupContainer').on('keypress','.noteEdit',function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13') {
			console.log('pressed enter');
			$(this).closest('.inlineEdit').find('.noteEditButton').trigger('click');
			
			//addItem.trigger('click');    
		}
	});
	
	//note delete click
	$('.listGroupContainer').on('click','.noteDeleteButton',function(event){
		event.preventDefault();
		console.log('clicked note delete button');
		
		var inlineEdit = $(this).closest('.inlineEdit');
		var nameText = $(inlineEdit).prev('.nameText');
		
		inlineEdit.remove();
		nameText.closest('li').remove();
	});

	//export button click
	$('.header .exportButton').click(function(event){
		event.preventDefault();

		if($('input[name=listName]').val()!==''){
			data = gatherData();
			console.log('clicked export',data);
			saveAsFile(JSON.stringify(data),$('input[name="listName"]').val()+'.json',"text/plain;charset=utf-8");
		} else{
			$('input[name=listName]').addClass('error');
			
		}
	});
	
	//chat name on input clear error status
	$('input[name=listName]').on('input',function(){
		$(this).removeClass('error');
	});


	//import file selector change
	$('.importFile').change(function(event){
		event.preventDefault();

		if (window.File && window.FileReader && window.FileList && window.Blob) {
			//do your stuff!

			//clear existing lists check
			clearLists();
			
			var file = $('.importFile')[0].files[0];
			var reader = new FileReader();
			
			reader.onload = function(e) {
				var text = reader.result;
				
				var data = jQuery.parseJSON(text);

				loadData(data);
			}
			reader.readAsText(file);
		} else {
			alert('The File APIs are not fully supported by your browser.');
		}
	});	
	
	//roll button click
	$('.rollButton').click(function(event){
		event.preventDefault();

		//change the rollContainers titles color
		$('.rollContainer .title').css('color','#fff');
		
		//reset state
		var rollTable = $('.rollContainer table');
		$(rollTable).find('th').remove();
		$(rollTable).find('tbody tr').remove();

		
		//fill out headers
		$(rollTable).find('thead').append('<th>'+'No.'+'</th>');
		
		$('.list').each(function(index,item){
			var input = $(item).find('input[name="listGroupName"]');
			var label = input.val();			

			//make sure it's not skipped
			if(input.next()[0].checked){
				$(rollTable).find('thead').append('<th>'+label+'</th>');
			}
		});
		
		//fill out rows
		var count = $('input[name="rollCount"]').val();
		
		for(var i=0;i<count;i++){
			$(rollTable).find('tbody').append('<tr data-rollSet="'+i+'"></tr>');

			//add roll Index
			$('.rollContainer table tbody tr:last-child').append('<td>'+(i+1)+'.'+'</td>');
			
			var list =$('.list').each(function(index, item){
				rollValue = rollList(item);

				if(rollValue!==undefined){
					$('.rollContainer table tbody tr:last-child').append('<td>'+rollValue+'</td>');
				}
			});
		}
	});


	//Delete All Lists Button
	$('.deleteAllButton').click(function(event){
		event.preventDefault();
		$('.list').remove();
	});


	//load template button
	$('.loadTemplateButton').click(function(event){
		event.preventDefault();
		var file = $(this).data('file');
		//console.log('loadTemplateButton',file);	

		//clear lists check
		clearLists();

		$.getJSON('template/'+file,$.proxy(function(loadData,data){
			loadData(data);
		},this,loadData));
	});

	//main
	//initialize list group
	var listGroup = new ListGroup(false);
});
