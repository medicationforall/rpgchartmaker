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

/**
 * Load Data Mixin.
 * @mixin
 */
function HasLoadData(){


  /**
   * Loads a data object representing a chart into the application.
   * @param {Object} data - Chart data object to be loaded.
   * @param {boolean} animate - Flag indicating if newly created Lists,
   * Object Lists, and Roll Containers should be animated when instantiated.
   */
  this.loadData=function(data,animate){
    this._loadChartName(data);

    var loadType = $('.hamburger select[name="loadList"]').val();

    if(loadType==='all'){
      this._loadRolls(data,animate);
      this._loadLists(data,animate);
      this.loadCSSOverrides(data);
    } else if(loadType==='lists'){
      this._loadLists(data,animate);
    } else if(loadType==="rolls"){
      this._loadRolls(data,animate);
    }
  };


  /**
   * set chart name.
   * @param {Object} data - Chart Data.
   * @private
   */
  this._loadChartName=function(data){
    this.node.find('input[name=listName]').val(data.name).trigger('input');
  };


  /**
   * Loads rolls from a data object.
   * @param {Object} data - Chart Data.
   * @param {boolean} animate - Flag passed to created RollContainers.
   * @private
   */
  this._loadRolls=function(data,animate){
    if(data.rolls){
      for(var i=0, roll;(roll=data.rolls[i]);i++){
        var rContainer;
        if(roll.type==="RollContainer" || roll.type==="SeedRollContainer"){
          rContainer = new RollContainer(animate);
        }

        //Fill out when the template is resolved.
        if(rContainer && rContainer.node){
          rContainer.fillOut(roll);
        }else{
          $(rContainer).on('loaded',function(roll){
            this.fillOut(roll);
          }.bind(rContainer,roll));
        }
      }
    } else {
      //create a RollContainer if nothing is present to process.
      var rollContainer = new RollContainer(animate);
    }
  };


  /**
   * Loads lists from a data object.
   * @param {Object} data - Chart Data.
   * @param {boolean} animate - Flag passed to created Lists.
   * @private
   */
  this._loadLists=function(data,animate){
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
   * Loads rolls from a list object.
   * @param {Object} list - list Data.
   * @param {boolean} animate - Flag passed to created list.
   */
  this.loadList=function(list,animate){
    //placeholder
    var listGroup;

    if(list && list.type == 'ListGroup'){
      listGroup = new ListGroup(animate);
    }else if(list && list.type == 'ObjectGroup'){
      listGroup = new ObjectGroup(animate);
    }else if(list && list.type == 'GridGroup'){
      listGroup = new GridGroup(animate);
    } else if(list){
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
   * @param {string} text - raw text to load.
   * @param {boolean} animate - Flag passed to created Lists.
   */
  this.loadRawList=function(text,animate){
    listGroup = new ListGroup(animate);

    if(listGroup.node){
      listGroup.fillOutRawList(text);
    }else{
      $(listGroup).on('loaded',function(text){
        this.fillOutRawList(text);
      }.bind(listGroup,text));
    }
  };


  /**
   * Loads CSS overrides from a data object.
   * @param {Object} data - Chart Data.
   * @param {boolean} animate - Flag passed to created Lists.
   * @private
   */
  this.loadCSSOverrides=function(data){
    if(data.cssOverrides && data.cssOverrides !== null && typeof data.cssOverrides === 'object' ){
      var menuNode = $('.menuBar').data('coreNode');
      menuNode.setOverrides(data.cssOverrides);
    }
  };
}
