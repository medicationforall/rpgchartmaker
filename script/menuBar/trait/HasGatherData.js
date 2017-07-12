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

 /**
  * Gather Data Mixin.
  * @mixin
  */
function HasGatherData(){


  /**
   * Gather the data respresentation of the chart.
   * @return {Object} The chart data as an object.
   */
  this.gatherData=function(){
    var data = {};
    data.name=this.node.find('input[name=listName]').val();

    if(this.getSaveOption('overrides')){
      this._gatherCSSOverrides(data);
    }

    if(this.getSaveOption('rolls')){
      this._gatherRolls(data);
    }

    if(this.getSaveOption('lists')){
      this._gatherLists(data);
    }
    return data;
  };


  /**
   * Gather the data for the CSS Overrides.
   * @param {Object} data - object to build upon.
   * @private
   */
  this._gatherCSSOverrides=function(data){
    var menuNode = $('.menuBar').data('coreNode');
    var overrides = menuNode.overrides;

    if($.isEmptyObject(overrides)===false){
      data.cssOverrides = overrides;
    }
  };


  /**
   * Gather the data for the Roll Containers.
   * @param {Object} data - object to build upon.
   * @private
   */
  this._gatherRolls=function(data){
    //gather rolls
    data.rolls=[];
    $('.listGroupContainer .rollContainer').each(function(index, item){
      var coreNode = $(item).data('coreNode');
      var obj = coreNode.gatherData();
      data.rolls.push(obj);
    });
  };


  /**
   * Gather the data for the Lists.
   * @param {Object} data - object to build upon.
   * @private
   */
  this._gatherLists=function(data){
    //gather lists
    data.lists=[];
    $('.listGroupContainer .list').each(function(index, item){
      var coreNode = $(item).data('coreNode');
      var obj = coreNode.gatherData();
      data.lists.push(obj);
    });
  };
}
