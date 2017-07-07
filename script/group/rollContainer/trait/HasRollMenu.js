/**
 *   RPG Chart Maker source file HasRollMenu,
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
 * Roll Menu Mixin.
 * @mixin
 */
function HasRollMenu(){
  this.display={};
  this.alias={};

  /**
   *
   */
  this.openMenu=function(){
    //console.log('open menu');

    var lists = $('.listGroupContainer .list');
    var cMenu = this.node.find('.menu .columns');

    //clear the menu
    cMenu.empty();

    //add default no. column
    this.addMenuOption('No.',cMenu);

    //if we have lists
    if(lists.length > 0){
      //console.log('display edit controls');

      lists.each($.proxy(function(coreNode ,cMenu, index, item){
        //console.log(arguments);
        var label = $(item).data('name');

        coreNode.addMenuOption(label,cMenu);
      },null, this, cMenu));
    }
  };


  /**
   *
   */
  this.addMenuOption=function(name,node){
    var checked='';
    if(this.resolveDisplay(name)===true){
      checked = 'checked';
    }

    var template = '<div><input class="alias" data-name="'+name+'" value="'+this.resolveAlias(name)+'" />'+
    '<input class="display" data-name="'+name+'" type="checkbox" title="display" '+checked+' /></div>';

    node.append(template);
  };


  /**
   *
   */
  this.node.find('.menu').on('input','.alias',$.proxy(function(coreNode,event){
    //console.log('alias change',$(this).val());
    var column = $(this).data('name');
    coreNode.setAlias(column,$(this).val());
  },null,this));


  /**
   *
   */
  this.setAlias=function(column,alias){
    this.alias[column]=alias;

    if(this.alias[column]===column){
      delete this.alias[column];
    }

    this.roll();
  };


  /**
   *
   */
  this.node.find('.menu').on('change','.display',$.proxy(function(coreNode,event){
    //console.log('alias change',this.checked);
    var column = $(this).data('name');
    coreNode.setDisplay(column,this.checked);
  },null,this));


  /**
   *
   */
  this.setDisplay=function(column,display){
    this.display[column] = display;

    if(this.display[column]===true){
      delete this.display[column];
    }

    this.roll();
  };
}
