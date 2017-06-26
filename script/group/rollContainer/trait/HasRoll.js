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
function HasRoll(){
  this.rollArrayLookup={};


  /**
   *
   */
  this.roll=function(){
    this.rollTable = this.node.find('table');
    this.clearTitle();
    this.resetState();
    this.createTableHeader();
    this.createTableRows();
    this.clearRollArrayLookup();

    $(this.rollTable).trigger("updateAll");
  };


  /**
   *
   */
  this.clearTitle=function(){
    //change the rollContainers titles color
    this.node.find('.title').css('color','#fff');
  };


  /**
   *
   */
  this.resetState=function(){
    //reset state
    this.rollTable.find('th').remove();
    this.rollTable.find('tbody tr').remove();
  };


  /**
   *
   */
  this.createTableHeader=function(){
    //fill out headers
    if(this.resolveDisplay('No.')){
      this.rollTable.find('thead tr').append('<th data-name="'+'No.'+'">'+this.resolveAlias('No.')+'</th>');
    }

    $('.list').each($.proxy(function(index,item){
      //var input = $(item).find('input[name="listGroupName"]');
      //var label = input.val();
      var label = $(item).data('name');
      var roll = $(item).data('roll');

      //make sure it's not skipped
      if(this.resolveDisplay(label)){
        if(roll){
          this.rollTable.find('thead tr').append('<th data-name="'+label+'">'+this.resolveAlias(label)+'</th>');
        }
      }
    },this));
  };


  /**
   *
   */
  this.resolveAlias=function(column){
      if(this.alias && this.alias[column]){
        return this.alias[column];
      }

      return column;
  };


  /**
   *
   */
  this.resolveDisplay=function(column){
      if(this.display && this.display[column]===false){
        return false;
      }

      return true;
  };


  /**
   *
   */
  this.createTableRows=function(){
    //fill out rows
    //console.log('createTableRows');
    var count = $('input[name="rollCount"]').val();
    var lists =$('.list');

    for(var i=0;i<count;i++){
      this.rollTable.find('tbody').append('<tr data-rollSet="'+i+'"></tr>');

      if(this.resolveDisplay('No.')){
        //add roll Index
        this.rollTable.find('tbody tr:last-child').append('<td>'+(i+1)+'</td>');
      }

      lists.each($.proxy(this.getRollValue,this));
    }
  };


  /**
   *
   */
  this.getRollValue=function(index, item){
    //resolve list name
    var label = $(item).data('name');

    if(this.resolveDisplay(label)){
      rollValue = this.rollList(item);

      if(rollValue!==undefined){
        this.rollTable.find('tbody tr:last-child').append('<td>'+rollValue+'</td>');
      }
    }
  };


  /**
   * Potentially a recursive call, depending on how the user structured their data.
   */
  this.rollList=function(list,forceRoll,qualifier){
    //make sure it's not skipped
    if(forceRoll || $(list).data('roll')){
      var label = $(list).data('name');
      var arr = this.createRollArray(label, list, qualifier);
      var roll = this.resolveRoll(arr, label);
      var value = this.resolveRollValue(list, arr, roll);

      return value;
    }
  };


  /**
   *
   */
  this.resolveRollValue=function(list, arr, roll){
    if(arr.length>0){
      var value = arr[roll];

      //lookup for dice
      value = this.findList(value);
      value = this.findDice(value);

      //animate the roll selection
      $(list).find('ol li:nth-child('+(roll+1)+')').animateCss('highlight');

      return value;
    } else {
      return '';
    }
  };


  /**
   *
   */
  this.createRollArray=function(label,list,qualifier){
    if(this.rollArrayLookup[label]===undefined){
      //console.log('create array for ',label);
      var arr = [];

      if(qualifier && qualifier!==''){
        var sub  = qualifier.split(',');

        for(var i=0;i<sub.length;i++){
          var node = $(list).find('ol li:nth-child('+sub[i].trim()+')');
          arr.push(node.html());
        }
      }else{
        //place list item contents into an array
        arr = $(list).find('ol li').not('.edit').map(function(i, el) {
          return $(el).html();
        }).get();
      }

      this.rollArrayLookup[label] = arr;
    }

    return this.rollArrayLookup[label];
  };


  /**
   *
   */
  this.clearRollArrayLookup=function(){
    this.rollArrayLookup={};
  };


  /**
   *
   */
  this.resolveRoll=function(arr){
    var roll = Math.floor(Math.random() * arr.length);
    return roll;
  };


  /**
   * d40444 Demonkin d5 d6+1 d6/2 d4*10 d6-1
   * should have 6 matches d40444, d5, d6+1, d6/2, d4*10, and d6-1
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
   * d6 [Region](1,5) Orks - [Type]
   * Hits on Type, and Region subset 1, and 5.
   */
  this.findList=function(text){
    var re = /\[(.*?)\]\(?([\d,]*)\)?/gi;

    text = text.replace(re,$.proxy(function(match,listName,qualifier){
      var returner = match;
      if(listName && listName!==''){
        var list = $('.list input[name="listGroupName"]').filter(function(){return this.value==listName;}).closest('.list');
        return this.rollList(list,true,qualifier);
      }
      return returner;
    },this));
    return text;
  };
}
