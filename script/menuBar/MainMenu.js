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

/**
 * @see index.html
 */
function MainMenu(){
	//data
	this.node=undefined;


	/**
	 * constructor
	 */
	this._constructor = function(){
		this._setup();
	};


	/**
	 *
	 */
	this._setup=function(){
		this.node = $('.menuBar');
		this._setupOpenFileMenuButton();
		this._setupOpenAddMenuButton();
		this._setupOpenDeleteMenuButton();
		this._setupAddRollContainer();
		this._setupAddSeedRollContainer();
		this._setupAddListGroup();
		this._setupAddObjectGoup();
		this._setupExport();
		this._setupImport();
		this._setupLoadTemplate();
		this._setupDeleteButtons();

		$.getJSON('config.json',$.proxy(function(data){
			if(data.enableShare){
				this.node.find('.shareButton').css('display','inline-block');
				this.servlet=data.servlet;
				this._setupShare();
				this._setupRetrieve();
			}
		},this));
	};

	/**
	 *
	 */
	this._setupOpenFileMenuButton=function(){
		$('.openSaveMenuButton').click(function(event){
			event.preventDefault();

			//toggle menu display
			if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.save').hasClass('focus')){
				$('body').removeClass('menuOpen');
			}else{
				$('body').addClass('menuOpen');
			}

			//set menu focus
			$('.hamburger.menu .subMenu').removeClass('focus');
			$('.hamburger.menu .subMenu.save').addClass('focus');
		});

		$('.openLoadMenuButton').click(function(event){
			event.preventDefault();
			//console.log('openAddMenuButton');

			//toggle menu display
			if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.load').hasClass('focus')){
				$('body').removeClass('menuOpen');
			}else{
				$('body').addClass('menuOpen');
			}

			//set menu focus
			$('.hamburger.menu .subMenu').removeClass('focus');
			$('.hamburger.menu .subMenu.load').addClass('focus');
		});

		$('.openFileMenuButton').click(function(event){
			event.preventDefault();
			//console.log('openAddMenuButton');

			//toggle menu display
			if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.file').hasClass('focus')){
				$('body').removeClass('menuOpen');
			}else{
				$('body').addClass('menuOpen');
			}

			//set menu focus
			$('.hamburger.menu .subMenu').removeClass('focus');
			$('.hamburger.menu .subMenu.file').addClass('focus');
		});
	}

	/**
	 *
	 */
	this._setupOpenAddMenuButton=function(){
			$('.openAddMenuButton').click(function(event){
				event.preventDefault();
				console.log('openAddMenuButton');

				//toggle menu display
				if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.add').hasClass('focus')){
					$('body').removeClass('menuOpen');
				}else{
					$('body').addClass('menuOpen');
				}

				//set menu focus
				$('.hamburger.menu .subMenu').removeClass('focus');
				$('.hamburger.menu .subMenu.add').addClass('focus');
			});
	}


	/**
	 *
	 */
	this._setupOpenDeleteMenuButton=function(){
			$('.openDeleteMenuButton').click(function(event){
				event.preventDefault();
				//toggle menu display
				if($('body').hasClass('menuOpen') && $('.hamburger.menu .subMenu.delete').hasClass('focus')){
					$('body').removeClass('menuOpen');
				}else{
					$('body').addClass('menuOpen');
				}

				//set menu focus
				$('.hamburger.menu .subMenu').removeClass('focus');
				$('.hamburger.menu .subMenu.delete').addClass('focus');
			});
	}


	/**
	 *
	 */
	this._setupAddRollContainer=function(){
		//add list group click
		$('.addRollContainerButton').click(function(event){
			event.preventDefault();
			var rollContainer = new RollContainer();
		});
	};


	/**
	 *
	 */
	this._setupAddSeedRollContainer=function(){
		//add list group click
		$('.addSeedRollContainerButton').click(function(event){
			event.preventDefault();
			var rollContainer = new SeedRollContainer();
		});
	};


	/**
	 *
	 */
	this._setupAddListGroup=function(){
		//add list group click
		$('.addListGroupButton').click(function(event){
			event.preventDefault();
			var listGroup = new ListGroup();
		});
	};


	/**
	 *
	 */
	this._setupAddObjectGoup=function(){
		//add object group click
		$('.addObjectGroupButton').click(function(event){
			event.preventDefault();
			var objectGroup = new ObjectGroup();
		});
	};


	/**
	 *
	 */
	this._setupExport=function(){
		//export button click
		$('.exportButton').click($.proxy(function(event){
			event.preventDefault();

			var listNameInput =this.node.find('input[name=listName]');

			if(listNameInput.val()!==''){
				data = this.gatherData();
				this.saveAsFile(JSON.stringify(data),listNameInput.val()+'.json',"text/plain;charset=utf-8");
			} else{
				listNameInput.addClass('error');
			}
		},this));
	};


	/**
	 *
	 */
	this._setupImport=function(){
		//import file selector change
		$('.importFile').change($.proxy(function(event){
			event.preventDefault();

			if (window.File && window.FileReader && window.FileList && window.Blob) {
				//do your stuff!

				//clear existing lists and rollContainers check
				this.clearAll();

				var file = $('.importFile')[0].files[0];
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
	};


	/**
	 *
	 */
	this._setupLoadTemplate=function(){
		//load template button
		$('.loadTemplateButton').click($.proxy(function(menu,event){
			event.preventDefault();
			var file = $(this).data('file');

			//clear lists check
			menu.clearAll();

			$.getJSON('template/'+file,$.proxy(function(data){
				this.loadData(data);
			},menu));
		},null,this));
	};


	/**
	 *
	 */
	this._setupDeleteButtons=function(){
		//Delete All Button
		$('.deleteAllButton').click(function(event){
			event.preventDefault();
			$('.list, .rollContainer').remove();
		});

		//Delete All Button
		$('.deleteListsButton').click(function(event){
			event.preventDefault();
			$('.list').remove();
		});

		//Delete All Button
		$('.deleteRollsButton').click(function(event){
			event.preventDefault();
			$('.rollContainer').remove();
		});
	};


	/**
	 *
	 */
	this._setupShare=function(){
		this.node.find('.shareButton').click($.proxy(function(event){
			event.preventDefault();

			//verify that chart name isn't empty

			var listNameInput =this.node.find('input[name=listName]');

			if(listNameInput.val()!==''){
				data ={};
				data.chart = this.gatherData();
				data.requestType='store';

				$.ajax(this.servlet,{'data':data, dataType:'json', method:'POST'}).done(function(data){
					if(data.success){
						window.location.hash = data.id;
					}
				}).fail(function(msg){
					console.warn('failed call to chartStore',msg.responseText)
				});
			}else{
				listNameInput.addClass('error');
			}
		},this));
	};


	/**
	 *
	 */
	this._setupRetrieve=function(){
		var hash = window.location.hash;

		if(hash!==''){
			var data={requestType:"retrieve",id:hash.substring(1)};

			$.ajax(this.servlet,{'data':data,dataType:'json', method:'POST'}).done($.proxy(function(response){
				if(response.success){
					this.loadData(response.data,false);
				}
			},this)).fail(function(msg){
				console.warn('failed call to chartStore',msg.responseText)
			});
		}
	};


	/**
	 *
	 */
	this.gatherData=function(){
		var data = {};
		data.name=this.node.find('input[name=listName]').val();

		var saveType = $('.hamburger select[name="saveList"]').val();

		if(saveType==='all'){
			this.gatherRolls(data);
			this.gatherLists(data);
		}else if(saveType==='lists'){
			this.gatherLists(data);
		} else if(saveType==='rolls'){
			this.gatherRolls(data);
		}

		return data;
	};


	/**
	 *
	 */
	this.gatherRolls=function(data){
		//gather rolls
		data.rolls=[];
		$('.listGroupContainer .rollContainer').each(function(index, item){
			var obj = {};
			var coreNode = $(item).data("coreNode");

			//resolve type
			if(coreNode instanceof RollContainer){
				obj.type = "RollContainer";
			}else if(coreNode instanceof SeedRollContainer){
				obj.seed = coreNode.seed;
				obj.type = "SeedRollContainer";
			}
			data.rolls.push(obj);
		});
	}


	/**
	 *
	 */
	this.gatherLists=function(data){
		//gather lists
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
	};


	/**
	 *
	 */
	this.loadData=function(data,animate){
		this.loadChartName(data);

		var loadType = $('.hamburger select[name="loadList"]').val();

		if(loadType==='all'){
			this.loadRolls(data,animate);
			this.loadLists(data,animate);
		} else if(loadType==='lists'){
			this.loadLists(data,animate);
		} else if(loadType==="rolls"){
			this.loadRolls(data,animate);
		}
	};


	/**
	 *
	 */
	this.loadChartName=function(data){
		//set chart name
		this.node.find('input[name=listName]').val(data.name).trigger('input');
	};

	/**
	 *
	 */
	this.loadRolls=function(data,animate){
		if(data.rolls){
			for(var i=0, roll;(roll=data.rolls[i]);i++){
				var rContainer;
				if(roll.type==="RollContainer"){
					rContainer = new RollContainer(animate);
				}else if(roll.type==="SeedRollContainer"){
					rContainer = new SeedRollContainer(animate);
				}

				if(rContainer.node){
					rContainer.fillOut(roll);
				}else{
					$(rContainer).on('loaded',function(roll){
						this.fillOut(roll);
					}.bind(rContainer,roll));
				}
			}
		}else{
			var rollContainer = new RollContainer(animate);
		}

	};


	/**
	 *
	 */
	this.loadLists=function(data,animate){
		//go through each list in the data object
		for(var i=0,list;(list=data.lists[i]);i++){
			//placeholder
			var listGroup;

			if(list && list.type == 'ListGroup'){
				listGroup = new ListGroup(animate);
			}else if(list && list.type == 'ObjectGroup'){
				listGroup = new ObjectGroup(animate);
			}else if(list){
				//for older lists import
				listGroup = new ListGroup(animate);
			}

			if(listGroup.node){
				listGroup.fillOutList(list);
			}else{
				$(listGroup).on('loaded',function(list){
					this.fillOutList(list);
				}.bind(listGroup,list));
			}
		}
	}


	/**
	 *
	 */
	this.clearAll=function(){
		if($('.hamburger select[name="clearList"]').val()==="all"){
			$('.list, .rollContainer').remove();
		} else if($('.hamburger select[name="clearList"]').val()==="lists"){
			$('.list').remove();
		} else if($('.hamburger select[name="clearList"]').val()==="rolls"){
			$('.rollContainer').remove();
		}
		//if($('.hamburger input[name="clearList"]')[0].checked){
		//	$('.list, .rollContainer').remove();
		//}
	};

	//main
	this._constructor();
}
