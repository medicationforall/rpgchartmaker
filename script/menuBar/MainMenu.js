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
		HasOpenMenuButtons.call(this);
		HasAddMenu.call(this);
		HasSaveMenu.call(this);
		HasLoadMenu.call(this);
		HassRollButton.call(this);
    HasListNameInput.call(this);
		HasSettingsMenu.call(this);

		$.getJSON('config.json',$.proxy(function(data){
			if(data.enableShare){
				this.node.find('.shareButton').css('display','inline-block');
				this.servlet=data.servlet;
				HasShare.call(this);
			}
		},this));

		//set coreNode
		$.data(this.node[0],'coreNode',this);
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
			this.gatherOverrides(data);
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

			//resolve alias
			if($.isEmptyObject(coreNode.alias)===false){
				obj.alias = coreNode.alias;
			}

			//resolve display
			if($.isEmptyObject(coreNode.display)===false){
				obj.display = coreNode.display;
			}

			//resolve type
			if(coreNode instanceof SeedRollContainer){
				obj.seed = coreNode.seed;
				//alias is not empt
				obj.type = "RollContainer";
			}
			data.rolls.push(obj);
		});
	};


	/**
	 *
	 */
	this.gatherLists=function(data){
		//gather lists
		data.lists=[];
		$('.listGroupContainer .list').each(function(index, item){
			var coreNode = $(item).data('coreNode');
			var obj = coreNode.gatherData();
			data.lists.push(obj);
		});
	};


	/**
	 *
	 */
	this.gatherOverrides=function(data){
		var menuNode = $('.menuBar').data('coreNode');
		var overrides = menuNode.overrides;

		if($.isEmptyObject(overrides)===false){
			data.cssOverrides = overrides;
		}
	};


	/**
	 *
	 */
	this.loadData=function(data,animate){
		this.loadChartName(data);

		var loadType = $('.hamburger select[name="loadList"]').val();

		if(loadType==='all'){
			this.loadOverrides(data);
			this.loadRolls(data,animate);
			this.loadLists(data,animate);
		} else if(loadType==='lists'){
			this.loadLists(data,animate);
		} else if(loadType==="rolls"){
			this.loadRolls(data,animate);
		}
	};


	/**
	 * set chart name
	 */
	this.loadChartName=function(data){
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
					//console.log('loadRolls instantiate SeedRollContainer');
					rContainer = new SeedRollContainer(animate);
				}else if(roll.type==="SeedRollContainer"){
					rContainer = new SeedRollContainer(animate);
				}

				if(rContainer && rContainer.node){
					rContainer.fillOut(roll);
				}else{
					$(rContainer).on('loaded',function(roll){
						this.fillOut(roll);
					}.bind(rContainer,roll));
				}
			}
		}else{
			var rollContainer = new SeedRollContainer(animate);
		}
	};


	/**
	 *
	 */
	this.loadLists=function(data,animate){
		//go through each list in the data object
		if(data.lists){
			for(var i=0,list;(list=data.lists[i]);i++){
				this.loadList(list,animate);
			}
		}else{
			new ListGroup(animate);
		}
	};


	/**
	 *
	 */
	this.loadList=function(list,animate){
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
	};


	/**
	 *
	 */
	this.loadOverrides=function(data){
		if(data.cssOverrides && data.cssOverrides !== null && typeof data.cssOverrides === 'object' ){
			var menuNode = $('.menuBar').data('coreNode');
			menuNode.setOverrides(data.cssOverrides);
		}
	};


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
	};


	//main
	this._constructor();
}
