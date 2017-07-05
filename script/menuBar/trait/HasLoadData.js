/**
 *   RPG Chart Maker source file HasLoadData,
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
function HasLoadData(){


  /**
	 *
	 */
	this.loadData=function(data,animate){
		this.loadChartName(data);

		var loadType = $('.hamburger select[name="loadList"]').val();

		if(loadType==='all'){
			this.loadRolls(data,animate);
			this.loadLists(data,animate);
			this.loadOverrides(data);
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
					//console.log('loadRolls instantiate RollContainer');
					rContainer = new RollContainer(animate);
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
			var rollContainer = new RollContainer(animate);
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
}
