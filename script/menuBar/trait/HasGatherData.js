/**
 *   RPG Chart Maker source file HasGatherData,
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
function HasGatherData(){


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
}
