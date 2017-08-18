/**
 *   RPG Chart Maker source file HasRoll,
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
 * Roll Mixin.
 * @mixin
 */
function HasRoll(){
  this.rollArrayLookup={};


  /**
   * Triggers a roll event for a RollContainer.
   */
  this.roll=function(){
    this.rollTable = this.node.find('table');
    this.clearTitle();
    this.resetState();
    this.resetLists();
    this.createIndex();
    this.createTableHeader();
    this.createTableRows();
    this.clearRollArrayLookup();

    $(this.rollTable).trigger("updateAll");
  };


  /**
   * Sets the default title text.
   */
  this.clearTitle=function(){
    //change the rollContainers titles color
    this.node.find('.title').css('color','#fff');
  };


  /**
   * Clear the html table.
   */
  this.resetState=function(){
    //reset state
    this.rollTable.find('th').remove();
    this.rollTable.find('tbody tr').remove();
  };

  this.resetLists=function(){
    $('.list').each($.proxy(function(index,item){
      $(item).find('ol li.uniqueSelected').removeClass('uniqueSelected');

      //if we have a user selected start point, clear the selected grid item.
      if($(item).find('ol li.userSelectedGridItem')){
        $(item).find('ol li.selectedGridItem').removeClass('selectedGridItem');
      }
    },this));
  };


  /**
   * Generates the namespace indexes for the lists.
   */
  this.createIndex=function(){
    $('.list').each($.proxy(function(index,item){
      $(item).attr('data-index',index);
    },this));
  };


  /**
   * Create the table header columns.
   */
  this.createTableHeader=function(){
    //fill out headers
    if(this.resolveDisplay('No.')){
      this.rollTable.find('thead tr').append('<th data-name="'+'No.'+'">'+this.resolveAlias('No.')+'</th>');
    }

    $('.list').each($.proxy(function(index,item){
      var label = $(item).attr('data-name');
      var coreNode = $(item).data('coreNode');
      var roll = coreNode.rollValue;

      //make sure it's not skipped
      if(this.resolveDisplay(label)){
        if(roll){
          this.rollTable.find('thead tr').append('<th data-name="'+label+'">'+this.resolveAlias(label)+'</th>');
        }
      }
    },this));
  };


  /**
   * Resolve column alias if one exists.
   * @param {string} column - key lookup name.
   * @return {string} Alias string.
   */
  this.resolveAlias=function(column){
      if(this.alias && this.alias[column]){
        return this.alias[column];
      }
      return column;
  };


  /**
   * Resolve if the column should be displayed.
   * @param {string} column - key lookup name.
   * @return {boolean} display flag value.
   */
  this.resolveDisplay=function(column){
      if(this.display && this.display[column]===false || this.display[column]==='false' ){
        return false;
      }
      return true;
  };


  /**
   * Fill out the table roll of the RollContainer.
   */
  this.createTableRows=function(){
    //fill out rows
    var count = $('input[name="rollCount"]').val();
    var lists =$('.list');
    //in memory table
    var mTable =  $('<tbody />');
    var displayRollNumber = this.resolveDisplay('No.');

    //rollCountOverride
    if(this.rollCountOverride && this.rollCountOverride>0){
      count = this.rollCountOverride;
    }

    //generate the roll data.
    for(var i=0;i<count;i++){
      mTable.append('<tr data-rollSet="'+i+'"></tr>');

      if(displayRollNumber){
        //add roll Index
        mTable.find('tr:last-child').append('<td>'+(i+1)+'</td>');
      }

      lists.each($.proxy(this.getRollValue,this,mTable));
    }

    //replace tbody with in memory table.
    this.rollTable.find('tbody').replaceWith(mTable);
  };


  /**
   * Get a roll value from derived based on list.
   * @param {int} index - List index.
   * @param {Object} item - The reference List.
   * @param {Object} mTable - In memory table
   */
  this.getRollValue=function(mTable,index, item){
    //resolve list name
    var label = $(item).attr('data-name');

    if(this.resolveDisplay(label)){
      var rollValue;
      if($(item).hasClass("gridGroup")){
        rollValue = this.rollGrid({"index":index,"item":item});
      }else{
        rollValue = this.rollList({"index":index,"item":item});
      }

      //place the roll value into the table
      if(rollValue!==undefined){
        //this.rollTable.find('tbody tr:last-child').append('<td>'+rollValue+'</td>');
        mTable.find('tr:last-child').append('<td>'+rollValue+'</td>');
      }
    }
  };


  /**
   * Potentially a recursive call, depending on how the user structured their data.
   * @param {Object} p - Object parameter list.
   * @return {string}
   */
  this.rollList=function(p){
    if(p.index===undefined || p.item===undefined){
      throw 'rollList is missing required parameters';
    }

    p.coreNode = $(p.item).data('coreNode');

    //make sure it's not skipped
    if(p.forceRoll || p.coreNode.rollValue){
      p.label = $(p.item).attr('data-name');
      p.arr = this.createRollArray(p);
      p.roll = this.resolveRoll(p.arr, p.label);
      var value = this.resolveRollValue(p);
      this.resolveUnique(p);
      return value;
    }
  };


  /**
   * Roll a Grid Group.
   * @param {Object} p - Object parameter list.
   * @return {string}
   */
  this.rollGrid=function(p){
    if(p.index===undefined || p.item===undefined){
      throw 'rollGrid is missing required parameters';
    }

    p.coreNode = $(p.item).data('coreNode');

    //make sure it's not skipped
    if(p.forceRoll || p.coreNode.rollValue){
      p.label = $(p.item).attr('data-name');
      p.arr = this.createRollArray(p);

      if(p.coreNode.node.find('li.selectedGridItem').length===0){
        p.roll = this.resolveRollGrid(p.coreNode,p.arr, p.label);
      }else{
        p.roll = this.resolveRollGridDirection(p.coreNode,p.arr, p.label);
      }

      var value = this.resolveRollValue(p,function(node){
        p.coreNode.node.find('li').removeClass('selectedGridItem');
        $(node).addClass('selectedGridItem');
      });
      return value;
    }
  };


  /**
   * Gets the roll string value from roll array, and animates the selection.
   * @param {Object} p - Object parameter list.
   * @return {string} The roll value.
   */
  this.resolveRollValue=function(p,callback){
    if(p.index===undefined || p.item===undefined || p.arr===undefined || p.roll===undefined || p.coreNode===undefined){
      throw 'resolveRollValue is missing required parameters';
    }

    if(p.arr.length>0){
      var value = p.arr[p.roll];
      var node = $(p.item).find('ol li:not(.uniqueSelected)')[p.roll];

      //lookup for dice
      value = this.findList(value);
      value = this.findDice(value);

      if(callback){
        callback.call(this,node);
      }else{
        //animate the roll selection
        $(node).animateCss('highlight');
      }


      if(p.coreNode.unique===true){
        $(node).addClass('uniqueSelected');
      }
      return value;
    } else {
      return '';
    }
  };


  /**
   * If the roll array is unique pops the value off the array.
   * When the array is empty rebuilds the arrays contents.
   * @param {Object} p - Object parameter list.
   */
  this.resolveUnique=function(p){
    if(p.item===undefined || p.roll===undefined || p.arr===undefined || p.index===undefined || p.label===undefined){
      throw 'resolveUnique is missing required parameters';
    }

    //var coreNode = $(p.item).data('coreNode');

    if(p.coreNode.unique===true){
      if (p.roll > -1) {
        p.arr.splice(p.roll, 1);
      }

      if(p.arr.length === 0){
        this.rollArrayLookup[p.label+p.index]=undefined;
        this.createRollArray(p);
      }
    }
  };


  /**
   * Creates the Roll array derived from the reference list and caches the results.
   * @param {Object} p - Object parameter list.
   * @return {Array} The Array to roll against.
   */
  this.createRollArray=function(p){
    if(p.index===undefined || p.label===undefined || p.item===undefined){
      throw 'createRollArray is missing required parameters';
    }
    var namespace = p.label+p.index;

    //lookup array is empty
    if(this.rollArrayLookup[namespace]===undefined){
      var arr = [];

      if(p.qualifier && p.qualifier!==''){
        var sub  = p.qualifier.split(',');

        for(var i=0;i<sub.length;i++){
          var node = $(p.item).find('ol li:nth-child('+sub[i].trim()+')');
          arr.push(node.html());
        }
      }else{
        //place list item contents into an array
        arr = $(p.item).find('ol li').not('.edit').map(function(i, el) {
          return $(el).html();
        }).get();
      }

      this.rollArrayLookup[namespace] = arr;
    }

    return this.rollArrayLookup[namespace];
  };


  /**
   * Empties the cached roll array lookup.
   */
  this.clearRollArrayLookup=function(){
    this.rollArrayLookup={};
  };


  /**
   * no longer used
   * @param {Array} arr - array to be rolled against.
   * @see HasRollSeed.js
   */
  this.resolveRoll=function(arr){
    var roll = Math.floor(Math.random() * arr.length);
    console.log('resolve roll',roll);
    return roll;
  };


  /**
   * Looks for dice notation in a roll value.
   * Removes the notation an replaces it with a resolved value.
   * @param {string} text
   * @example d40444 Demonkin d5 d6+1 d6/2 d4*10 d6-1
   * should have 6 matches d40444, d5, d6+1, d6/2, d4*10, and d6-1
   * @return {string}
   */
  this.findDice=function(text){
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


  /**
   * Looks for list notation in a roll value.
   * @param {string} text
   * @example d6 [Region](1,5) Orks - [Type]
   * Hits on Type, and Region subset 1, and 5.
   * @return {string}
   */
  this.findList=function(text){
    var re = /\[(.*?)\]\(?([\d,]*)\)?/gi;

    text = text.replace(re,$.proxy(function(match,listName,qualifier){
      var returner = match;
      if(listName && listName!==''){
        var item = $('.list[data-name="'+listName+'"]');
        var index = $(item).data('index');
        //find the index
        if(index===undefined){
          console.warn="index is undefined";
          index=0;
        }
        return this.rollList({"index":index,"item":item,"forceRoll":true,"qualifier":qualifier});
      }
      return returner;
    },this));
    return text;
  };
}
