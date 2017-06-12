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

	//d40444 Demonkin d5 d6+1 d6/2 d4*10 d6-1
	//should have 6 matches d40444, d5, d6+1, d6/2, d4*10, and d6-1
	var findDice=function(text){
		var re = /\bd(\d+)([*+-/%]?)(\d+)?\b/gi;

		text = text.replace(re,function(match,number, operation, number2){
			var n = parseInt(number);
			var roll = Math.floor(Math.random() * n);
			//normalize roll so that it's not 0 index
			roll++;

			//modify roll
			if(operation && number2 && operation !==''){
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
		var re = /\[(.*?)\]\(?([\d,]*)\)?/gi

		text = text.replace(re,function(match,listName,qualifier){
			var returner = match;
			if(listName && listName!==''){
				var list = $('.list input[name="listGroupName"]').filter(function(){return this.value==listName;}).closest('.list');
				return rollList(list,true,qualifier);
			}

			return returner;
		});
		return text;
	}


	/**
 	 * Potentially a recursive call, depending on how the user structured their data.
	 */
	var rollList=function(list,forceRoll,qualifier){
		//make sure it's not skipped
		if(forceRoll || $(list).find('input[name="roll"]').prop('checked')){

			var arr = [];

			if(qualifier && qualifier!==''){
				var sub  = qualifier.split(',');

				for(var i=0;i<sub.length;i++){
					var node = $(list).find('ol li:nth-child('+sub[i].trim()+')');
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


	//delete list group click
	$('.listGroupContainer').on('click','.deleteListButton',function(event){
		event.preventDefault();
		$(this).closest('.list').remove();
	});


	//chart name on input clear error status
	$('input[name=listName]').on('input',function(){
		$(this).removeClass('error');

		$(document).prop('title', $(this).val()+' - RPG Chart Maker');
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


	//main
	//Initialize the Roll Container
	var rollContainer = new RollContainer(false);
	$(rollContainer).on('loaded',function(event){
		//resolve the two templates for lists
		$.when(ListGroup.prototype.__proto__._resolveTemplate(ListGroup,'listGroup'),ObjectGroup.prototype.__proto__._resolveTemplate(ObjectGroup,'objectGroup')).done(function(){
			//initialize list group
			if(window.location.hash == ''){
				var listGroup = new ListGroup(false);
			}

			//Initialize mainMenu
			var mainMenu = new MainMenu();
		});
	});
});
